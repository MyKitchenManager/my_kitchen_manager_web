import React, {Component} from 'react';
import {Container, Text, Content} from "native-base"

class MealPool extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text style = {{padding:30}}>This is Meal pool</Text>
                </Content>
            </Container>
        );
    }
}

export default MealPool;