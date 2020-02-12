import React, {Component} from 'react';
import {Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, Item, Input, Card, CardItem, Thumbnail} from "native-base"
import {ScrollView, Image, AsyncStorage, FlatList} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";
import {API_URL, TOKEN_KEY} from "../constant";
import beef from '../assets/beef.jpg';
import spinach from '../assets/spinach.jpeg';
import AddIngredientModal from "./AddIngredientModal";
import {Provider} from "@ant-design/react-native";
import IngredientDetailModal from "./IngredientDetailModal";

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state={
            search : "",
            userId: 241,
            Items: []
        }
        this.onPressAdd = this.onPressAdd.bind(this);
        this.onPressImage = this.onPressImage.bind(this);

    }

    onPressAdd(){
        //alert("A new item added");
        this.refs.AddIngredientModal.showAddIngredientModal(this.props.data);
    }

    onPressImage(item){
        //alert("A new item added");
        this.refs.IngredientDetailModal.showIngredientDetailModal(this.props.data);
    }

    scanInventory(){
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    console.log(accessToken);
                    //let newItem = [];
                    fetch(`${API_URL}/inventory/userId/${this.props.data}`, {
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
                            let name = responseData[i].ingredientIdJoin.ingredientName;
                            let id = responseData[i].inventoryId;
                            let image = responseData[i].ingredientIdJoin.imageUrl;
                            let amount = responseData[i].inventoryVolume;
                            let unit = responseData[i].unitsOfMeasureListEntry.entry;
                            const item = {
                                id: id,
                                name: name,
                                image: image,
                                amount: amount,
                                unit: unit
                            };
                            const list = this.state.Items.concat(item);
                            this.setState({Items: list});
                        }
                        console.log(this.state.Items);
                    }).done();

                }
            })
            .catch((error)=>{
                console.log(`Error in fetching inventory list --> ${error}`);
            })

    }

    componentDidMount() {
        this.scanInventory();
    }

    render() {
        return (
            <Provider>
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                        <Title style={{alignSelf:'center',
                            justifyContent:'center',}}>My Inventory</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress = {() => this.onPressAdd()}>
                            <Icon name='add-circle' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Item rounded style={{margin: 10, width: 380, height:50, alignSelf: "center", marginLeft: 10}}>
                        <Icon name="ios-search"/>
                        <Input
                            placeholder = "Find Ingredient"
                            onChangeText = {(data)=>{this.setState({search: data})}}
                            value = {this.state.search}
                        />
                        <Right>
                            <Button transparent onPress={
                                ()=>{
                                    if(this.state.search!=""){
                                        this.setState({search:""});
                                    }
                                }
                            }>
                                <Icon type="MaterialIcons" name="clear"></Icon>
                            </Button>
                        </Right>
                    </Item>
                    <FlatList
                        data ={this.state.Items}
                        renderItem={({item})=>(
                            <Card style={{margin: 15, paddingTop: 10, width: 130, height: 140}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:10}} onPress = {() => this.onPressImage(item)}>
                                        <Thumbnail source={{uri: item.image}} style ={{marginTop: 30, height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem footer>
                                    <Text style = {{fontWeight:"bold", fontSize:13}}>{`${item.name} ${item.amount}${item.unit}`}</Text>
                                </CardItem>
                            </Card>
                        )}
                        numColumns = {3}
                        keyExtractor = {item=>item.id}
                    />
                    {/*<Grid>*/}
                    {/*    <Col>*/}
                    {/*        {this.state.Items.map((info)=>{*/}
                    {/*            return <Card style={{padding: 20}} key = {info.id}>*/}
                    {/*                <CardItem cardBody>*/}
                    {/*                    <Button transparent style={{margin:10}} onPress = {() => this.onPressImage(info)}>*/}
                    {/*                        <Thumbnail source={{uri: info.image}} style ={{height: 100, width: 100}}/>*/}
                    {/*                    </Button>*/}
                    {/*                </CardItem>*/}
                    {/*                <CardItem footer>*/}
                    {/*                    <Text style = {{fontWeight:"bold", fontSize:13}}>{`${info.name} ${info.amount}${info.unit}`}</Text>*/}
                    {/*                </CardItem>*/}
                    {/*            </Card>*/}
                    {/*        })}*/}
                    {/*        /!*<Card style={{padding: 20}}>*!/*/}
                    {/*        /!*    <CardItem cardBody>*!/*/}
                    {/*        /!*        <Button transparent style={{margin:10}} onPress = {() => this.onPressImage()}>*!/*/}
                    {/*        /!*            <Thumbnail source={beef} style ={{height: 100, width: 100}}/>*!/*/}
                    {/*        /!*        </Button>*!/*/}
                    {/*        /!*    </CardItem>*!/*/}
                    {/*        /!*    <CardItem footer>*!/*/}
                    {/*        /!*        <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>*!/*/}
                    {/*        /!*    </CardItem>*!/*/}
                    {/*        /!*</Card>*!/*/}
                    {/*        /!*<Card style={{padding: 20}}>*!/*/}
                    {/*        /!*    <CardItem cardBody>*!/*/}
                    {/*        /!*        <Button transparent style={{margin:10}} onPress = {() => this.onPressImage()}>*!/*/}
                    {/*        /!*            <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>*!/*/}
                    {/*        /!*        </Button>*!/*/}
                    {/*        /!*    </CardItem>*!/*/}
                    {/*        /!*    <CardItem>*!/*/}
                    {/*        /!*        <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>*!/*/}
                    {/*        /!*    </CardItem>*!/*/}
                    {/*        /!*</Card>*!/*/}
                    {/*    </Col>*/}
                    {/*    <Col>*/}
                    {/*        <Card style={{padding: 20}}>*/}
                    {/*            <CardItem cardBody>*/}
                    {/*                <Button transparent style={{margin:10}}>*/}
                    {/*                    <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>*/}
                    {/*                </Button>*/}
                    {/*            </CardItem>*/}
                    {/*            <CardItem>*/}
                    {/*                <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>*/}
                    {/*            </CardItem>*/}
                    {/*        </Card>*/}
                    {/*        <Card style={{padding: 20}}>*/}
                    {/*            <CardItem cardBody>*/}
                    {/*                <Button transparent style={{margin:10}}>*/}
                    {/*                    <Thumbnail source={beef} style ={{height: 100, width: 100}}/>*/}
                    {/*                </Button>*/}
                    {/*            </CardItem>*/}
                    {/*            <CardItem footer>*/}
                    {/*                <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>*/}
                    {/*            </CardItem>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*    <Col>*/}
                    {/*        <Card style={{padding: 20}}>*/}
                    {/*            <CardItem cardBody>*/}
                    {/*                <Button transparent style={{margin:10}}>*/}
                    {/*                    <Thumbnail source={beef} style ={{height: 100, width: 100}}/>*/}
                    {/*                </Button>*/}
                    {/*            </CardItem>*/}
                    {/*            <CardItem footer>*/}
                    {/*                <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>*/}
                    {/*            </CardItem>*/}
                    {/*        </Card>*/}
                    {/*        <Card style={{padding: 20}}>*/}
                    {/*            <CardItem cardBody>*/}
                    {/*                <Button transparent style={{margin:10}}>*/}
                    {/*                    <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>*/}
                    {/*                </Button>*/}
                    {/*            </CardItem>*/}
                    {/*            <CardItem>*/}
                    {/*                <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>*/}
                    {/*            </CardItem>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*</Grid>*/}

                    {/*Modal*/}
                    <AddIngredientModal ref={'AddIngredientModal'} data={this.props.data}/>
                    <IngredientDetailModal ref={'IngredientDetailModal'} />
                </Content>
            </Container>
            </Provider>
        );
    }
}

export default Inventory;

