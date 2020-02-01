import React, {Component} from 'react';
import {
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input,
    InputGroup,
    Item,
    Label,
    List,
    ListItem, Text,
    Title
} from "native-base"
import styles from "../styles/styles"
import {Actions} from "react-native-router-flux";
import {API_URL} from "../constant";

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    handlerSignUp() {
        if(this.state.password!==this.state.confirmPassword){
            alert('Password does not match with confirm password');
        }else {
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
                    Actions.login();
                } else if (response.status == "226") {
                    alert('User has existed');
                    console.log('The username has existed')
                }
                //throw new Error(response.statusText)
            }).catch((error)=>{
                console.log('Exist Error: '+error);
            })
        }
    }

    render() {
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
                            <ListItem>
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
                            <ListItem>
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
                        <Button style={styles.primaryButton} onPress={this.handlerSignUp.bind(this)}>
                            <Text style={{fontWeight: "bold"}}>Sign Up</Text>
                        </Button>
                        {/*<Button style={styles.primaryButton} onPress={()=>Actions.pop()}>*/}
                        {/*    <Text style={{fontWeight: "bold"}}>Back to Login</Text>*/}
                        {/*</Button>*/}

                    </Content>
                }
            </Container>
        );
    }
}

export default SignUp;