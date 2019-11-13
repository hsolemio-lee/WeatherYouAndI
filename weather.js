import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, ActivityIndicator} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";

export const weatherCases = {
    Rain: {
        colors:["#00C6FB", "#005BEA"],
        title: "비가 와요",
        subtitle: [
            "한솔이의 마음도 비처럼 음악처럼.."
            , "지미니의 마음도 비처럼 음악처럼.."
            , "지미니의 바이올린 연주와 잘어울리는 빗소리에요.."
        ],
        icon: "ios-rainy"
    },
    Clear: {
        colors:['#FEF253', '#FF7300'],
        title: "맑아요",
        subtitle: [
            "한솔이 마음처럼 맑아요",
            "지미니 눈망울처럼 맑아요"
        ],
        icon: "ios-sunny"
    },
    Thunderstorm: {
        colors:['#00ECBC', '#007ADF'],
        title: "천둥번개가 쳐요!",
        subtitle: [
            "지미니가 화낼 때처럼...",
            "한솔이 방귀소리처럼"
        ],
        icon: 'ios-thunderstorm'
    },
    Clouds: {
        colors:['#0702CC', '#304352'],
        title: "흐림",
        subtitle: [
            "한솔이 마음은 흐림..",
            "한솔이 마음은 구림..",
            "하하하하림, 치킨너겟!",
            "지미니 입술을 빌림..",
            "밍..."
        ],
        icon: 'ios-cloudy'
    },
    Snow: {
        colors:['#7DE2FC', '#B986E5'],
        title: "하늘에서 눈이 와요",
        subtitle: [
            "지민이처럼 예쁜 눈이 와요",
            "첫눈은 지민이와 함께 하고 싶어요",
            "올해는 화이트 크리스마스 일까요?"
        ],
        icon: 'ios-snow'
    },
    Drizzle: {
        colors:['#89EF7F', '#66A6FF'],
        title: "이슬비가 내려요",
        subtitle: [
            "이슬비는 좋아요, 지민이는 더 좋아요",
            "이슬비가 내리는 오늘은...",
            "지미니는 이슬만 먹고 산대요 많이 먹어요"
        ],
        icon: 'cloud-rain'
    },
    Haze: {
        colors:['#D7D2CC', '#304352'],
        title: "안개가 꼈어요",
        subtitle: [
            "한솔이 잃어버리지 않게 눈 똑바로 뜨고 다녀요",
            "한솔이는 눈꼽이 꼈어요",
            "지미니 눈꼽 꼈어요",
            "밍..."
        ],
        icon: 'weather-fog'
    },
    Mist: {
        colors:['#D7D2CC', '#304352'],
        title: "안개가 꼈어요",
        subtitle: [
            "한솔이 잃어버리지 않게 눈 똑바로 뜨고 다녀요",
            "한솔이는 눈꼽이 꼈어요",
            "지미니 눈꼽 꼈어요",
            "밍..."
        ],
        icon: 'weather-fog'
    },
    What: {
        colors:["#00ff99", "#00804d"],
        title: "???",
        subtitle: [
            "무슨 날씨인지 모르겠네요..",
            "밍이네오.."
        ],
        icon: "ios-warning"
    }
}

export default class Weather extends Component {
    constructor(props) {
      super(props);
      this.state={
        titleValue: new Animated.Value(0),
        subTitleValue: new Animated.Value(0),
        fullViewPosition: props.swipe === "right" ? new Animated.ValueXY({x:-300, y:0}) : new Animated.ValueXY({x:0, y:0}),
        fullViewValue: props.swipe === "right" ? new Animated.Value(0) : new Animated.Value(1),
      };

      this._fadeIn = this._fadeIn.bind(this);
      this._fadeOut = this._fadeOut.bind(this);
      this._getTitleStyle = this._getTitleStyle.bind(this);
      this._getSubTitleStyle = this._getSubTitleStyle.bind(this);
      this._getFullViewStyle = this._getFullViewStyle.bind(this);
      this._pressWeather = this._pressWeather.bind(this);
      this._returnIcon = this._returnIcon.bind(this);
    }

    componentWillMount() {
      this.props.pressWeather();
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.swipe === "left") {
       
        Animated.parallel([
            Animated.timing(this.state.fullViewValue, {
              toValue : 0,
              duration : 300,
              //easing : Easing.bounce,
              delay : 0
            }),
            Animated.timing (this.state.fullViewPosition, {
              toValue : {x: -300, y: 0},
              duration : 300,
              //easing : Easing.bounce,
              delay : 0
            })
        ]).start();
        
      } else if(nextProps.swipe === "right") {
        
        Animated.parallel([
            Animated.timing(this.state.fullViewValue, {
              toValue : 1,
              duration : 300,
              //easing : Easing.bounce,
              delay : 0
            }),
            Animated.timing (this.state.fullViewPosition, {
              toValue : {x: 0, y: 0},
              duration : 300,
              //easing : Easing.bounce,
              delay : 0
            })
        ]).start();
      }
      
      this._fadeIn();
    }

    _fadeIn(){
      Animated.parallel([
          Animated.timing(this.state.titleValue, {
            toValue : 1,
            duration : 1000,
            //easing : Easing.bounce,
            delay : 200
          }),
          Animated.timing (this.state.subTitleValue, {
            toValue : 1,
            duration : 1000,
            //easing : Easing.bounce,
            delay : 1000
          })
      ]).start();
    }

    _fadeOut(){
      Animated.parallel([
        Animated.timing(this.state.titleValue, {
          toValue : 0,
          duration : 1000,
          //easing : Easing.bounce,
          delay : 0
        }),
        Animated.timing (this.state.subTitleValue, {
          toValue : 0,
          duration : 1000,
          //easing : Easing.bounce,
          delay : 1000
        })
      ]).start(()=>{
        this.props.pressWeather();
      });
    }

    _getTitleStyle() {
      const title = {
          fontSize: 38,
          color: "white",
          marginBottom: 10,
          fontWeight: "300",
          opacity: this.state.titleValue
      }
      return title;  
    }

    _getSubTitleStyle() {
      const subTitle = {
        fontSize: 24,
        color: "white",
        marginBottom: 100,
        opacity: this.state.subTitleValue
      }
      return subTitle;
    }

    _getFullViewStyle() {
      const fullView = {
        flex: 1,
        justifyContent: 'center',
        opacity: this.state.fullViewValue,
        left: this.state.fullViewPosition.x,
        backgroundColor: 'transparent',
      }
      return fullView;
    }

    _pressWeather() {
      this._fadeOut();
    }

    _returnIcon() {
      const {weatherName, pressWeather} = this.props;
      if(weatherName == "Haze" || weatherName == "Mist") {
        return (<MaterialCommunityIcons 
                color="white" 
                size={144} 
                name={weatherCases[weatherName].icon} 
          onPress={this._pressWeather}/>);
      } else if (weatherName == "Drizzle") {
        return (<Feather 
                color="white" 
                size={144} 
                name={weatherCases[weatherName].icon}
                onPress={this._pressWeather}/>);
      } else {
        return (<Ionicons 
                color="white" 
                size={144} 
                name={weatherCases[weatherName].icon}
                onPress={this._pressWeather}/>);
      }
    
    }

    render() {
      const {temp, weatherName, subtitleIndex, isLoaded, viewStyle} = this.props;
    
          
        return (
          <Animated.View style={this._getFullViewStyle()}>
            <View style = {styles.container}>        
                <ActivityIndicator animating={!isLoaded} style={styles.loadingBar} size="large" color="white"/>    
                <View style={styles.upper} >
                    {this._returnIcon}
                    <Text style={styles.temp}>{temp}°C</Text>
                    <Text style={styles.temp}>{weatherName}</Text>
                </View>
                <View style={styles.lower}>
                    <Animated.Text style={this._getTitleStyle()}>{weatherCases[weatherName].title}</Animated.Text>
                    <Animated.Text style={this._getSubTitleStyle()}>{weatherCases[weatherName].subtitle[subtitleIndex]}</Animated.Text>
                </View>
            </View>
          </Animated.View>  
        )
  }
    
        
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    weatherName: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    temp: {
        fontSize: 38,
        color: "white",
        marginTop: 10
    },
    upper: {
        flex:1,
        alignItems:"center",
        justifyContent: "center"
    },
    lower: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingLeft: 25
    },
    loadingBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
});
