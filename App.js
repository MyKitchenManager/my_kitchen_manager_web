import React, {Component}from 'react';
import SignUp from "./components/SignUp";
import {Scene, Router} from 'react-native-router-flux';
import Login from './components/Login';
import Home from "./components/Home";
import {AsyncStorage} from "react-native"
import {TOKEN_KEY, API_URL} from "./constant";
import MealPlanRecipe from "./components/MealPlanRecipe";
import MealPool from './components/MealPool';
import AddRecipePage from "./components/AddRecipePage";
import ShoppingListPage from "./components/ShoppingListPage";
import Inventory from "./components/Inventory";

export default class App extends Component {
    state = {
        init : true,
        userId: 0
    }

    componentDidMount(){
        console.disableYellowBox = true;
        // console.ignoredYellowBox = ['Warning:'];
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
                    <Scene key="home" data={this.state.userId}  component={Home} hideNavBar={true} title = "My Kitchen Manager" initial={!this.state.init}/>
                    <Scene key="recipe" component={MealPlanRecipe} hideNavBar={true} title="MealPlanRecipe" />
                    <Scene key="add_recipe_page" component={AddRecipePage} hideNavBar={true} title="AddRecipePage" />
                    <Scene key="meal_pool" component={MealPool} hideNavBar={true} title="MealPool"/>
                    <Scene key="shopping_list_page" component={ShoppingListPage} hideNavBar={true} title="ShoppingList"/>
                    {/*<Scene key="inventory_page" component={Inventory} hideNavBar={true} title="Inventory"/>*/}
                </Scene>
              </Router>
    }
}

