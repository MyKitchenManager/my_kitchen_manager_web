import React, {Component} from 'react';
import {Container, Content, Text} from "native-base"

class Inventory extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text style = {{padding:30}}>This is Inventory</Text>
                </Content>
            </Container>
        );
    }
}

export default Inventory;