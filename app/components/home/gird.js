//XINGRI-0Q5OGRE2\Administrator
import React, { Component } from 'react';
import { 
    Dimensions, 
    SafeAreaView,
    SectionList, 
    FlatList,
    Alert,
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Image,
    Navigator
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as action from '../../actions';
const { width, height } = Dimensions.get('window');

const numColumns = 4;

 class gird extends Component {
    constructor(props){
      super(props);
      this.navigation = props.navigation;
    }
    componentDidMount() {
        const {actions, state} = this.props;
        actions.GetSignes(10001,null)
        // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
    }
    render() {
        const { actions, state, navigation } = this.props;
        var signsinfo = {};
        const {signs_info} = state;
        if(signs_info != null){
            signsinfo = signs_info;
        }
        const data = [];
        data.push(signsinfo)
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={[{data}]}
                    renderItem={this._renderSectionItem}
                    keyExtractor={this._keyExtractor}
                    />
            </SafeAreaView>
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
                 onPress={() => this.onPressImage(item.key,item.title)}
            >
                <Image 
                    source={{uri: item.img}}  
                    style={styles.itemImage}
                />
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    onPressImage(keys,title) {
        if(keys===1){
            const{navigation}=this.props.props
            if(navigation){
                navigation.navigate('WalletInfo') 
            }
        }else if(keys===4){
            const{navigation}=this.props.props
            if(navigation){
                navigation.navigate('RechargeLine') 
            }
        }else if(keys==2){
            const{navigation}=this.props.props
            if(navigation){
                navigation.navigate('Wallet') 
            }
        }    
    }
    _renderSectionItem = ({section}) => {
        return (
            <FlatList
                data={section.data[0].content}
                numColumns={numColumns}
                renderItem={this._renderItem}
                style={{backgroundColor: '#fff'}}
                scrollEnabled={false}
            />
        )
    }
};

export default connect(state => ({
    state: state.user
}), (dispatch) => ({
    actions: bindActionCreators(action.user, dispatch)
}))(gird);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    item: {
        backgroundColor: '#fff',
        width: width/numColumns,
        height: 80,  
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImage: {
        width: 40,
        height: 40,
        marginBottom: 5,
    },
    itemText: {
        fontSize: 12,
    }

})
