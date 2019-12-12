import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Route, Switch, Link} from 'react-router-dom'
import screwimg from './IMG/screwplaceholder.png';
import {LoadingPage, ContactForm, NotFoundPage, NoMatchesFoundPage, Solostats, Duostats, Squadstats} from './Components';
import pubglogo from './IMG/pubglogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons'
import {faRedo} from '@fortawesome/free-solid-svg-icons'


class MainPage1 extends React.Component{


    render(){   

        let currentTab;

        if (this.props.currentTab1 === "solo"){
          currentTab = <Solostats text1={this.props.text1} text2={this.props.text2} gamesplayed={this.props.gamesplayed} kpm={this.props.kpm} reloading={this.props.reloading}
          placementavg={this.props.placementavg} wins={this.props.wins} />
        } else if (this.props.currentTab1 === "duo"){
          currentTab = <Duostats duostats={this.props.duostats} reloading={this.props.reloading} />
        } else if (this.props.currentTab1 === "squad"){
          currentTab = <Squadstats squadstats={this.props.squadstats} reloading={this.props.reloading} />
        }
      


        return(
        
        <div>

            <div id="upperwrapper">
            <img class="img-fluid" src={screwimg} id="screwimg" />
              <div id="nametextdiv">
                <p id="nameText"> {this.props.nickname} </p> 
                
              </div>

              <button type="button" class="btn btn-primary" id="reloadbutton" onClick={this.props.getServerData} title="Update statistics"> <FontAwesomeIcon icon={faRedo}/> </button>
              
              
              <p> <b> Last updated:  </b> {this.props.lastupdated} </p> 

            </div>
            
      
          
            <div class="tab">
              <button class="tablinks active" id="solo" onClick={(event) => this.props.changeTabs(event, "solo")}> 
              <div> <FontAwesomeIcon icon={faUser}/> </div>  Solo </button>

              <button class="tablinks" id="duo" onClick={(event) => this.props.changeTabs(event, "duo")}> 
              <div> <FontAwesomeIcon icon={faUser}/><FontAwesomeIcon icon={faUser} /> </div>  Duo </button>

              <button class="tablinks" id="squad" onClick={(event) => this.props.changeTabs(event, "squad")}> 
              <div> <FontAwesomeIcon icon={faUser}/><FontAwesomeIcon icon={faUser}/><FontAwesomeIcon icon={faUser}/><FontAwesomeIcon icon={faUser}/> </div> Squad </button>
            </div>
       
  
           {currentTab}

        </div>
        
    
    
  
      );
   }
 

}




class App2 extends Component {
  
  constructor(props){
    super(props);

    this.changeTab = this.changeTab.bind(this);

    this.state = {
      renderMode: 0,
      loading: false,
      reloading: false,
      text1: "",
      text2: "",
      inputText: "",
      nickname: "Tuntematon sotilas",
      currentLocation: "",
      currentTab: "solo",
      lastupdated: "",
      gamesplayed: "",
      kpm: "",
      avgdmg: "",
      placementavg: "",
      wins: "",

      duoFPPstats: {
        duokills: "",
        duogamesplayed: "",
        duoAvgDMG: "",
        duoKPM: "",
        duoAvgPlacement: "",
        duoWins: "",
      },
      squadFPPstats: {
        squadkills: "",
        squadgamesplayed: "",
        squadAvgDMG: "",
        squadKPM: "",
        squadAvgPlacement: "",
        squadWins: "",
      }
      
     


    };

  };

  changeTab = (evnt, value) => {

    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

      evnt.currentTarget.className += " active";
    
      if(value === "solo"){
        this.setState({
        currentTab: "solo",
        })
      } else if (value === "duo"){
        this.setState({
          currentTab: "duo",
          })
      } else if (value === "squad"){
        this.setState({
          currentTab: "squad",
          })
      }

      

    
  }

  doSomething = () => {
    this.setState({text1: "muutettuteksti"});
  }

 

  getServerDataGET = () => {

    this.setState({loading: true});

    let currentLocation = 'http://localhost:3000' + window.location.pathname;
    console.log(currentLocation);
  

    axios.get(currentLocation).then(res => {
      
      const myData = res.data;
      console.log(myData);
      
      if("result" in myData && myData.result === -1){

        this.setState({loading: false, renderMode: 1});
        console.log("player not found");

      } else if ("result" in myData && myData.result === -2){
        this.setState({loading: false, renderMode: 2});
        console.log("no matches found");

      } else if (myData.result === 2) {

        //this.setState({loading: false, renderMode: 0, text1: '3.2', text2: '5.5', nickname: myData.nickname});

        let pvm = new Date();

        //kellonajan muotoilua
       
        let getParsedMinutes = () => {if(pvm.getMinutes() < 10){console.log("alle 10"); return '0' + pvm.getMinutes();} else {return pvm.getMinutes()}};

        pvm = pvm.getDate() + "." + (pvm.getMonth()+1) + "." + pvm.getFullYear() + ", " + pvm.getHours() + ":" + getParsedMinutes();

        
      

        this.setState({loading: false, renderMode: 0, text1: myData.stats.kills, text2: (myData.stats.damageAvg).toFixed(2), nickname: myData.nickname,
        lastupdated: pvm, gamesplayed: myData.stats.gamesPlayed, kpm: (myData.stats.killAvg).toFixed(2), wins: myData.stats.wins, 
        placementavg: (myData.stats.placementAvg).toFixed(2), 
        duoFPPstats: {duokills: myData.duostats.kills, duogamesplayed: myData.duostats.gamesPlayed, duoAvgDMG: (myData.duostats.damageAvg).toFixed(2), 
        duoKPM: (myData.duostats.killAvg).toFixed(2), duoAvgPlacement:(myData.duostats.placementAvg).toFixed(2), duowins: myData.duostats.wins},
        
        squadFPPstats: {squadkills: myData.squadstats.kills, squadgamesplayed: myData.squadstats.gamesPlayed, squadAvgDMG: (myData.squadstats.damageAvg).toFixed(2), 
        squadKPM: (myData.squadstats.killAvg).toFixed(2), squadAvgPlacement:(myData.squadstats.placementAvg).toFixed(2), squadwins: myData.squadstats.wins}
      });
      } else {

        this.setState({loading: false, renderMode: 0});
      }
       
    }, error => {
      console.log("cant get data from server");

    }
    ); 

  }

  getServerData = () => {

    console.log("getServerData funktio");

    this.setState({loading: true});

    const reqData = this.state;

  

    axios.post('http://localhost:3000/profile', reqData).then(res => {
      
      const myData = res.data;
      console.log(myData);
      
      if("result" in myData && myData.result === -1){

        this.setState({loading: false, renderMode: 1});
        console.log("errors luls");

      } else if ("result" in myData && myData.result === -2){
        this.setState({loading: false, renderMode: 2});
        console.log("no matches found");
      }
        else if (myData.result === 2) {

        let pvm = new Date();

        //kellonajan muotoilua
       
        let getParsedMinutes = () => {if(pvm.getMinutes() < 10){console.log("alle 10"); return '0' + pvm.getMinutes();} else {return pvm.getMinutes()}};

        pvm = pvm.getDate() + "." + (pvm.getMonth()+1) + "." + pvm.getFullYear() + ", " + pvm.getHours() + ":" + getParsedMinutes();

        
      

        this.setState({loading: false, renderMode: 0, text1: myData.stats.kills, text2: (myData.stats.damageAvg).toFixed(2), nickname: myData.nickname,
        lastupdated: pvm, gamesplayed: myData.stats.gamesPlayed, kpm: (myData.stats.killAvg).toFixed(2), wins: myData.stats.wins, 
        placementavg: (myData.stats.placementAvg).toFixed(2), 
        duoFPPstats: {duokills: myData.duostats.kills, duogamesplayed: myData.duostats.gamesPlayed, duoAvgDMG: (myData.duostats.damageAvg).toFixed(2), 
        duoKPM: (myData.duostats.killAvg).toFixed(2), duoAvgPlacement:(myData.duostats.placementAvg).toFixed(2), duowins: myData.duostats.wins},
        
        squadFPPstats: {squadkills: myData.squadstats.kills, squadgamesplayed: myData.squadstats.gamesPlayed, squadAvgDMG: (myData.squadstats.damageAvg).toFixed(2), 
        squadKPM: (myData.squadstats.killAvg).toFixed(2), squadAvgPlacement:(myData.squadstats.placementAvg).toFixed(2), squadwins: myData.squadstats.wins}
      });



      }
       
    }, error => {
      console.log("cant get data from server");

    }
    );

  }

  

  inputChangeHandler = (event) => {

    this.setState({inputText: event.target.value})


  }
  
  componentDidMount(){
    console.log("current path: " + window.location.pathname);
    if(window.location.pathname != '/'){
      this.getServerDataGET();
    }
    
  }


  render(){

    
    let content;

    
    
    
    if(!this.state.loading && this.state.renderMode === 0){
        content = <MainPage1 nickname={this.state.nickname} text1={this.state.text1} text2={this.state.text2} changeTabs={this.changeTab} currentTab1={this.state.currentTab}
        lastupdated={this.state.lastupdated} getServerData={this.getServerData} gamesplayed={this.state.gamesplayed} kpm={this.state.kpm} wins={this.state.wins}
        placementavg={this.state.placementavg} duostats={this.state.duoFPPstats} squadstats={this.state.squadFPPstats} reloading={this.state.reloading} />
    } else if (!this.state.loading && this.state.renderMode === 1){
        content = <NotFoundPage />
    } else if (!this.state.loading && this.state.renderMode === 2){
      content = <NoMatchesFoundPage />
    }
      else {
        content = <LoadingPage />
    }
   
        return (
        
          
        <div>

           
        
        

        <div class="container-fluid" id="nav">
        
          <div class="container" id="nav">

        <div id="logodiv">
          <a href="/"> <img class="img-fluid" src={pubglogo} id="pubglogo" /> </a>
        </div>
        
            
            <form autocomplete="off">
              <input type="text" onChange={this.inputChangeHandler} placeholder="Enter PUBG username..." id="nicknametext" />
              <Link to={`/users/${this.state.inputText}`}>
              <button type="button" class="btn btn-primary" onClick={this.getServerData} id="sendformbutton"> Search  </button>
              </Link>
              
            </form>
         
          </div>
         
        </div>
        
        <div class="container-fluid" id="content">
            <div class="container" id="maincontent">
            <img class="img-fluid" src={screwimg} id="screwimg2" />
            <img class="img-fluid" src={screwimg} id="screwimg3" />
            <Switch>
          <Route exact path="/Contact" component={ContactForm} />
        </Switch>
                {content}
                
            </div>
        </div>

        <div class="container-fluid" id="footer">

            <div class="container" id="inner-footer">
              <div class="container" id="inner-inner-footer">
              <div id="footertextdiv">
                <p id="footertext"> Website created by Otto Österberg. Data based on the official PUBG API. </p>
              </div>
                
              <div id="footerinfodiv">
                <ul id="footer">
                  <li id="testi"> <a href="mailto: osterberg.otto@gmail.com"> Contact <FontAwesomeIcon icon={faEnvelopeOpen}/>  </a>   </li>
                
                </ul>
              </div>
             

              </div>
              

                

            </div>


        </div>
        
      </div>
     

      );

     
  
      
      
   


      
  }
    
}

export default App2;
