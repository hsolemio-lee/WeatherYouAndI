import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, ActivityIndicator, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ActionCreator from '../actions';
import {bindActionCreators} from 'redux';

class YourWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullViewPosition: props.swipe === "left" ? new Animated.ValueXY({x:300, y:0}) : new Animated.ValueXY({x:0, y:0}),
      fullViewValue: props.swipe === "left" ? new Animated.Value(0) : new Animated.Value(1),
      messages: [],
      message: "",
    }

    this._getFullViewStyle = this._getFullViewStyle.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
  }

  componentWillMount() {
    const {fetchMessages} = this.props.actions;
    fetchMessages();
    Animated.parallel([
        Animated.timing(this.state.fullViewValue, {
          toValue : this.props.swipe === "left" ? 1 : 0,
          duration : 300,
          //easing : Easing.bounce,
          delay : 0
        }),
        Animated.timing (this.state.fullViewPosition, {
          toValue : this.props.swipe === "left" ? {x: 0, y: 0} : {x: 300, y: 0},
          duration : 300,
          //easing : Easing.bounce,
          delay : 0
        })
    ]).start();
  }


  componentWillReceiveProps(nextProps) {
    
    const {messages} = nextProps;
    console.log("nextProps : ", nextProps);
    this.setState({
      messages: messages,
      message: ""
    });
    Animated.parallel([
        Animated.timing(this.state.fullViewValue, {
          toValue : nextProps.swipe === "left" ? 1 : 0,
          duration : 300,
          //easing : Easing.bounce,
          delay : 0
        }),
        Animated.timing (this.state.fullViewPosition, {
          toValue : nextProps.swipe === "left" ? {x: 0, y: 0} : {x: 300, y: 0},
          duration : 300,
          //easing : Easing.bounce,
          delay : 0
        })
    ]).start();
  }

  _getFullViewStyle() {
      const fullView = {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        opacity: this.state.fullViewValue,
        left: this.state.fullViewPosition.x,
        backgroundColor: 'transparent',
      }
      return fullView;
  }

  _sendMessage() {
      const {addMessage} = this.props.actions;
      
      addMessage(this.state.message);
      this.textInput.clear();
  }

  render() {
    const {messages} = this.state;
    
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <Animated.View style={this._getFullViewStyle()}>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 8}}>
            <Text style={{color: 'white', fontSize: 30}}>{messages.length !== 0 ? messages[0] : '날씨를 표현해봐요'}</Text>
          </View>
          <View style={styles.footer} >
            <TouchableOpacity style={styles.inputContainer}>
              <TextInput 
                  ref={input => {this.textInput = input}}
                  style={styles.inputs}
                  placeholder="본인의 날씨(기분, 컨디션)를 표현해 보세요~"
                  underlineColorAndroid='transparent'
                  onChangeText={(text)=>{
                    this.setState({
                      message: text
                    });
                  }
              }/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSend} onPress={this._sendMessage}>
              <Ionicons name="ios-send" color="white"/>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  
}

const styles = {
  footer:{
    flexDirection: 'row',
    flex : 1,
    height:60,
    backgroundColor: 'transparent',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
}

const mapStateToProps = (state) => {
  const {yourWeather : {messages}} = state;
  return {messages};
}

const mapDispatchToProps = (dispatch) => {
  const {addMessage, fetchMessages} = ActionCreator;
  return {
    actions: bindActionCreators({
      addMessage, fetchMessages
    }, dispatch)
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(YourWeather);
