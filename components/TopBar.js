import React, {Component} from 'react';
import {Container,Header, Icon, Left, Right} from "native-base";
import {Text} from "react-native";
import {styles} from "../styles";

class TopBar extends Component {
    render() {
        return (

                <Header>
                    <Left>
                        <Icon name='menu'/>
                    </Left>
                    <Text style={styles.boldText}>
                        My Kitchen Manager
                    </Text>
                    <Right>
                        <Icon name='person'/>
                    </Right>
                </Header>

        );
    }
}

export default TopBar;