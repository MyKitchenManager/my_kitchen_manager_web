import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Label, Button, Item } from 'native-base';
import React, {Component} from 'react';
import {Actions} from "react-native-router-flux";
import styles from '../styles/styles.js';
import {API_URL, TOKEN_KEY} from "../constant";
import {AsyncStorage} from "react-native-web"

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
        }catch (e) {
            console.log('Async Storage Error:'+e.message());
        }
    }

    loginHandler(){
        return fetch(`${API_URL}/login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : this.state.username,
                password : this.state.password,
            }),
        })
            .then((response)=> Actions.home())
            // .then((responseData)=>{
            //     //this._onValueChange(responseData.text());//这里的header要怎么拿？
            //     Actions.home();
            // })
            .catch((error) => {
            console.error(error);
        })
    }

    render() {
        // The content of the screen should be inputs for a username, password and submit button.
        // If we are loading then we display an ActivityIndicator.

        return (
            <Container>

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
                        <Text style = {{alignSelf: "center", paddingTop: 10}}>
                            Or New Here? Try <Text onPress={()=>Actions.signup()} style={{fontWeight: "bold", color:"#47c1fe"}}>Register</Text>
                        </Text>



                    </Content>
                }
            </Container>
        );
    }
}

