import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title} from "native-base";
import {Actions} from "react-native-router-flux";
import {Provider} from "@ant-design/react-native";
class ShoppingListPage extends Component {
    render() {
        return (
            <Provider>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => {Actions.pop()}}>
                                <Icon name='arrow-back' style={{color: '#00BBF2', paddingLeft: 10}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Shopping List</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <ScrollView style={{height: 680}}>
                            <View>
                                <Text>this is shopping list page</Text>
                            </View>
                        </ScrollView>
                    </Content>
                </Container>
            </Provider>
        );
    }
}

export default ShoppingListPage;