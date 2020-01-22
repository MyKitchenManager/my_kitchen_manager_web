import React, { Component }from 'react';
import { Container, Content, Item, Input, Icon, Button, Form, Label } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import {styles} from '../styles';

export default class Login extends Component {
    render() {
        return (

                <Container>
                    <Content>
                        <Form>
                            <Item stackedLabel>
                                <Label>Username</Label>
                                <Input />
                            </Item>
                            <Item stackedLabel last>
                                <Label>Password</Label>
                                <Input />
                            </Item>
                            <Button primary style={{padding: 20,textAlign: 'center',borderWidth: 1,
                                borderRadius: 5}}>

                                    <Text style = {styles.whiteText}>
                                              Sign in
                                    </Text>

                            </Button>
                        </Form>

                    </Content>
                </Container>

        )
    }
}
