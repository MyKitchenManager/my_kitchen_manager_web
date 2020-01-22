import React, {Component}from 'react';
import { Container, Header,  Body, Title, Content, Item, Input, Icon } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import {styles} from './styles';
import Login from './components/Login';
import TopBar from "./components/TopBar"

export default class App extends Component {
  render(){
      return (
          <View style = {styles.main}>
              <TopBar/>
              <Content>
                <Login/>
              </Content>
          </View>
      );
  }
}

