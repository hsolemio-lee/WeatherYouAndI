import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './weather'

const API_KEY = '0c429a365bfdc6a7526ee98e9324781f'

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this._getWeather(position.coords.latitude, position.coords.longitude)
        this.setState({
          isLoaded: true,
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
  
  render() {
    const {isLoaded, error, temperature, name} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        {isLoaded ? (
        <Weather temp = {Math.floor(temperature)} weatherName = {name}/>
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting Fucking Weather</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
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
});
