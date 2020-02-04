import React, {Component} from 'react';
import {Content, Text, Container, Card, CardItem, View} from "native-base"
import {SafeAreaView, TouchableOpacity, ScrollView, Image} from "react-native";
//import meal from "../assets/meal.jpeg";
import CalendarView from "./CalendarView";
class MealPlan extends Component {
    render() {
        return (
            <SafeAreaView style={{padding: 3, flex: 1}}>
                <ScrollView style = {{padding: 30}}>
                    <CalendarView />
                </ScrollView>
             </SafeAreaView>

        );
    }
}

export default MealPlan;




{/*<Card>*/}
{/*    <CardItem header bordered>*/}
{/*        <Text> Monday </Text>*/}
{/*    </CardItem>*/}
{/*    <CardItem >*/}
{/*        <Image source={meal} style={{flex:1, height: 200, width:200}}/>*/}
{/*    </CardItem>*/}
{/*    <CardItem bordered>*/}
{/*        <Text>this is the meal</Text>*/}
{/*    </CardItem>*/}
{/*</Card>*/}
{/*<Card>*/}
{/*    <CardItem header bordered>*/}
{/*        <Text> Tuesday </Text>*/}
{/*    </CardItem>*/}
{/*    <CardItem >*/}
{/*        <Image source={meal} style={{flex:1, height: 200, width:200}}/>*/}
{/*    </CardItem>*/}
{/*    <CardItem bordered>*/}
{/*        <Text>this is the meal</Text>*/}
{/*    </CardItem>*/}
{/*</Card>*/}
{/*<Card>*/}
{/*    <CardItem header bordered>*/}
{/*        <Text> Wednesday </Text>*/}
{/*    </CardItem>*/}
{/*    <CardItem >*/}
{/*        <Image source={meal} style={{flex:1, height: 200, width:200}}/>*/}
{/*    </CardItem>*/}
{/*    <CardItem bordered>*/}
{/*        <Text>this is the meal</Text>*/}
{/*    </CardItem>*/}
{/*</Card>*/}
{/*<Text>This is meal plan</Text>*/}