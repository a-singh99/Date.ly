import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './SearchBar'


class Result extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            activities: []
        }
        this.handleShuffle = this.handleShuffle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleShuffle() {
        axios.get('/search/' + localStorage.results)
            .then(
            response => {
                this.setState({
                    restaurants: response.data.randomRestaurantArray,
                    activities: response.data.randomActivtiesArray,
                })
            })
    }

    handleSelect() {
        // location.href = "/private";
        axios.post('/private/', {
            selectedRes: this.state.restaurants[0],
            selectedAct: this.state.activities[0],
            username: this.props.data
        })
            .then(
            response => {
                if (response = 200) {
                    location.href = "/private";
                }
            })
    }

    componentWillMount() {
        console.log(this.props)
        console.log(localStorage.results)
        axios.get('/search/' + localStorage.results)
            .then(
            response => {
                this.setState({
                    restaurants: response.data.randomRestaurantArray,
                    activities: response.data.randomActivtiesArray,
                })
                console.log(response.data.randomRestaurantArray)
            })
    }

    render() {
        let selectButton;
        if (this.props.auth) {
            selectButton = (<button className="btn selectBtn" onClick={this.handleSelect}>Select This Option</button>)
        }
        let restaurantsJSX = this.state.restaurants;
        let activitiesJSX = this.state.activities;

        restaurantsJSX = this.state.restaurants.map((restaurant, i) => {
            return <div className="flexContainer">
                <div className="eachResult card">
                    <img src={restaurant.image_url} />
                    <div className="resultDetailContain">
                        <h3>{restaurant.name}</h3>
                        <p> {restaurant.categories[0].title}</p>
                        <p> {restaurant.location.address1}</p>
                        <p> {restaurant.location.city}</p>
                        <p> {restaurant.location.state}</p>
                        <p> {restaurant.location.zip_code}</p>
                        <div>Rating {restaurant.rating} {restaurant.review_count} Reviews   </div>
                        <div>Price {restaurant.price}</div>
                    </div>
                </div>
            </div>
        })
        activitiesJSX = this.state.activities.map((activity, i) => {
            return <div className="flexContainer">
                <div className="eachResult card">
                    <img src={activity.image_url} />
                    <div className="resultDetailContain">
                        <h3>{activity.name}</h3>
                        <p> {activity.categories[0].title}</p>
                        <p> {activity.location.address1}</p>
                        <p> {activity.location.city}</p>
                        <p> {activity.location.state}</p>
                        <p> {activity.location.zip_code}</p>
                        <div>Rating {activity.rating} {activity.review_count} Reviews   </div>
                        <div>Price {activity.price}</div>
                    </div>
                </div>
            </div>
        })

        return (
            <div className="resultsContain">
                <SearchBar placedholder="Try another location." />
                <h2 className="resultTitle">Restaurant + Activity = Great Date</h2>
                <div className="container">
                    {/*<div className="progress">
                        <div className="indeterminate"></div>
                    </div>*/}
                    <div className="containerFlexChild">{restaurantsJSX}</div>
                    <div className="containerFlexChild">{activitiesJSX}</div>
                </div>
                <div className="btnContain">
                    <button className="btn shuffleBtn" onClick={this.handleShuffle}>Get Another Date</button>
                    {selectButton}
                </div>
            </div>

        );
    }
}

export default Result;