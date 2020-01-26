import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Label, Button, Item } from 'native-base';
import React, {Component} from 'react';
import {Actions} from "react-native-router-flux";
import styles from '../styles/styles.js';

export default class Login extends Component {

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
                                        <Input/>
                                    </Item>
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <InputGroup>
                                    <Icon name="ios-unlock" style={{color: '#fe6e32'}}/>
                                    <Item floatingLabel>
                                        <Label style={{padding: 10, fontSize: 15}}> Password </Label>
                                        <Input/>
                                    </Item>
                                </InputGroup>
                            </ListItem>
                        </List>
                        <Button style={styles.primaryButton}>
                            <Text style={{fontWeight: "bold"}}>Log in</Text>
                        </Button>
                        <Button style={styles.primaryButton} onPress={()=>Actions.signup()}>
                            <Text style={{fontWeight: "bold"}}>New Here?</Text>
                        </Button>

                    </Content>
                }
            </Container>
        );
    }
}

