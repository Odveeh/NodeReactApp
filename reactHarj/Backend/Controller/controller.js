const request = require('request');

//laskee ja palauttaa pelaajan statsit parametrinä annetun matsilistan mukaisesti
function calculateStats(listofMatches){

    let kills = 0;
    let gamesplayed = listofMatches.length;
    let damageDealt = 0;

    let killAvg = 0;
    let damageAvg = 0;
    let averageRank = 0;
    let wins = 0;

    //Not executed if 0 matches
    if (gamesplayed > 0){
        for (i = 0; i < listofMatches.length; i++){

            listofMatches[i] = JSON.parse(listofMatches[i]);
            damageDealt = damageDealt + listofMatches[i].damageDealt;
            averageRank += listofMatches[i].winPlace;
    
            kills = kills + listofMatches[i].kills;
    
            if(listofMatches[i].winPlace === 1){
                wins++;
            }
    
        }
        
        averageRank /= gamesplayed;
        killAvg = kills / gamesplayed;
        damageAvg = damageDealt / gamesplayed;

    }


    let Stats = {
        "kills": kills,
        "gamesPlayed": gamesplayed,
        "damageDealt": damageDealt,
        "killAvg": killAvg,
        "damageAvg": damageAvg,
        "wins": wins,
        "placementAvg": averageRank,
    }

    return Stats;
}

class Controller {


    //post request for player stats 
    POSTRequest(req, res){

        console.log("/profile post request");


        const nickName = req.body.inputText;
        const APIkey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3MjQxNDYzMC0yOGE2LTAxMzYtMzUzMi01YjVkMjA0MzZjYmEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTI0NDM0NDA4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1YmdzdGF0c2FwcCJ9.g0mi1hplrmyRs5Pk6FYpJmbtz7k4kG80h-pdBEevtPw'
        let url = "https://api.pubg.com/shards/steam/players?filter[playerNames]=" + nickName;
   
        
        let playerRequest = new Promise(function(resolve, reject){
            
            request({headers: {'Authorization': 'Bearer ' + APIkey, 'Accept': 'application/vnd.api+json'}, uri: url}, (err, res, body) => {
                if (err){
                    console.log("seuraava errori: " + err);
                    reject("rejected!");
        
                } else{

                    console.log("successfull API request (playerRequest)");
                    let data = JSON.parse(body);
                    resolve(body);
                
                }});

        });

        

        let analyzeData = function(data){

            const json = JSON.parse(data);

            let recentMatches = [];         
            var promiseArray = [];
            

            if("errors" in json){
                res.json({result: -1});
                return Promise.reject("rejected: pelaajaa ei löytynyt");
            
            } 
            else if(json.data[0].relationships.matches.data.length === 0){
                res.json({result: -2});
                return Promise.reject("rejected: no recent matches found");

            }
            
            else{
                
                for(let i = 0; i <= json.data[0].relationships.matches.data.length - 1; i++){
                    recentMatches[i] = json.data[0].relationships.matches.data[i].id;
                
                }
        
                let soloFPPstatsit = [];
                let duoFPPstatsit = [];
                let squadFPPstatsit = [];
                
                for (let i = 0; i < recentMatches.length; i++){

                    promiseArray.push(new Promise(function(resolve, reject) {   
                    let matchURL2 = 'https://api.pubg.com/shards/steam/matches/' + recentMatches[i];

                    if(true){

                        request({headers: {'Accept': 'application/vnd.api+json'}, uri: matchURL2}, (err, res, body2) => {

                            if(err){

                                console.log("seuraava errori: " + err);
                                resolve("error");

                            }else{

                                resolve("success");
                                let data2 = JSON.parse(body2);
        
                                    for(var i = 0; i < data2.included.length - 1; i++){

                                        if(data2.included[i].attributes.stats != undefined && data2.included[i].attributes.stats.name == nickName){

                                            let matsi = JSON.stringify(data2.included[i].attributes.stats);
                                        

                                            if((data2.data.attributes.gameMode) === "solo-fpp"){
                                                
                                                soloFPPstatsit.push(matsi);

                                            } else if((data2.data.attributes.gameMode) === "duo-fpp"){

                                                duoFPPstatsit.push(matsi);
                                            } else if((data2.data.attributes.gameMode) === "squad-fpp"){

                                                squadFPPstatsit.push(matsi);
                                            }
                                        

                                        

                                            
                                        }

                                            

                                    }
                                    
                    }
        
                }

                )
            
            }

             }));
                    
                
            
            }

            //kun kaikki promiset resolvanneet
                Promise.all(promiseArray).then(function(){
                
                let stats = calculateStats(soloFPPstatsit);
                let duostats = calculateStats(duoFPPstatsit);
                let squadstats = calculateStats(squadFPPstatsit);
                
        
                res.json({'result': 2, 'nickname': nickName, 'stats': stats, 'duostats': duostats, 'squadstats': squadstats});

                return Promise.resolve(soloFPPstatsit);


            });
            
            
            }

        }


    
        playerRequest.then(analyzeData).catch(function(err){console.log(err)});



        }

        //GET request for player stats 
        GETrequest(req, res){

        console.log("/profile post request");


        const nickName = req.params.id;
        const APIkey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3MjQxNDYzMC0yOGE2LTAxMzYtMzUzMi01YjVkMjA0MzZjYmEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTI0NDM0NDA4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1YmdzdGF0c2FwcCJ9.g0mi1hplrmyRs5Pk6FYpJmbtz7k4kG80h-pdBEevtPw'
        let url = "https://api.pubg.com/shards/steam/players?filter[playerNames]=" + nickName;
   
   
        
        let playerRequest = new Promise(function(resolve, reject){
            
            request({headers: {'Authorization': 'Bearer ' + APIkey, 'Accept': 'application/vnd.api+json'}, uri: url}, (err, res, body) => {
                if (err){
                    console.log("seuraava errori: " + err);
                    reject("rejected!");
        
                } else{

                    console.log("successfull API request (playerRequest)");
                    let data = JSON.parse(body);
                    resolve(body);
                
                }});

        });

        

        let analyzeData = function(data){

            const json = JSON.parse(data);

            let recentMatches = [];         
            var promiseArray = [];
            

            if("errors" in json){
                res.json({result: -1});
                return Promise.reject("rejected: pelaajaa ei löytynyt");
            
            } 
            else if(json.data[0].relationships.matches.data.length === 0){
                res.json({result: -2});
                return Promise.reject("rejected: no recent matches found");

            }
            
            else{
                
                for(let i = 0; i <= json.data[0].relationships.matches.data.length - 1; i++){
                    recentMatches[i] = json.data[0].relationships.matches.data[i].id;
                
                }
        
                let soloFPPstatsit = [];
                let duoFPPstatsit = [];
                let squadFPPstatsit = [];
                
                for (let i = 0; i < recentMatches.length; i++){

                    promiseArray.push(new Promise(function(resolve, reject) {   
                    let matchURL2 = 'https://api.pubg.com/shards/steam/matches/' + recentMatches[i];

                    if(true){

                        request({headers: {'Accept': 'application/vnd.api+json'}, uri: matchURL2}, (err, res, body2) => {

                            if(err){

                                console.log("seuraava errori: " + err);
                                resolve("error");

                            }else{

                                resolve("success");
                                let data2 = JSON.parse(body2);
        
                                    for(var i = 0; i < data2.included.length - 1; i++){

                                        if(data2.included[i].attributes.stats != undefined && data2.included[i].attributes.stats.name == nickName){

                                            let matsi = JSON.stringify(data2.included[i].attributes.stats);
                                        

                                            if((data2.data.attributes.gameMode) === "solo-fpp"){
                                                
                                                soloFPPstatsit.push(matsi);

                                            } else if((data2.data.attributes.gameMode) === "duo-fpp"){

                                                duoFPPstatsit.push(matsi);
                                            } else if((data2.data.attributes.gameMode) === "squad-fpp"){

                                                squadFPPstatsit.push(matsi);
                                            }
                                        

                                        

                                            
                                        }

                                            

                                    }
                                    
                    }
        
                }

                )
            
            }

             }));


            
            }

                //suoritetaan kun kaikki promiset promiseArrayssä toteutuneet
                Promise.all(promiseArray).then(function(){
                
                let stats = calculateStats(soloFPPstatsit);
                let duostats = calculateStats(duoFPPstatsit);
                let squadstats = calculateStats(squadFPPstatsit);
                
        
                res.json({'result': 2, 'nickname': nickName, 'stats': stats, 'duostats': duostats, 'squadstats': squadstats});

                return Promise.resolve("stats sent");


            });
            
            
            }

        }
    
        playerRequest.then(analyzeData).catch(function(err){console.log(err)});


        }

}



let controllerObj = new Controller();
module.exports = controllerObj;