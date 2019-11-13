import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator, Alert, TouchableOpacity, Animated } from 'react-native';
import Weather, {weatherCases} from './weather'

const API_KEY = '0c429a365bfdc6a7526ee98e9324781f'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      temperature: null,
      name: null,
      position: null,
      loadingValue: new Animated.Value(0)
    }

    this._getWeather = this._getWeather.bind(this);
    this._fadeIn = this._fadeIn.bind(this);
    this._getCurrentLocAndWeather = this._getCurrentLocAndWeather.bind(this);
    this._refreshWeather = this._refreshWeather.bind(this);
    this._getLoadingViewStyle = this._getLoadingViewStyle.bind(this);
  }

  componentDidMount() {
    this._fadeIn();
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position);
        this.setState({
          isLoaded: true,
          position: position
        });
      },
      error => {
        console.log(error);
        this.setState({
          error : error
        });
      }
    );
  }

  _fadeIn(){
    Animated.timing (
      this.state.loadingValue, {
        toValue : 1,
        duration : 1000,
        //easing : Easing.bounce,
        delay : 200
    }).start();
  }

  _getWeather = (position) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&APPID="+API_KEY
    console.log(url); 
    fetch(url)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        temperature : json.main.temp,
        name: json.weather[0].main,
        isLoaded: true,
        position: position,
      });
    })
  }

  _getCurrentLocAndWeather() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this._getWeather(position);
      },
      error => {
        console.log(error);
        this.setState({
          error : error
        });
      }
    )
  }

  _getLoadingViewStyle() {
    const loading = {
      flex: 1,
      backgroundColor: '#FDF6AA',
      justifyContent: "flex-end",
      paddingLeft: 24,
      opacity: this.state.loadingValue
    };

    return loading;
  }

  _refreshWeather() {
    console.log("Clicked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    this.setState({
      isLoaded: false
    })
    this._getCurrentLocAndWeather();
  }
  
  render() {
    const {isLoaded, error, temperature, name} = this.state;
    const subtitleIndex = Math.floor(Math.random()*(weatherCases[name ? name : "What"].subtitle.length));
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Weather temp = {Math.floor(temperature)} weatherName = {name} pressWeather={this._refreshWeather} subtitleIndex={subtitleIndex} isLoaded={isLoaded}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
