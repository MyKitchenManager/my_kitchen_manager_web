import React, {Component}from 'react';
import SignUp from "./components/SignUp";
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Login from './components/Login';
import Home from "./components/Home";
import {AsyncStorage} from "react-native-web"
import {TOKEN_KEY, API_URL} from "./constant";


export default class App extends Component {
    state = {
        init : true
    }
    componentDidMount(){
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    fetch(API_URL, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer '+accessToken
                        }
                    }).then((response)=>{
                        if(response.status=='200'){
                            this.setState({init:false});
                        }else{
                            this.setState({init:true});
                        }
                    })
                }
            });

    }

  render(){
      return  <Router>
                <Scene key="root">
                    <Scene key="login" component={Login} title="Login" initial={this.state.init}/>
                    <Scene key="signup" component={SignUp} title="SignUp"/>
                    <Scene key="home" component={Home} title = "My Kitc1234hen Manager" initial={!this.state.init}/>
                </Scene>
              </Router>
    }
}

