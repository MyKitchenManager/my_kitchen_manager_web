import React, {Component}from 'react';
import SignUp from "./components/SignUp";
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
//import TopBar from "./components/TopBar"

export default class App extends Component {
  render(){


      return  <Router>
                <Scene key="root">
                    <Scene key="login" component={LoginForm} title="Login" initial={true}/>
                    <Scene key="signup" component={SignUp} title="SignUp"/>
                </Scene>
              </Router>


  }
}

