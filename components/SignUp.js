import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input,
    InputGroup,
    Item,
    Label, Left,
    List,
    ListItem, Right, Text,
    Title,
    Root,
    Toast
} from "native-base"
import styles from "../styles/styles"
import {Actions} from "react-native-router-flux";
import {API_URL} from "../constant";
import { KeyboardAvoidingView } from 'react-native';

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    handlerSignUp() {
        if(this.state.password!==this.state.confirmPassword){
            Toast.show({
                text: "Password does not match confirm password",
                textStyle: {fontSize: 13},
                buttonText: "Got it!",
                duration: 3000,
                position: "top"
            })
        }else if(this.state.password===""){
            Toast.show({
                text: "Please enter your password",
                textStyle: {fontSize: 13},
                buttonText: "Got it!",
                duration: 3000,
                position: "top"
            })
        }
        else if(this.state.username===""||this.state.email===""){
            Toast.show({
                text: "Please enter your username and email",
                textStyle: {fontSize: 13},
                buttonText: "Got it!",
                duration: 3000,
                position: "top"
            })
        }
        else {
            let pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            if (pattern.test(this.state.email)) {
                fetch(`${API_URL}/users/register`, {
                    method: 'POST',
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "signupDate": '2020-01-28T12:00:00.000+0000',
                        "password": this.state.password,
                        "gender": 'M',
                        "emailAddress": this.state.email,
                        "nationality": 90,
                        "firstName": 'Xiao',
                        "lastName": 'Yu',
                        "userName": this.state.username,
                        "vegetarian": false,
                        "vegan": false,
                        "lactoseIntolerant": false,
                        "glutenFree": false,
                    })
                }).then((response) => {
                    if (response.status == "200") {
                        alert('Register successfully');
                        console.log('Register successfully');
                        Actions.pop();
                    } else if (response.status == "226") {
                        alert('User has existed');
                        console.log('The username has existed')
                    }
                    //throw new Error(response.statusText)
                }).catch((error) => {
                    console.log('Exist Error: ' + error);
                })
            }else {
                Toast.show({
                    text: "Invalid email address!",
                    textStyle: {fontSize: 13},
                    buttonText: "Got it!",
                    duration: 3000,
                    position: "top"
                })
            }
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {Actions.pop()}}>
                            <Icon name='arrow-back' style={{color: '#00BBF2', paddingLeft: 15}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                    <Right />
                </Header>
                {

                    <Content>
                        <Root>
                        <KeyboardAvoidingView behavoir='position'>
                        <List style={{paddingTop: 150, paddingBottom: 15, width: 340, paddingLeft: 15}}>
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
                                    <Icon type="MaterialIcons" name="mail" style={{color: '#fe6e32'}}/>
                                    <Item floatingLabel>
                                        <Label style={{padding: 10, fontSize: 15}}> Email </Label>
                                        <Input
                                            onChangeText={(text)=>this.setState({email:text})}
                                            value = {this.state.email}
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
                                            onChangeText={(text)=>this.setState({password:text})}
                                            value = {this.state.password}
                                            secureTextEntry = {true}
                                        />
                                    </Item>
                                </InputGroup>
                            </ListItem>
                            <ListItem style={{borderColor: 'white'}}>
                                <InputGroup>
                                    <Icon type="MaterialIcons" name="done" style={{color: '#fe6e32'}}/>
                                    <Item floatingLabel>
                                        <Label style={{padding: 10, fontSize: 15}}>Confirm Password </Label>
                                        <Input
                                            onChangeText={(text)=>this.setState({confirmPassword:text})}
                                            value = {this.state.confirmPassword}
                                            secureTextEntry = {true}
                                        />
                                    </Item>
                                </InputGroup>
                            </ListItem>
                        </List>
                        <Button style={[styles.primaryButton, {width: 340}]} onPress={this.handlerSignUp.bind(this)}>
                            <Text style={{fontWeight: "bold"}}>Sign Up</Text>
                        </Button>


                        {/*<Button style={[styles.primaryButton, {width: 340}]} onPress={()=>Actions.pop()}>*/}
                        {/*    <Text style={{fontWeight: "bold"}}>Back to Login</Text>*/}
                        {/*</Button>*/}
                        </KeyboardAvoidingView>
                    </Root>
                    </Content>

                }
            </Container>
        );
    }
}

export default SignUp;