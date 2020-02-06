import React, {Component} from 'react';
import {Container, Content, Text} from "native-base"

class Profile extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text style = {{padding:30}}>This is Profile</Text>
                </Content>
            </Container>
        );
    }
}

export default Profile;