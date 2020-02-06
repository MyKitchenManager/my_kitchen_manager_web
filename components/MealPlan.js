import React, {Component} from 'react';
import {Text, View, Container, Header, Left, Body, Right, Button, Icon, Title} from "native-base"
import {TouchableOpacity, StyleSheet} from "react-native";
import {Provider, Modal} from "@ant-design/react-native"
import RecipeCard from "./RecipeCard";
import {Agenda} from "react-native-calendars";

class MealPlan extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: {},
            showModal: false
        };
    }

    openModal(){
        this.setState({showModal:true});
    }

    render() {
        return (
            <Provider>
            <Container>
                <Modal
                    title="Title"
                    transparent
                    onClose={()=>{
                        this.setState({showModal:false});
                    }}
                    maskClosable
                    animationType = 'slide'
                    visible={this.state.showModal}
                    title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Details</Text>}
                    closable
                >
                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{ textAlign: 'center', padding: 10 }}>Content...</Text>
                        <Text style={{ textAlign: 'center' , padding: 10}}>Content...</Text>
                    </View>
                    <Button style = {{margin: 10,
                        padding: 15,
                        alignSelf:'center',
                        justifyContent:'center',
                        backgroundColor:"deepskyblue",
                        width:200}} onPress={()=>{
                        this.setState({showModal: false})
                    }}>
                        <Text >Finish Cook</Text>
                    </Button>
                </Modal>

                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>My Meal Plan</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='ios-cart' />
                        </Button>
                    </Right>
                </Header>

                {/*Calender View*/}
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={'2020-02-01'}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    // markingType={'period'}
                    // markedDates={{
                    //    '2017-05-08': {textColor: '#43515c'},
                    //    '2017-05-09': {textColor: '#43515c'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                    // hideExtraDays={false}
                />

            </Container>
            </Provider>
        );
    }


    loadItems(day) {
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                                name: 'Item for ' + strTime + ' #' + j,
                                height: Math.max(50, Math.floor(Math.random() * 150))
                            }
                        );
                    }
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                style={styles.item}
                //onPress={() => Alert.alert("Show Recipe Details")}
            >
                <RecipeCard data={this.openModal.bind(this)}/>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>There is no recipes today!</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        height: 355
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});

export default MealPlan;

