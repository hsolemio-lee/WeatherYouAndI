import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import Weather from './weather'

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
    }

    this._getWeather = this._getWeather.bind(this);
    this._getCurrentLocAndWeather = this._getCurrentLocAndWeather.bind(this);
    this._refreshWeather = this._refreshWeather.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude)
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
    )
  }


  _getWeather = (lat, lon) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+lat+"&lon="+lon+"&APPID="+API_KEY
    console.log(url); 
    fetch(url)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        temperature : json.main.temp,
        name: json.weather[0].main
      })
    })
  }

  _getCurrentLocAndWeather() {
    this.setState({
      isLoaded: false
    })
    console.log(this.state.isLoaded);
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this._getWeather(position.coords.latitude, position.coords.longitude)
        this.setState({
          isLoaded: true,
          position: position,
        });
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
    console.log("hello weather")
    this._getCurrentLocAndWeather();
  }
  
  render() {
    const {isLoaded, error, temperature, name} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        {isLoaded ? (<Weather temp = {Math.floor(temperature)} weatherName = {name} pressWeather={this._refreshWeather}/>) 
        : 
        (<View style={styles.loading}>
            <Text style={styles.loadingText} >날씨를 불러오는 중이에요..</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
         </View>)}
      <ActivityIndicator animating={isLoaded == false} style={styles.loadingBar} size="large" color="white"/>            
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  errorText: {
    color: "red",
    marginBottom: 10
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: "flex-end",
    paddingLeft: 24
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 100
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
