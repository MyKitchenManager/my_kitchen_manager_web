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
    Card
} from "native-base";
import {Modal, List, WhiteSpace, InputItem} from "@ant-design/react-native";
import beef from "../assets/beef.jpg";




class IngredientDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selected2: undefined,
            newItemName: '',
            newItemVolume: '',
            newItemUnit: '',
        }
    }

    showIngredientDetailModal = () => {
        //this.refs.InventoryAddItemModal.open();
        this.setState({showModal: true})
    }

    render() {
        return (
            <Modal
                style={{width: 320, height: 530}}
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
                            <Thumbnail source={beef} style ={{height: 200, width: 200}}/>
                        </CardItem>
                    </Card>
                    <View>
                        <Text style={{fontSize: 30, fontWeight: '4', alignSelf: 'center'}}>Beef </Text>
                    </View>

                    <WhiteSpace />

                    <List style={{width: 280}}>
                        <Item data-seed="logId">
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Amount</Text>
                            <Right>
                                <Text>20LB</Text>
                            </Right>
                        </Item>

                        <Item data-seed="logId">
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Category</Text>
                            <Right>
                                <Text>Meat</Text>
                            </Right>
                        </Item>

                        <Item data-seed="logId">
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Purchased Date</Text>
                            <Right>
                                <Text>12/19/2020</Text>
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
                        }}>
                            <Text >Update</Text>
                        </Button>
                    </Col>
                    <Col style={{marginLeft: 10}}>
                        <Button style = {{margin: 10,
                            padding: 15,
                            alignSelf:'center',
                            justifyContent:'center',
                            backgroundColor:"deepskyblue",
                            width:150}} onPress={()=>{
                            this.setState({showModal: false})
                        }}>
                            <Text >Delete</Text>
                        </Button>
                    </Col>
                </Grid>
            </Modal>
        );
    }
}

export default IngredientDetailModal;

