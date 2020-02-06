import { Header,Container,Title, Content, List, ListItem, InputGroup, Icon, Text, Label, Button, Footer, FooterTab, Left, Right, Body} from 'native-base';
import React, {Component} from 'react';
import MealPlan from "./MealPlan";
import Inventory from "./Inventory";
import MealPool from "./MealPool";
import {Actions} from "react-native-router-flux";
import styles from '../styles/styles.js';
import Profile from "./Profile"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: ""
        }
    }
    pageHandler(data){
        this.setState({page:data});
    }

    render() {
        let view = <MealPlan/>;
        switch (this.state.page) {
            case "mealplan":
                view = <MealPlan/>;
                break;
            case "inventory":
                view = <Inventory/>;
                break;
            case "mealpool":
                view = <MealPool/>;
                break;
            case "profile":
                view = <Profile/>;
                break;
            default:
                break;
        }
        return (
           <Container>

               {view}

                <Footer style={{height: 60}}>
                    <FooterTab style={{paddingBottom: 30}}>
                        <Button vertical onPress = {()=>{
                            if(this.state.page != "mealplan"){
                                this.setState({page: "mealplan"});
                            }
                        }}>
                            <Icon name="calendar"/>
                            <Text style = {{fontSize: 12}}>Meal Plan</Text>
                        </Button>
                        <Button vertical onPress = {()=>{
                            if(this.state.page != "inventory"){
                                this.setState({page: "inventory"});
                            }}}>
                            <Icon type='MaterialIcons' name="store"/>
                            <Text style = {{fontSize: 12}}>Inventory</Text>
                        </Button>
                        <Button vertical onPress = {()=>{
                            if(this.state.page != "mealpool"){
                                this.setState({page: "mealpool"});
                            }}}>
                            <Icon type='MaterialIcons' name="apps"/>
                            <Text style = {{fontSize: 12}}>Meal Pool</Text>
                        </Button>
                        <Button vertical onPress = {()=>{
                            if(this.state.page != "profile"){
                                this.setState({page: "profile"});
                            }}}>
                            <Icon type='MaterialIcons' name="person"/>
                            <Text style = {{fontSize: 12}}>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
           </Container>
        );
    }
}

export default Home;