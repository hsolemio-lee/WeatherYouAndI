import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, ActivityIndicator} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default class YourWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullViewPosition: props.swipe === "left" ? new Animated.ValueXY({x:300, y:0}) : new Animated.ValueXY({x:0, y:0}),
      fullViewValue: props.swipe === "left" ? new Animated.Value(0) : new Animated.Value(1),
    }

    this._getFullViewStyle = this._getFullViewStyle.bind(this);
  }

  componentWillMount() {
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
    console.log("nextProps.swipe :", nextProps.swipe);
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
        justifyContent: 'center',
        alignItems: 'center',
        opacity: this.state.fullViewValue,
        left: this.state.fullViewPosition.x,
        backgroundColor: 'transparent',
      }
      return fullView;
  }

  render() {
    return(
      <Animated.View style={this._getFullViewStyle()}>
        <Text style={{fontSize: 50, color: 'white'}}>안녕 쟈기</Text>
      </Animated.View>
    )
  }
}
