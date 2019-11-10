import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";

const weatherCases = {
    Rain: {
        colors:["#00C6FB", "#005BEA"],
        title: "비가 와요",
        subtitle: "한솔이의 마음도 비처럼 음악처럼..",
        icon: "ios-rainy"
    },
    Clear: {
        colors:['#FEF253', '#FF7300'],
        title: "맑아요",
        subtitle: "한솔이 마음처럼 맑아요",
        icon: "ios-sunny"
    },
    Thunderstorm: {
        colors:['#00ECBC', '#007ADF'],
        title: "천둥번개가 쳐요!",
        subtitle: "지미니가 화낼 때처럼...",
        icon: 'ios-thunderstorm'
    },
    Clouds: {
        colors:['#0702CC', '#304352'],
        title: "흐림",
        subtitle: "한솔이 마음은 흐림..",
        icon: 'ios-cloudy'
    },
    Snow: {
        colors:['#7DE2FC', '#B986E5'],
        title: "하늘에서 눈이 와요",
        subtitle: "지민이처럼 예쁜 눈이 와요",
        icon: 'ios-snow'
    },
    Drizzle: {
        colors:['#89EF7F', '#66A6FF'],
        title: "이슬비가 내려요",
        subtitle: "이슬비는 좋아요, 지민이는 더 좋아요",
        icon: 'cloud-rain'
    },
    Haze: {
        colors:['#D7D2CC', '#304352'],
        title: "안개가 꼈어요",
        subtitle: "한솔이 잃어버리지 않게 눈 똑바로 뜨고 다녀요",
        icon: 'weather-fog'
    },
    Mist: {
        colors:['#D7D2CC', '#304352'],
        title: "안개가 꼈어요",
        subtitle: "한솔이 잃어버리지 않게 눈 똑바로 뜨고 다녀요",
        icon: 'weather-fog'
    },
    What: {
        colors:["#00ff99", "#00804d"],
        title: "???",
        subtitle: "무슨 날씨인지 모르겠네요..",
        icon: "ios-warning"
    }
}

export default function Weather(props) {
    const {temp, weatherName, pressWeather} = props;
        if(weatherName == "Haze" || weatherName == "Mist") {
            return (
                <LinearGradient
                    colors = {weatherCases[weatherName ? weatherName : "What"].colors}
                    style = {styles.container}>
                    <View style={styles.upper} >
                        <MaterialCommunityIcons 
                            color="white" 
                            size={144} 
                            name={weatherCases[weatherName ? weatherName : "What"].icon} 
                            onPress={pressWeather}
                        />
                        <Text style={styles.temp}>{temp}°C</Text>
                        <Text style={styles.temp}>{weatherName}</Text>
                    </View>
                    <View style={styles.lower}>
                        <Text style={styles.title}>{weatherCases[weatherName ? weatherName : "What"].title}</Text>
                        <Text style={styles.subtitle}>{weatherCases[weatherName ? weatherName : "What"].subtitle}</Text>
                    </View>
                </LinearGradient>
            )
        } else if (weatherName == "Drizzle") {
            return (
                <LinearGradient
                    colors = {weatherCases[weatherName ? weatherName : "What"].colors}
                    style = {styles.container}>
                    <View style={styles.upper}>
                        <Feather 
                            color="white" 
                            size={144} 
                            name={weatherCases[weatherName ? weatherName : "What"].icon}
                            onPress={pressWeather}/>
                        <Text style={styles.temp}>{temp}°C</Text>
                        <Text style={styles.temp}>{weatherName}</Text>
                    </View>
                    <View style={styles.lower}>
                        <Text style={styles.title}>{weatherCases[weatherName ? weatherName : "What"].title}</Text>
                        <Text style={styles.subtitle}>{weatherCases[weatherName ? weatherName : "What"].subtitle}</Text>
                    </View>
                </LinearGradient>
            )
        } else {
            return (
                <LinearGradient
                    colors = {weatherCases[weatherName ? weatherName : "What"].colors}
                    style = {styles.container}>
                    <View style={styles.upper}>
                        <Ionicons 
                            color="white" 
                            size={144} 
                            name={weatherCases[weatherName ? weatherName : "What"].icon}
                            onPress={pressWeather}/>
                        <Text style={styles.temp}>{temp}°C</Text>
                        <Text style={styles.temp}>{weatherName}</Text>
                    </View>
                    <View style={styles.lower}>
                        <Text style={styles.title}>{weatherCases[weatherName ? weatherName : "What"].title}</Text>
                        <Text style={styles.subtitle}>{weatherCases[weatherName ? weatherName : "What"].subtitle}</Text>
                    </View>
                </LinearGradient>
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
        justifyContent: 'center'
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
    title: {
        fontSize: 38,
        color: "white",
        marginBottom: 10,
        fontWeight: "300",
    },
    subtitle: {
        fontSize: 24,
        color: "white",
        marginBottom: 100
    },
})