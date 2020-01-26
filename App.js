import React, {Component}from 'react';
import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Picker, Button } from 'native-base';

import { StyleSheet, Text, View } from 'react-native';
import LoginForm from './components/LoginForm';
//import TopBar from "./components/TopBar"

export default class App extends Component {
  render(){
      return (
          <View style = {{flex: 1, padding: 7}}>
              <LoginForm/>
          </View>
      );
  }
}

