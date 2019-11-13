import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator, Alert, TouchableOpacity, Animated } from 'react-native';
import Weather, {weatherCases} from './weather';
import {LinearGradient} from 'expo-linear-gradient';
import GestureRecognizer from 'react-native-swipe-gestures';
import YourWeather from './yourWeather';

const API_KEY = '0c429a365bfdc6a7526ee98e9324781f'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      temperature: null,
      name: "What",
      position: null,
      screenNo: 0,
      swipe: "",
    }

    this._getWeather = this._getWeather.bind(this);
    this._getCurrentLocAndWeather = this._getCurrentLocAndWeather.bind(this);
    this._refreshWeather = this._refreshWeather.bind(this);
    this._onSwipeLeft = this._onSwipeLeft.bind(this);
    this._onSwipeRight = this._onSwipeRight.bind(this);
  }

  componentDidMount() {
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

  _getWeather = (position) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&APPID="+API_KEY
    
    fetch(url)
    .then(res => res.json())
    .then(json => {
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
        console.log("position: ",position);
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

  _refreshWeather() {
    this.setState({
      isLoaded: false
    })
    this._getCurrentLocAndWeather();
  }

  _onSwipeLeft() {
    const {screenNo} = this.state;
    if(screenNo !== 1) {
      this.setState({
        swipe: "left",
        screenNo: screenNo+1
      });
      
    }
  }

  _onSwipeRight() {
    const {screenNo} = this.state;
    if(screenNo !== 0 ) {
      this.setState({
        swipe: "right",
        screenNo: screenNo-1
      });
    }
    
    if(this.state.screenNo === 0) {
      this._refreshWeather();
    }
  }
  
  render() {
    const {isLoaded, error, temperature, name, screenNo, swipe} = this.state;
    const subtitleIndex = Math.floor(Math.random()*(weatherCases[name].subtitle.length));
    return (
      <GestureRecognizer
          onSwipeLeft={this._onSwipeLeft}
          onSwipeRight={this._onSwipeRight}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          style={{
            flex: 1,
            backgroundColor: '#F5FCFF',
            flexDirection: 'row'
          }}>
        
          <StatusBar barStyle="light-content"/>
          <LinearGradient
                      colors = {weatherCases[name].colors}
                      style = {styles.container}> 
            {screenNo === 0 ? 
              <Weather temp = {Math.floor(temperature)} 
                weatherName = {name} 
                pressWeather={this._refreshWeather} 
                subtitleIndex={subtitleIndex} 
                isLoaded={isLoaded}
                swipe={swipe}/>
              :
              <YourWeather swipe={swipe}/>
            }
          </LinearGradient>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

