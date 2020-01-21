import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {styles} from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boldText}>
          Hello, world!
        </Text>
      </View>
      <View style = {styles.body}>
        <Text style={styles.boldText}>Hello World 2</Text>
      </View>
    </View>
  );
}

