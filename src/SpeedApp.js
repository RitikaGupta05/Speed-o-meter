import React, { Component } from "react";
import './SpeedApp.css';
import SpeedMeter from "./Components/speedMeter";
import apicaller from "./Utils/apicaller";
import  {API_BASE_URL} from "./Utils/Constant";
import $ from 'jquery';

     
function valBetween(v, min, max) {
  console.log(`inside valBetween ${v}`)
	return (Math.min(max, Math.max(min, v)));
}


export default class SpeedApp extends Component {
    constructor(props){
        super(props);
        }
    componentDidMount(){
        setInterval(() =>{
            this.getSpeed();
            this.manipulateTick();
         }, 5000);
      
    }

    state = { 
       speed: 0,
       valueStore : 0,
       tickStore : 1,
     };
 
    getSpeed = async () => {
      //  let datarec = Math.round(Math.random() * 100);
       let datarec = await apicaller(API_BASE_URL,'get').then(data=>{
        return data.data;
        });
       this.setState({speed : datarec});
   }
   
    manipulateTick = () => {
     var value=this.state.speed,tickStore=this.state.tickStore,valueStore=this.state.valueStore;
     var tick = valBetween(Math.ceil((value/100)*28), 1, 28);
     var tickDiff =Math.abs(tick-tickStore);
     var tickDiffValue = Math.round(Math.abs(value-valueStore)/tickDiff);
     var i=0,  counter = 0, valueStoreTemp = valueStore, tickStoreTemp = tickStore;
   	if (value > valueStore) {
   		for (i=tickStoreTemp; i<=tick; i++) {
   					$('body').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 50%), linear-gradient('+$('#gauge path:nth-child('+i+')')[0].style.fill+', '+$('#gauge path:nth-child('+i+')')[0].style.fill+' 50%, #fff 50%)');
   					$('#gauge').css('box-shadow', '0 0 32px rgba(21, 55, 172, 0.25), inset 0 -192px 192px -240px '+$('#gauge path:nth-child('+i+')')[0].style.fill+', inset 0 0 2px -1px '+$('#gauge path:nth-child('+i+')')[0].style.fill);
   					$('#gauge path:nth-child('+i+')').show();
   					$('#gauge-label')
   						.css('color', $('#gauge path:nth-child('+i+')')[0].style.fill);
   					
   				counter++;
   		}
   	} else if (value < valueStore) {
   		for (i=tickStoreTemp; i>=tick; i--) {
   					$('body').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 50%), linear-gradient('+$('#gauge path:nth-child('+i+')')[0].style.fill+', '+$('#gauge path:nth-child('+i+')')[0].style.fill+' 50%, #fff 50%)');
   					$('#gauge').css('box-shadow', '0 0 32px rgba(21, 55, 172, 0.25), inset 0 -192px 192px -240px '+$('#gauge path:nth-child('+i+')')[0].style.fill+', inset 0 0 2px -1px '+$('#gauge path:nth-child('+i+')')[0].style.fill);
   					$('#gauge path:nth-child('+i+')').hide();
   					$('#gauge-label')
   						.css('color', $('#gauge path:nth-child('+i+')')[0].style.fill);
   					
   				
   				counter++;
   		}
   	}
   	this.setState({
      valueStore : value,
   	  tickStore : tick
     });
   }

   render(){  
     return (
          <SpeedMeter speed={ this.state.speed } />
      );
  }
}

