import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Label, Button, Item } from 'native-base';
import React, {Component} from 'react';
import {Actions} from "react-native-router-flux";
import styles from '../styles/styles.js';
import {API_URL, TOKEN_KEY} from "../constant";
import {AsyncStorage} from "react-native-web"
import TouchableOpacity from "react-native-web/src/exports/TouchableOpacity";

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
            return await AsyncStorage.setItem(TOKEN_KEY, accessToken);
            // let value = await AsyncStorage.getItem(TOKEN_KEY)
            // if(value!==null){
            //     console.log(value);
            // }else{
            //     console.log("null");
            // }
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
                if (response.status == "200") {
                    Actions.home();
                } else {
                    alert('User does not exist')
                }

                console.log(response.status);
                return response.headers;
            })
            .then((headers) => {
                console.log('Success:', headers);
                let accessToken = headers.get('authorization').toString();
                console.log(accessToken);
                this._onValueChange(accessToken);
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
                <Header>
                    <Text style = {{fontWeight: "bold", paddingTop:10, fontSize:17}}>
                        Login
                    </Text>
                </Header>

                {
                    <Content>
                        <List style={{paddingTop: 10, paddingBottom: 15}}>
                            <ListItem>
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
                            <ListItem>
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
                        <Button style={styles.primaryButton} onPress={this.loginHandler.bind(this)}>
                            <Text style={{fontWeight: "bold"}}>Log in</Text>
                        </Button>

                        <Text style = {{alignSelf: "center", paddingTop: 10}}>Or New Here?</Text>
                        <Button onPress={()=>Actions.signup()} style={styles.primaryButton}>
                            <Text>Register</Text>
                        </Button>

                        {/*<Text style = {{alignSelf: "center", paddingTop: 10}}>*/}
                        {/*    Or New Here? Try <Text onPress={()=>Actions.signup()} style={{fontWeight: "bold", color:"#47c1fe"}}>Register</Text>*/}
                        {/*</Text>*/}

                    </Content>
                }
            </Container>
        );
    }
}

