import React, {Component}from 'react';
import SignUp from "./components/SignUp";
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Login from './components/Login';
import Home from "./components/Home";
import {AsyncStorage} from "react-native"
import {TOKEN_KEY, API_URL} from "./constant";
import MealPlanStack from './routes/MealPlanStack';
import MealPlanRecipe from "./components/MealPlanRecipe";

export default class App extends Component {
    state = {
        init : true,
        userId: 0
    }

    componentDidMount(){
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    this.userInfoHandler(accessToken);
                    fetch(API_URL, {
                        method: 'GET',
                        headers: {
                            'Authorization': accessToken
                        }
                    }).then((response)=>{
                        if(response.status=='200'){
                            this.setState({init:false});
                        }else{
                            this.setState({init:true});
                        }
                    })
                }
            }).catch((error)=>{
                console.log(`Unable to get token -->${error}`);
        });

    }

    userInfoHandler(accessToken){
        return fetch(`${API_URL}/`, {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        }).then((response)=>{
            if(response.status=='200'){
                return response.json();
            }
        }).then((responseData)=>{
            this.setState({userId: responseData.userId});
        }).catch((error)=>{
            console.log(`Error in fetching user id --> ${error}`);
        })
    }

  render(){
      return  <Router>
                <Scene key="root">
                    <Scene key="login"  component={Login} hideNavBar={true} title="Login" initial={this.state.init}/>
                    <Scene key="signup" component={SignUp} hideNavBar={true} title="SignUp"/>
                    <Scene key="home" data={this.state.userId} component={Home} hideNavBar={true} title = "My Kitchen Manager" initial={!this.state.init}/>
                    <Scene key="recipe" component={MealPlanRecipe} hideNavBar={true} title="MealPlanRecipe" />
                </Scene>
              </Router>

    }
}

