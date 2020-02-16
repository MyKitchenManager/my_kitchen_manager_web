import React, {Component} from 'react';
import {
    Text,
    View,
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    CardItem,
    Card,
    Thumbnail, Content, Grid, Col
} from "native-base"
import {TouchableOpacity, StyleSheet, Image, FlatList, AsyncStorage} from "react-native";
import {Provider, Modal} from "@ant-design/react-native"
import RecipeCard from "./RecipeCard";
import {Agenda} from "react-native-calendars";
import meal from "../assets/meal.jpeg";
import {API_URL, TOKEN_KEY} from "../constant";

class MealPlan extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // items: {
            //     '2020-02-15' : [
            //         {name: 'Chicken Parmesan', image: 'https://img.sndimg.com/food/image/upload/w_621,h_349,c_fill,fl_progressive,q_80/v1/img/recipes/19/13/5/AKvKcJgQWqe5WpAZ4bTu_chicken-parmesan-5.jpg'},
            //         {name: 'Zuppa Toscana', image: 'https://img.sndimg.com/food/image/upload/fl_progressive,c_fill,q_80,h_349,w_621/v1/img/recipes/38/29/8/Z8MMxtVfQfCLy4zZJtZU_0S9A7184.jpg'}],
            //     '2020-02-16' : [
            //         {name: 'Chicken Parmesan', image: 'https://img.sndimg.com/food/image/upload/w_621,h_349,c_fill,fl_progressive,q_80/v1/img/recipes/19/13/5/AKvKcJgQWqe5WpAZ4bTu_chicken-parmesan-5.jpg'},
            //         {name: 'Zuppa Toscana', image: 'https://img.sndimg.com/food/image/upload/fl_progressive,c_fill,q_80,h_349,w_621/v1/img/recipes/38/29/8/Z8MMxtVfQfCLy4zZJtZU_0S9A7184.jpg'}],
            // },
            // items : [
            //     {date: '2020-02-15', name: 'Chicken Parmesan', image: 'https://img.sndimg.com/food/image/upload/w_621,h_349,c_fill,fl_progressive,q_80/v1/img/recipes/19/13/5/AKvKcJgQWqe5WpAZ4bTu_chicken-parmesan-5.jpg' },
            //     {date: '2020-02-15', name: 'Chicken Parmesan', image: 'https://img.sndimg.com/food/image/upload/w_621,h_349,c_fill,fl_progressive,q_80/v1/img/recipes/19/13/5/AKvKcJgQWqe5WpAZ4bTu_chicken-parmesan-5.jpg' },
            //     {date: '2020-02-16', name: 'Zuppa Toscana', image: 'https://img.sndimg.com/food/image/upload/fl_progressive,c_fill,q_80,h_349,w_621/v1/img/recipes/38/29/8/Z8MMxtVfQfCLy4zZJtZU_0S9A7184.jpg'},
            //     ],
            //items: [],
            items: {},
            loading: true,
            showModal: false,

        };
    }


    openModal() {
        this.setState({showModal: true});
    }



    //load 所有item
    loadItems(day) {
        this.setState({items: [], loading: true})
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    //let newItem = [];
                    fetch(`${API_URL}/mealplan/users`, {
                        method:"GET",
                        headers:{
                            "Authorization" : accessToken
                        }
                    })
                        .then((response)=>{
                            if(response.status=="200"){
                                return response.json();
                            }else{
                                console.log(response.status);
                            }

                        }).then((responseData)=>{
                        for(let i = 0; i< responseData.length; i++) {
                            console.log(responseData[i]);
                            let id = responseData[i].mealPlanId;
                            let name = responseData[i].recipeIdJoin.recipeName;
                            let date = responseData[i].mealDate;
                            let image = responseData[i].recipeIdJoin.recipeImageUrl;
                            let status = responseData[i].status;

                            if (!this.state.items[date]) {
                                this.state.items[date] = [];
                            }
                            this.state.items[date].push({
                                id: id,
                                name: name,
                                image: image,
                                status: status
                            })
                        }
                        const newItems = {};
                        Object.keys(this.state.items).forEach(key => {
                            newItems[key] = this.state.items[key];
                        });
                        this.setState({
                            items: newItems,
                            loading: false
                        });
                        //save items to state successfully
                        console.log(this.state.items);
                    })
                }
            })
            .catch((error)=>{
                console.log(`Error in fetching inventory list --> ${error}`);
            })

        // setTimeout(() => {
        //     for (let i = 0; i < 10; i++) {
        //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        //         const strTime = this.timeToString(time);
        //         if (!this.state.items[strTime]) {
        //             this.state.items[strTime] = [];
        //             const numItems = Math.floor(Math.random() * 5);
        //             for (let j = 0; j < numItems; j++) {
        //                 this.state.items[strTime].push({
        //                         name: 'Item for ' + strTime + ' #' + j,
        //                         height: Math.max(50, Math.floor(Math.random() * 150))
        //                     }
        //                 );
        //             }
        //         }
        //     }
        //     const newItems = {};
        //     Object.keys(this.state.items).forEach(key => {
        //         newItems[key] = this.state.items[key];
        //     });
        //     this.setState({
        //         items: newItems
        //     });
        // }, 1000);




    }


    //日期和加号
    renderDay(day, items) {
        return (
            <View>
                {
                    day ?
                        <View>
                            <Text style={{
                                color: '#43515c',
                                fontSize: 28,
                                alignSelf: 'center',
                                marginTop: 20
                            }}>{day.day}</Text>
                            {/*how to get weekday*/}
                            {/*<Text style={{*/}
                            {/*    color: '#43515c',*/}
                            {/*    fontSize: 28,*/}
                            {/*    alignSelf: 'center',*/}
                            {/*    marginTop: 20*/}
                            {/*}}>{day.weekNumbers}</Text>*/}
                            <Button transparent>
                                <Icon name='add-circle' style={{fontSize: 34, color: '#00BBF2'}}/>
                            </Button>
                        </View>
                        :
                        <View style={{marginLeft: 60}}></View>
                }

            </View>
        )
    }

    //日期右侧
    renderItem(item) {
        return (
            <View style={{}}>
                <TouchableOpacity
                    style={[styles.item]}
                    onPress={() => alert("Show Recipe Details")}
                >
                    <Card>
                        <CardItem style={{selfAlign: 'center'}}>
                            <Left>
                                <Body>
                                    <Text style={{fontSize: 15, fontWeight: '8'}}>{item.name}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: item.image}} style={{height: 100, flex: 1,}}/>
                        </CardItem>
                        <CardItem style={{height: 30, paddingLeft: 15, paddingRight: 8}}>
                            <Left>
                                <Button transparent>
                                    <Icon active name="ios-bonfire"/>
                                    <Text style={{fontSize: 12, paddingLeft: 5}}>Cook</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent>
                                    <Icon active name="ios-trash"/>
                                    <Text style={{fontSize: 12, paddingLeft: 5}}>Delete</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }

    //没有item的日子，如何render
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text style={{color: '#43515c'}}>There is no recipes today!</Text>
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


    render() {
        return (

            <Provider>
                <Container>
                    <Modal
                        title="Title"
                        transparent
                        onClose={() => {
                            this.setState({showModal: false});
                        }}
                        maskClosable
                        animationType='slide'
                        visible={this.state.showModal}
                        title={<Text style={{fontWeight: "bold", fontSize: 18, textAlign: "center"}}>Details</Text>}
                        closable
                    >
                        <View style={{paddingVertical: 20}}>
                            <Text style={{textAlign: 'center', padding: 10}}>Content...</Text>
                            <Text style={{textAlign: 'center', padding: 10}}>Content...</Text>
                        </View>
                        <Button style={{
                            margin: 10,
                            padding: 15,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: "deepskyblue",
                            width: 200
                        }} onPress={() => {
                            this.setState({showModal: false})
                        }}>
                            <Text>Finish Cook</Text>
                        </Button>
                    </Modal>

                    <Header>
                        <Left>
                        </Left>
                        <Body>
                            <Title>My Meal Plan</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                {/*<Icon name='ios-cart' />*/}
                                <Text style={{color: '#00BBF2'}}>Shopping</Text>
                            </Button>
                        </Right>
                    </Header>

                    {/*Calender View*/}
                    <Agenda
                        items={this.state.items}
                        loadItemsForMonth={this.loadItems.bind(this)}
                        selected={Date.UTC()}
                        renderDay={this.renderDay.bind(this)}
                        renderItem={this.renderItem.bind(this)}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                        rowHasChanged={this.rowHasChanged.bind(this)}
                        style={{numberColumns: 2}}
                        // markingType={'period'}
                        // markedDates={{
                        //    '2017-05-08': {textColor: '#43515c'},
                        //    '2017-05-09': {textColor: '#43515c'},
                        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                        //    '2017-05-21': {startingDay: true, color: 'blue'},
                        //    '2017-05-22': {endingDay: true, color: 'gray'},
                        //    '2017-05-24': {startingDay: true, color: 'gray'},
                        //    '2017-05-25': {color: 'gray'},
                        //    '2020-02-15': {endingDay: true, color: 'gray'}}}
                        // monthFormat={'yyyy'}
                        //theme={{calendarBackground: 'gray', agendaKnobColor: 'red'}}
                        // hideExtraDays={false}
                    />

                </Container>
            </Provider>
        );
    }

}
    const styles = StyleSheet.create({
        item: {
            backgroundColor: 'white',
            //flex: 1,
            borderRadius: 10,
            padding: 5,
            marginRight: 10,
            marginTop: 17,
            width: 170
        },
        emptyDate: {
            height: 15,
            flex: 1,
            paddingTop: 30
        },

    })


export default MealPlan;

{/*<RecipeCard data={this.openModal.bind(this)}/>*/}

// loadItems(day) {
//     setTimeout(() => {
//         for (let i = 0; i < 10; i++) {
//             const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//             const strTime = this.timeToString(time);
//             if (!this.state.items[strTime]) {
//                 this.state.items[strTime] = [];
//                 const numItems = Math.floor(Math.random() * 5);
//                 for (let j = 0; j < numItems; j++) {
//                     this.state.items[strTime].push({
//                             name: 'Item for ' + strTime + ' #' + j,
//                             height: Math.max(50, Math.floor(Math.random() * 150))
//                         }
//                     );
//                 }
//             }
//         }
//         const newItems = {};
//         Object.keys(this.state.items).forEach(key => {
//             newItems[key] = this.state.items[key];
//         });
//         this.setState({
//             items: newItems
//         });
//     }, 1000);
// }


//render items fake data
{/*<TouchableOpacity*/}
{/*    style={styles.item}*/}
{/*    //onPress={() => Alert.alert("Show Recipe Details")}*/}
{/*>*/}
{/*    <Card>*/}
{/*        <CardItem style={{selfAlign: 'center'}}>*/}
{/*            <Left>*/}
{/*                <Body>*/}
{/*                    <Text style={{fontSize: 15, fontWeight: '8'}}>Orange Chicken</Text>*/}
{/*                </Body>*/}
{/*            </Left>*/}
{/*        </CardItem>*/}
{/*        <CardItem cardBody>*/}
{/*            <Image source={meal} style={{height: 100, flex: 1,}}/>*/}
{/*        </CardItem>*/}
{/*        <CardItem style={{height: 30, paddingLeft: 15, paddingRight: 8}}>*/}
{/*            <Left>*/}
{/*                <Button transparent title="show modal" onPress={this.props.data}>*/}
{/*                    <Icon active name="ios-bonfire"/>*/}
{/*                    <Text style={{fontSize: 12, paddingLeft: 5}}>Cook</Text>*/}
{/*                </Button>*/}
{/*            </Left>*/}
{/*            <Right>*/}
{/*                <Button transparent>*/}
{/*                    <Icon active name="ios-trash"/>*/}
{/*                    <Text style={{fontSize: 12, paddingLeft: 5}}>Delete</Text>*/}
{/*                </Button>*/}
{/*            </Right>*/}
{/*        </CardItem>*/}
{/*    </Card>*/}
{/*</TouchableOpacity>*/}

{/*<Grid >*/}
{/*    <Col>*/}
{/*        <Card>*/}
{/*            <CardItem style={{selfAlign: 'center'}}>*/}
{/*                <Left>*/}
{/*                    <Body>*/}
{/*                        <Text style={{fontSize: 15, fontWeight: '8'}}>Orange Chicken</Text>*/}
{/*                    </Body>*/}
{/*                </Left>*/}
{/*            </CardItem>*/}
{/*            <CardItem cardBody>*/}
{/*                <Image source={meal} style={{height: 100, flex: 1,}}/>*/}
{/*            </CardItem>*/}
{/*            <CardItem style={{height: 30, paddingLeft: 15, paddingRight: 8}}>*/}
{/*                <Left>*/}
{/*                    <Button transparent title="show modal" onPress={this.props.data}>*/}
{/*                        <Icon active name="ios-bonfire"/>*/}
{/*                        <Text style={{fontSize: 12, paddingLeft: 5}}>Cook</Text>*/}
{/*                    </Button>*/}
{/*                </Left>*/}
{/*                <Right>*/}
{/*                    <Button transparent>*/}
{/*                        <Icon active name="ios-trash"/>*/}
{/*                        <Text style={{fontSize: 12, paddingLeft: 5}}>Delete</Text>*/}
{/*                    </Button>*/}
{/*                </Right>*/}
{/*            </CardItem>*/}
{/*        </Card>*/}
{/*        <Card>*/}
{/*            <CardItem style={{selfAlign: 'center'}}>*/}
{/*                <Left>*/}
{/*                    <Body>*/}
{/*                        <Text style={{fontSize: 15, fontWeight: '8'}}>Orange Chicken</Text>*/}
{/*                    </Body>*/}
{/*                </Left>*/}
{/*            </CardItem>*/}
{/*            <CardItem cardBody>*/}
{/*                <Image source={meal} style={{height: 100, flex: 1,}}/>*/}
{/*            </CardItem>*/}
{/*            <CardItem style={{height: 30, paddingLeft: 15, paddingRight: 8}}>*/}
{/*                <Left>*/}
{/*                    <Button transparent title="show modal" onPress={this.props.data}>*/}
{/*                        <Icon active name="ios-bonfire"/>*/}
{/*                        <Text style={{fontSize: 12, paddingLeft: 5}}>Cook</Text>*/}
{/*                    </Button>*/}
{/*                </Left>*/}
{/*                <Right>*/}
{/*                    <Button transparent>*/}
{/*                        <Icon active name="ios-trash"/>*/}
{/*                        <Text style={{fontSize: 12, paddingLeft: 5}}>Delete</Text>*/}
{/*                    </Button>*/}
{/*                </Right>*/}

{/*            </CardItem>*/}
{/*        </Card>*/}
{/*    </Col>*/}
{/*    <Col>*/}
{/*        <Card>*/}
{/*            <CardItem style={{selfAlign: 'center'}}>*/}
{/*                <Left>*/}
{/*                    <Body>*/}
{/*                        <Text style={{fontSize: 15, fontWeight: '8'}}>Orange Chicken</Text>*/}
{/*                    </Body>*/}
{/*                </Left>*/}
{/*            </CardItem>*/}
{/*            <CardItem cardBody>*/}
{/*                <Image source={meal} style={{height: 100, flex: 1,}}/>*/}
{/*            </CardItem>*/}
{/*            <CardItem style={{height: 30, paddingLeft: 15, paddingRight: 8}}>*/}
{/*                <Left>*/}
{/*                    <Button transparent title="show modal" onPress={this.props.data}>*/}
{/*                        <Icon active name="ios-bonfire"/>*/}
{/*                        <Text style={{fontSize: 12, paddingLeft: 5}}>Cook</Text>*/}
{/*                    </Button>*/}
{/*                </Left>*/}
{/*                <Right>*/}
{/*                    <Button transparent>*/}
{/*                        <Icon active name="ios-trash"/>*/}
{/*                        <Text style={{fontSize: 12, paddingLeft: 5}}>Delete</Text>*/}
{/*                    </Button>*/}
{/*                </Right>*/}
{/*            </CardItem>*/}
{/*        </Card>*/}
{/*        <Card>*/}
{/*            <CardItem style={{selfAlign: 'center'}}>*/}
{/*                <Left>*/}
{/*                    <Body>*/}
{/*                        <Text style={{fontSize: 15, fontWeight: '8'}}>Orange Chicken</Text>*/}
{/*                    </Body>*/}
{/*                </Left>*/}
{/*            </CardItem>*/}
{/*            <CardItem cardBody>*/}
{/*                <Image source={meal} style={{height: 100, flex: 1,}}/>*/}
{/*            </CardItem>*/}
{/*            <CardItem style={{height: 30, paddingLeft: 15, paddingRight: 8}}>*/}
{/*                <Left>*/}
{/*                    <Button transparent title="show modal" onPress={this.props.data}>*/}
{/*                        <Icon active name="ios-bonfire"/>*/}
{/*                        <Text style={{fontSize: 12, paddingLeft: 5}}>Cook</Text>*/}
{/*                    </Button>*/}
{/*                </Left>*/}
{/*                <Right>*/}
{/*                    <Button transparent>*/}
{/*                        <Icon active name="ios-trash"/>*/}
{/*                        <Text style={{fontSize: 12, paddingLeft: 5}}>Delete</Text>*/}
{/*                    </Button>*/}
{/*                </Right>*/}

{/*            </CardItem>*/}
{/*        </Card>*/}
{/*    </Col>*/}
{/*</Grid>*/}