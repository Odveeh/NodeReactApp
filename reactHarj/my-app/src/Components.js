import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons'



class LoadingPage extends React.Component{
    render(){
        return(
        
        <div id="loadingcontainer">
            <div class="spinner-border" role="status"></div>
            <h1 id="loadingtext"> Loading... </h1>

        </div>

        )
    }
}


class ContactForm extends React.Component{
    render(){
      return(
        <>
  
          <p> Contact: </p>
          <form>
            <input type="text" placeholder="Name"></input>
            <input type="text" placeholder="Email Address"></input>
            <input type="text" placeholder="Message"></input>
          <button> Send </button>
  
          </form>
        
  
  
  
        </>
      )
    }
  
  
  }

  class NotFoundPage extends React.Component{
    render(){
        return(
          <>
          <div id="matches">
            <FontAwesomeIcon icon={faExclamationCircle}/>
            <h2> player not found! </h2>

          </div>
           
          </>
        )
            
        
    }
}

class NoMatchesFoundPage extends React.Component{
  render(){
      return(
        <>
        <div id="matches">
          <FontAwesomeIcon icon={faExclamationCircle}/>
          <h2> No recent matches found! </h2>

        </div>
          
        </>
      )
          
      
  }
}

class Solostats extends React.Component{
  constructor(props){
    super(props);

  

   

  
  
    
  }
  render(){

    let loadingID;
    let spinnerID;

    if(!this.props.reloading){
      loadingID = "statscontainer-inner";
      spinnerID = "spinner2-hidden";
    } else  {
      loadingID = "statscontainer-inner-blur";
      spinnerID = "spinner2-visible";
    }
    

    return(
      <div>
        <div  id="statscontainer-solo">

        <div class="spinner-border" id={spinnerID} role="status"></div>
        <div id={loadingID}>
        

          <div id="something"> 
            <p id="gamemodetext"> <b> Solo-FPP stats </b>  </p>
        </div>
        
        <table class="table table-striped table-dark table-hover" id="mainstats">
          <tbody>
           <tr>
                <td> Games played: </td>
                <td> {this.props.gamesplayed} </td>
            </tr>
            <tr>
                <td> Kills: </td>
                <td> {this.props.text1} </td>
            </tr>
        
            <tr>
                <td> Avg. Damage: </td>
                <td> {this.props.text2} </td>
            </tr>
            <tr>
                <td> Kills per Game avg: </td>
                <td> {this.props.kpm} </td>
            </tr>
            <tr>
                <td> Average placement: </td>
                <td> {this.props.placementavg} </td>
            </tr>

            <tr>
                <td> Wins: </td>
                <td> {this.props.wins} </td>
            </tr>
            </tbody>

        </table>
            
           
        
        
        
      
        </div>
        
        </div>
        
      </div>
    )
  }
}
class Duostats extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
      <div  id="statscontainer-duo">
      <div id="statscontainer-inner">
      
      
      <div id="something"> 
          <p id="gamemodetext"> <b> Duo-FPP stats </b>  </p>
      </div>
      
      <table class="table table-striped table-dark table-hover" id="mainstats">
        <tbody>
         <tr>
              <td> Games played: </td>
              <td> {this.props.duostats.duogamesplayed} </td>
          </tr>
          <tr>
              <td> Kills: </td>
              <td> {this.props.duostats.duokills} </td>
          </tr>
      
          <tr>
              <td> Avg. Damage: </td>
              <td> {this.props.duostats.duoAvgDMG} </td>
          </tr>
          <tr>
              <td> Kills per Game avg: </td>
              <td> {this.props.duostats.duoKPM} </td>
          </tr>
          <tr>
              <td> Average placement: </td>
              <td> {this.props.duostats.duoAvgPlacement} </td>
          </tr>

          <tr>
              <td> Wins: </td>
              <td> {this.props.duostats.duowins} </td>
          </tr>
          </tbody>

      </table>
    
      </div>
      
      </div>
      
    </div>
    )
  }
}
class Squadstats extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
      <div  id="statscontainer-squad">
      <div id="statscontainer-inner">
      
      
      <div id="something"> 
          <p id="gamemodetext"> <b> Squad-FPP stats </b>  </p>
      </div>
      
      <table class="table table-striped table-dark table-hover" id="mainstats">
        <tbody>
         <tr>
              <td> Games played: </td>
              <td> {this.props.squadstats.squadgamesplayed} </td>
          </tr>
          <tr>
              <td> Kills: </td>
              <td> {this.props.squadstats.squadkills} </td>
          </tr>
      
          <tr>
              <td> Avg. Damage: </td>
              <td> {this.props.squadstats.squadAvgDMG} </td>
          </tr>
          <tr>
              <td> Kills per Game avg: </td>
              <td> {this.props.squadstats.squadKPM} </td>
          </tr>
          <tr>
              <td> Average placement: </td>
              <td> {this.props.squadstats.squadAvgPlacement} </td>
          </tr>

          <tr>
              <td> Wins: </td>
              <td> {this.props.squadstats.squadwins} </td>
          </tr>
          </tbody>

      </table>
    
      </div>
      
      </div>
      
    </div>
    )
  }
}


  export {LoadingPage, ContactForm, NotFoundPage, NoMatchesFoundPage, Solostats, Duostats, Squadstats};