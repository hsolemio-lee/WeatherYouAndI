import {combineReducers} from 'redux';
import WeatherReducer from './yourWeatherReducer';

export default combineReducers({
    yourWeather : WeatherReducer
})