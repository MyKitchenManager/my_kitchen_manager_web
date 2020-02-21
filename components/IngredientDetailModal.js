import React, {Component} from 'react';
import {
    Button,
    Text,
    View,
    Input,
    Item,
    Form,
    Picker,
    Icon,
    Grid,
    Col,
    Right,
    CardItem,
    Thumbnail,
    Card,
    Row,
    Container
} from "native-base";
import {Modal, List, WhiteSpace, InputItem} from "@ant-design/react-native";
import {Alert, TextInput, KeyboardAvoidingView, AsyncStorage} from 'react-native';

import beef from "../assets/beef.jpg";
import {API_URL, TOKEN_KEY} from "../constant";




class IngredientDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selected2: undefined,
            Item: this.props.item,
            ItemName: '',
            ItemVolume: '',
            ItemUnit: '',
            ItemImage: '',
            ItemId: '',
            ItemCategory: "Meat",
            ItemDate: ""
        }
    }

    showIngredientDetailModal = (item) => {
        console.log("IngredientDetailItem:" + item);
        this.setState({
            showModal: true,
            Item: item,
            ItemName: item.name,
            ItemVolume: item.amount,
            ItemUnit: item.unit,  // 为什么这个unit是白色的？？名字没错啊！！
            ItemImage: item.image,
            ItemId: item.id,
            ItemCategory: item.category,
            ItemDate: item.purchaseDate
        })

    }

    onPressYes() {
        // close modal
        this.setState({showModal: false});

        //delete item on parent page (inventory)
        console.log(this.state.Item);
        this.props.handleDeleteItem(this.state.Item);
    }

    onPressUpdate(ItemId) {
        console.log('ItemId:' + ItemId);
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                        console.log(accessToken);
                        fetch(`${API_URL}/inventory/inventoryId/${ItemId}`, {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization':  accessToken
                            },
                            body: JSON.stringify({
                                ingredientId : ItemId,
                                inventoryVolume: this.state.ItemVolume,
                                unitsOfMeasure: 13,
                                userId: 241,
                                purchaseDate:"2020-02-04T12:00:00.000+0000",
                                expirationDate:"2020-02-19T12:00:00.000+0000"
                            })
                        }).then((response)=>{
                            if(response.status == "200"){
                                alert("Item successfully updated");
                                console.log('Item successfully updated');
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


            <Modal
                style={{width: 320, height: 540}}
                ref={"IngredientDetailModal"}
                title="Title"
                transparent
                onClose={()=>{
                    this.setState({showModal:false});
                }}
                maskClosable
                animationType = 'slide-up'
                visible={this.state.showModal}
                title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Ingredient Details</Text>}
                closable
            >
                <View style={{ paddingVertical: 20 }}>
                    <Card style={{padding: 20, height: 250, width: 280}}>
                        <CardItem cardBody style={{alignSelf: 'center'}}>
                            <Thumbnail source={{uri: this.state.ItemImage}} style ={{height: 200, width: 200}}/>
                        </CardItem>
                    </Card>
                    <View>
                        <Text style={{fontSize: 30, fontWeight: '4', alignSelf: 'center'}}>{this.state.ItemName}</Text>
                    </View>

                    <WhiteSpace />

                    <List style={{width: 280}}>
                        <Item data-seed="logId" style={{height: 30}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Amount</Text>
                            <Right >
                                <Row >
                                    <TextInput
                                        style={{alignSelf: 'center',fontSize: 16, height: 20, borderColor: 'transparent', borderWidth: 1, color: '#00BBF2', fontWeight: 'bold'}}
                                        onChangeText={text => {
                                            this.setState({
                                                ItemVolume: text
                                            })
                                        }}
                                    >
                                        {`${this.state.ItemVolume}`}
                                    </TextInput>
                                    <Text style={{alignSelf: 'center', fontSize: 16}}>
                                        {`${this.state.ItemUnit}`}
                                    </Text>
                                </Row>
                                {/*<Text>{`${this.state.ItemVolume} ${this.state.ItemUnit}`}</Text>*/}
                            </Right>
                        </Item>

                        <Item data-seed="logId" style={{height: 30}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Category</Text>
                            <Right>
                                <Text style={{fontSize: 16}}>{this.state.ItemCategory}</Text>
                            </Right>
                        </Item>

                        <Item data-seed="logId" style={{height: 30}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Purchased Date</Text>
                            <Right>
                                <Text style={{fontSize: 16}}>{this.state.ItemDate}</Text>
                            </Right>
                        </Item>
                    </List>
                </View>

                <Grid>
                    <Col style={{marginRight: 10}}>
                        <Button style = {{margin: 10,
                            padding: 15,
                            alignSelf:'center',
                            justifyContent:'center',
                            backgroundColor:"deepskyblue",
                            width:150}} onPress={()=>{
                            this.setState({showModal: false})
                            this.onPressUpdate(this.state.ItemId);
                        }}>
                            <Text >Update</Text>
                        </Button>
                    </Col>
                    <Col style={{marginLeft: 10}}>
                        <Button
                            style = {{margin: 10,
                                padding: 15,
                                alignSelf:'center',
                                justifyContent:'center',
                                backgroundColor:"deepskyblue",
                                width:150}}
                            onPress={()=>{

                                //this.setState({showModal: false})
                                Alert.alert(
                                    'Pay Attention',
                                    'Do you really want to delete this item?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        {text: 'Yes', onPress: () => {this.onPressYes()}},
                                    ],
                                    {cancelable: false},
                                );

                            }
                        }>
                            <Text>Delete</Text>
                        </Button>
                    </Col>
                </Grid>
            </Modal>


        );
    }
}

export default IngredientDetailModal;

