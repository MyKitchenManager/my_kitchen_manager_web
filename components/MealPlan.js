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
    Thumbnail,
    Content,
    Grid,
    Col,
    List,
    ListItem, Row
} from "native-base"
import {TouchableOpacity, StyleSheet, Image, FlatList, AsyncStorage, Alert} from "react-native";
import {Provider, Modal} from "@ant-design/react-native"
import {Agenda} from "react-native-calendars";
import meal from "../assets/meal.jpeg";
import {API_URL, TOKEN_KEY} from "../constant";
import ShoppingListModal from "./ShoppingListModal";
import CookModal from "./CookModal";
import {Actions} from "react-native-router-flux";



class MealPlan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            allItems: {},
            loading: true,
            showModal: false,
        };
        this.onPressShoppingButton = this.onPressShoppingButton.bind(this);
        this.onPressCookButton = this.onPressCookButton.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };

    componentDidMount() {
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
                            let recipeDetails = responseData[i].recipeIdJoin.recipeDetails;
                            let instructions = responseData[i].recipeIdJoin.instructions;

                            if (!this.state.allItems[date]) {
                                this.state.allItems[date] = [];
                            }
                            this.state.allItems[date].push({
                                id: id,
                                name: name,
                                image: image,
                                status: status,
                                recipeDetails: recipeDetails,
                                instructions: instructions
                            })
                        }
                    }).then(()=>{
                        console.log(this.state.allItems);
                    })
                }
            })
            .catch((error)=>{
                console.log(`Error in fetching inventory list --> ${error}`);
            })
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.allItems[strTime]) {
                    this.state.items[strTime] = [];
                }else{
                    this.state.items[strTime] = this.state.allItems[strTime];
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

    onPressAddButton(day) {
        //alert('fail');
        console.log('add to which day:' + day);
        Actions.recipe();
    }

    renderDay(day) {
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
                            <Button transparent onPress={() => this.onPressAddButton(day)}>
                                <Icon name='add-circle' style={{fontSize: 34, color: '#00BBF2'}}/>
                            </Button>
                        </View>
                        :
                        <View style={{marginLeft: 60}}></View>
                }

            </View>
        )
    }

    //How to rerender???
    onPressYes(item) {
        console.log('An item is deleted');
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    console.log(accessToken);
                    fetch(`${API_URL}/mealplan/${item.id}`, {
                        method: "DELETE",
                        headers: {
                            'Authorization':  accessToken
                        }
                    }).then((response)=>{
                        if(response.status == "200"){
                            alert("Item successfully deleted");
                        }else{
                            console.log(response.status);
                        }
                    })
                        .then(() => {
                            this.forceUpdateHandler();
                        })
                        .catch((error)=>{
                            console.log(`Error in adding item in inventory --> ${error}`);
                        })
                }
            })

    }

    onPressDeleteButton(item) {
        Alert.alert(
            'Pay Attention',
            'Do you really want to delete this item?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => {this.onPressYes(item)}},
            ],
            {cancelable: false},
        )
    }

    onPressCookButton(item) {
        console.log('Originitem:' + item);
        const recipe ={
            name: item.name,
            image: item.image,
            detail: item.recipeDetails,
            method: item.instructions,
            id: item.id,
            status: item.status
        }
        console.log('recipe:' + recipe);
        console.log(item.status);
        this.refs.CookModal.showCookModal(recipe);
    }

    renderItem(item) {
        return (

            <View>
                {
                    item.status !== 'inactive' ?
                        <TouchableOpacity
                            style={[styles.listItem, ]}
                        >
                            <List style={{width: 320}}>
                                <ListItem thumbnail>
                                    <Left style={{}}>
                                        <Thumbnail square source={{uri: item.image}} style={{height: 80, width: 80, borderRadius: 10}} />
                                    </Left>
                                    <Body style={{paddingTop: 8, paddingBottom: 5 }}>
                                        <Text style={{fontSize: 16}}>{item.name}</Text>
                                        <Row style={{paddingLeft: 0, marginTop: 10, marginBottom: 2}}>
                                            <Button transparent onPress={()=>{this.onPressCookButton(item)}}>
                                                <Icon active name="ios-bonfire" style={{fontSize: 18, marginLeft: 0, color: '#00BBF2'}}/>
                                                <Text style={{fontSize: 12, paddingLeft: 5, color: '#00BBF2'}}>Cook</Text>
                                            </Button>

                                            <Button transparent onPress={()=>{this.onPressDeleteButton(item)}}>
                                                <Icon active name="ios-trash" style={{fontSize: 18, color: '#00BBF2'}}/>
                                                <Text style={{fontSize: 12, paddingLeft: 5, color: '#00BBF2'}}>Delete</Text>
                                            </Button>
                                        </Row>
                                    </Body>
                                </ListItem>
                            </List>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={[styles.listItem, {backgroundColor: '#f5f5f5'} ]}
                        >
                            <List style={{width: 320}}>
                                <ListItem thumbnail>
                                    <Left style={{}}>
                                        <Thumbnail square source={{uri: item.image}} style={{height: 80, width: 80, borderRadius: 10, opacity: '.6'}} />
                                    </Left>
                                    <Body style={{paddingTop: 8, paddingBottom: 5 }}>
                                        <Text style={{fontSize: 16, color: '#696969'}}>{item.name}</Text>
                                        <Row style={{paddingLeft: 0, marginTop: 10, marginBottom: 2}}>
                                            <Button transparent onPress={()=>{this.onPressCookButton(item)}}>
                                                <Icon active name="ios-bonfire" style={{fontSize: 18, marginLeft: 0, color: '#696969'}}/>
                                                <Text style={{fontSize: 12, paddingLeft: 5, color: '#696969'}}>Cook</Text>
                                            </Button>

                                            <Button transparent onPress={()=>{this.onPressDeleteButton(item)}}>
                                                <Icon active name="ios-trash" style={{fontSize: 18, color: '#696969'}}/>
                                                <Text style={{fontSize: 12, paddingLeft: 5, color: '#696969'}}>Delete</Text>
                                            </Button>
                                        </Row>
                                    </Body>
                                </ListItem>
                            </List>
                        </TouchableOpacity>
                }
            </View>
        );
    }

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

    onPressShoppingButton() {
        this.refs.ShoppingListModal.showShoppingListModal();
    }

    onPressFinishCook(id) {
        console.log('finished meal id:' + id);
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    console.log(accessToken);
                    fetch(`${API_URL}/mealplan/finishCook/mealPlanId/${id}`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Authorization':  accessToken
                        }
                    }).then((response)=>{
                        if(response.status == "200"){
                            alert('Enjoy meal');
                            console.log('finish cooking');
                        }else{
                            console.log(response.status);
                        }
                    }).catch((error)=>{
                        console.log(`Error in adding item in inventory --> ${error}`);
                    })
                }
            })
    }

    render() {
        return (
            <Provider>
                <Container>
                    <Header>
                        <Left>
                        </Left>
                        <Body>
                            <Title>My Meal Plan</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.onPressShoppingButton()}>
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
                    />

                    <ShoppingListModal ref={'ShoppingListModal'}/>
                    <CookModal ref={'CookModal'} data={this.onPressFinishCook.bind(this)}/>
                </Container>
            </Provider>
        );
    }

}

const styles = StyleSheet.create({
    cardItem: {
        backgroundColor: 'white',
        //flex: 1,
        borderRadius: 10,
        padding: 5,
        marginRight: 10,
        marginTop: 17,
        width: 170
    },
    listItem: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 10,
        marginRight: 5,
        marginTop: 17,
        width: 340,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
})

export default MealPlan;

/*Items example*/
// items: {
//     '2020-02-15' : [
//         {name: 'Chicken Parmesan', image: 'https://img.sndimg.com/food/image/upload/w_621,h_349,c_fill,fl_progressive,q_80/v1/img/recipes/19/13/5/AKvKcJgQWqe5WpAZ4bTu_chicken-parmesan-5.jpg'},
//         {name: 'Zuppa Toscana', image: 'https://img.sndimg.com/food/image/upload/fl_progressive,c_fill,q_80,h_349,w_621/v1/img/recipes/38/29/8/Z8MMxtVfQfCLy4zZJtZU_0S9A7184.jpg'}],
//     '2020-02-16' : [
//         {name: 'Chicken Parmesan', image: 'https://img.sndimg.com/food/image/upload/w_621,h_349,c_fill,fl_progressive,q_80/v1/img/recipes/19/13/5/AKvKcJgQWqe5WpAZ4bTu_chicken-parmesan-5.jpg'},
//         {name: 'Zuppa Toscana', image: 'https://img.sndimg.com/food/image/upload/fl_progressive,c_fill,q_80,h_349,w_621/v1/img/recipes/38/29/8/Z8MMxtVfQfCLy4zZJtZU_0S9A7184.jpg'}],
// },

/* render card view */
// renderItem(item) {
//     return (
//         <View style={{}}>
//             <TouchableOpacity
//                 style={[styles.cardItem]}
//                 onPress={() => alert("Show Recipe Details")}
//             >
//                 <Card>
//                     <CardItem style={{selfAlign: 'center'}}>
//                         <Left>
//                             <Body>
//                                 <Text style={{fontSize: 15, fontWeight: '8'}}>{item.name}</Text>
//                             </Body>
//                         </Left>
//                     </CardItem>
//                     <CardItem cardBody>
//                         <Image source={{uri: item.image}} style={{height: 100, flex: 1,}}/>
//                     </CardItem>
//                     <CardItem style={{height: 30, paddingLeft: 15, paddingRight: 8}}>
//                         <Left>
//                             <Button transparent>
//                                 <Icon active name="ios-bonfire"/>
//                                 <Text style={{fontSize: 12, paddingLeft: 5}}>Cook</Text>
//                             </Button>
//                         </Left>
//                         <Right>
//                             <Button transparent>
//                                 <Icon active name="ios-trash"/>
//                                 <Text style={{fontSize: 12, paddingLeft: 5}}>Delete</Text>
//                             </Button>
//                         </Right>
//                     </CardItem>
//                 </Card>
//             </TouchableOpacity>
//         </View>
//     );
// }

/* load items example */
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
