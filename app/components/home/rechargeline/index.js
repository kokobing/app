//XINGRI-0Q5OGRE2\Administrator
import React, { Component } from 'react';
import { 
    Dimensions, 
    SectionList, 
    FlatList,
    Alert,
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Image,
    Modal,
    TextInput,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as action from '../../../actions';
import { H3 } from 'native-base';
const { width, height } = Dimensions.get('window');
let dialogWidth = width-80;

const numColumns = 3;

 class RechargeLine extends Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
      this.state = {
        modalVisible: false,
        keys:0,
        moneys:0
    };
    }
    componentDidMount() {
        // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
    }
    setModalVisible(visible,keies,moneies) {
        this.setState({
            modalVisible: visible,
            keys:keies,
            moneys:moneies
        });
    }
    onClose() {
        this.setState({modalVisible: false});
    }
    render() {
        const data = [{
            content: [
                { key:1,money: 10, title: '赠送2元'},
                { key:2,money: 30, title: '赠送7元'},
                { key:3,money: 50, title: '赠送12元'},
                { key:4,money: 100, title: '赠送20元'},
                { key:5,money: 70, title: '赠送70元'},
                { key:6,money: 120, title: '赠送120元'},
            ],
            img: 'content',
        }];
        return (
           
            <View style={styles.container}>
                <H3 style={{margin:10}}>在线充值</H3>
                <SectionList
                    sections={[{data}]}
                    renderItem={this._renderSectionItem}
                    keyExtractor={this._keyExtractor}
                    />
                <View style={{marginTop: 22}}>
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setModalVisible(false,0,0)}}
                    >
                        <TouchableOpacity style={{flex:1}} onPress={this.onClose.bind(this)}>
                            <View style={stylees.container}>
                                <View style={stylees.innerContainer}>
                                    <H3>在线充值</H3>
                                    <View style={ {flexDirection:'row',height:80,marginTop:10}}>
                                        <TouchableOpacity onPress={() => this.onPressImage(this.state.keys,this.state.moneys)}>
                                            <View style={ {flex:1,margin:20 }}>
                                                <Image source={require('../images/alipay.png')} style={{height: 60,width:60,alignSelf:'center'}}/>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.onPressImage(this.state.keys,this.state.moneys)}>
                                            <View style={ {flex:1,margin:20 }}>
                                                <Image source={require('../images/weipay.png')} style={{height: 60,width:60,alignSelf:'center'}}/>
                                            </View>
                                        </TouchableOpacity>          
                                    </View>
                                    <View style={stylees.btnContainer}>
                                        <TouchableHighlight onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible,0,0);
                                        }}>
                                            <Text  style={stylees.hidemodalTxt}>关闭</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </View>
        )
    }

    _keyExtractor = (item, index) => {
        return item.img;
    }


    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                activeOpacity={0.7}
                style={styles.item}
                 onPress={() => {
                    this.setModalVisible(true,item.key,item.money)
                }}
            >
              <Text style={styles.itemText1}>{item.money}</Text>
              <Text style={styles.itemText2}>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    onPressImage(keys,title) {
        alert(keys+"========>>>>>"+title);
        // if(keys===1){
        //     const{navigation}=this.props
        //     if(navigation){
        //         navigation.navigate('Scanning') 
        //     }
        // }else if(keys===4){
        //     const{navigation}=this.props
        //     if(navigation){
        //         navigation.navigate('Recharge') 
        //     }
        // }else{
        //      const{navigation}=this.props
        //     if(navigation){
        //         navigation.navigate('Dialog') 
        //     }
        // }
        
    }
    _renderSectionItem = ({section}) => {
        return (
            <FlatList
                data={section.data[0].content}
                numColumns={numColumns}
                renderItem={this._renderItem}
                style={{backgroundColor: '#fff', borderRadius:5}}
                scrollEnabled={false}
            />
        )
    }
};

export default connect(state => ({
    state: state.user
}), (dispatch) => ({
    actions: bindActionCreators(action.user, dispatch)
}))(RechargeLine);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    item: {
        backgroundColor: '#F5FCFF',
        width: (width-48)/numColumns,
        height: 60,  
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        borderWidth:1,
        margin:8,
        borderColor:'#6495ED'
    },
    itemText1: {
        fontSize: 16,
        color:'#6495ED'
    },
    itemText2: {
        fontSize: 12,
        color:'#87CEFA'
    }

})
const stylees = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20

    },
    btnContainer:{
        width:dialogWidth,
        borderTopWidth:1,
        borderTopColor:'#777',
        alignItems:'center'
    },
    inputtext:{
        width:dialogWidth-20,
        margin:10,
    },
    hidemodalTxt: {
        marginTop:10,
    },
});