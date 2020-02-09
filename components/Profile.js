import React, {Component} from 'react';
import {Container, Content, Text, Button} from "native-base"
import {AsyncStorage} from "react-native"
import {TOKEN_KEY} from "../constant"
import {Actions} from "react-native-router-flux";

class Profile extends Component {
   logoutHandler(){
       AsyncStorage.removeItem(TOKEN_KEY)
           .then(()=>{
               console.log("Token Removed!");
               Actions.login();
           }).catch((error)=>{
               console.log(`Error in removing token --> ${error}`);
       })

   }
    render() {
        return (
            <Container>
                <Content>
                    <Text style = {{padding:30}}>This is Profile</Text>
                    <Button primary onPress={this.logoutHandler}>
                        <Text>
                            LogOut
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default Profile;