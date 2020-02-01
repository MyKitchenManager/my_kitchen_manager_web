import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Label, Button, Item } from 'native-base';
import React, {Component} from 'react';
import {Actions} from "react-native-router-flux";
import styles from '../styles/styles.js';

class Home extends Component {
    render() {
        return (
           <Container>
               <Text style = {{alignSelf:"center"}}>This is Home</Text>
           </Container>
        );
    }
}

export default Home;