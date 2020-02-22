import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Label, Button, Item } from 'native-base';
import React, {Component} from 'react';
import {Actions} from "react-native-router-flux";
import styles from '../styles/styles.js';
import {API_URL, TOKEN_KEY} from "../constant";
import {AsyncStorage, View, KeyboardAvoidingView } from "react-native";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    async _onValueChange(accessToken){
        try {
            await AsyncStorage.setItem(TOKEN_KEY, accessToken);
            let value = await AsyncStorage.getItem(TOKEN_KEY);
            if(value!==null){
                console.log(value);
            }else{
                console.log("null");
            }
        }catch (error) {
            console.log(`Async Storage Error -->${error}`);
        }
    }

    async loginHandler(){
        return fetch(`${API_URL}/login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName : this.state.username,
                password : this.state.password,
            }),
        })
            .then((response) => {
                console.log(response.status);
                if (response.status == "200") {
                    return response.headers;
                } else {
                    alert('User does not exist')
                }
            })
            .then((headers) => {
                console.log('Success:', headers);
                let accessToken = headers.get('authorization').toString();
                //console.log(accessToken);
                this._onValueChange(accessToken);
            }).then(()=>{
                Actions.home({page:"mealplan"});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        // The content of the screen should be inputs for a username, password and submit button.
        // If we are loading then we display an ActivityIndicator.

        return (
            <Container>
                {/*<Header>*/}
                {/*    <Text style = {{fontWeight: "bold", paddingTop:10, fontSize:17}}>*/}
                {/*        Login*/}
                {/*    </Text>*/}
                {/*</Header>*/}


                {
                    <Content>
                        <View style={{marginTop: 200, alignSelf: "center", alignItems: "center",}}>
                            <Text style={{fontSize: 26, fontWeight: 'bold'}}>
                                Your kitchen.
                                <Text style={{fontSize: 26, fontWeight: 'bold', color: '#00BBF2'}}> Manager </Text>
                            </Text>
                            <Text style={{color:'#C5CCD6', fontSize: 18}}>Enjoy fast and healthy meal</Text>
                        </View>
                        <KeyboardAvoidingView behavior="position">
                        <List style={{paddingTop: 200, paddingBottom: 15, width: 350, paddingLeft: 15}}>
                            <ListItem style={{borderColor: 'white'}}>
                                <InputGroup>
                                    <Icon name="ios-person" style={{color: '#fe6e32'}}/>
                                    <Item floatingLabel>
                                        <Label style={{padding: 10, fontSize: 15}}> Username </Label>
                                        <Input
                                            onChangeText={(text)=>this.setState({username:text})}
                                            value = {this.state.username}
                                        />
                                    </Item>
                                </InputGroup>
                            </ListItem>
                            <ListItem style={{borderColor: 'white'}}>
                                <InputGroup>
                                    <Icon name="ios-unlock" style={{color: '#fe6e32'}}/>
                                    <Item floatingLabel>
                                        <Label style={{padding: 10, fontSize: 15}}> Password </Label>
                                        <Input
                                            onChangeText = {(text)=>this.setState({password:text})}
                                            value = {this.state.password}
                                            secureTextEntry={true}
                                        />
                                    </Item>
                                </InputGroup>
                            </ListItem>
                        </List>
                        <Button style={[styles.primaryButton, {width: 340}]}onPress={this.loginHandler.bind(this)}>
                            <Text style={{fontWeight: "bold"}}>Log in</Text>
                        </Button>

                        <Text style = {{alignSelf: "center", paddingTop: 10}}>Or New Here?</Text>
                        <Button onPress={()=>Actions.signup()} style={[styles.primaryButton, {width: 340}]}>
                            <Text style={{fontWeight: "bold"}}>Register</Text>
                        </Button>

                        {/*<Text style = {{alignSelf: "center", paddingTop: 10}}>*/}
                        {/*    Or New Here? Try <Text onPress={()=>Actions.signup()} style={{fontWeight: "bold", color:"#47c1fe"}}>Register</Text>*/}
                        {/*</Text>*/}
                        </KeyboardAvoidingView>

                    </Content>
                }
            </Container>
        );
    }
}

