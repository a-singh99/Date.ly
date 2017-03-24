import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar'


class Private extends Component {
    constructor() {
        super();
        this.state = { data: null, loading: true, auth: false, restaurants: [], activities: [] }
    }

    componentWillMount() {
        axios.get('/private/' + this.props.data)
            .then(
            response => {
                console.log("Response",response.data)
                this.setState({
                    restaurants: response.data.restaurantdata,
                    activities: response.data.actdata,
                })

            })
    }

    render() {
        console.log(this.state.loading)
        if (!this.props.auth) {
            return <div>loading ...</div>;
        }
        else {

            let restaurantsJSX = this.state.restaurants;
            let activitiesJSX = this.state.activities;
            console.log('LOL',restaurantsJSX);

            restaurantsJSX = this.state.restaurants.map((restaurant, i) => {
                return <div className="flexContainer">
                    {/*<p>{restaurant.created_at}</p>*/}
                    <div className="eachResult card">
                        <img src={restaurant.Image_Url} />
                        <div className="resultDetailContain">
                            <h3>{restaurant.Name}</h3>
                            <p> {restaurant.Category}</p>
                            <p> {restaurant.Activity}</p>
                            <p> {restaurant.City}</p>
                            <p> {restaurant.Province}</p>
                            <p> {restaurant.Postal_Code}</p>
                            <div>Rating {restaurant.Rating} {restaurant.Review_Count} Reviews   </div>
                            <div>Price {restaurant.Price}</div>
                        </div>
                    </div>
                </div>
            })
            activitiesJSX = this.state.activities.map((activity, i) => {
                return <div className="flexContainer">
                    <div className="eachResult card">
                        <img src={activity.Image_Url} />
                        <div className="resultDetailContain">
                            <h3>{activity.Name}</h3>
                            <p> {activity.Category}</p>
                            <p> {activity.Address}</p>
                            <p> {activity.City}</p>
                            <p> {activity.Province}</p>
                            <p> {activity.Postal_Code}</p>
                            <div>Rating {activity.Rating} {activity.Review_Count} Reviews   </div>
                            <div>Price {activity.Price}</div>
                        </div>
                    </div>
                </div>
            })
            return (
                <div className="resultsContain">
                    <SearchBar placedholder="Try another location." />
                    <h2 className="appTagLine">The places you've been, {this.props.data}</h2>
                    <div className="container">
                        <div className="containerFlexChild">{restaurantsJSX}</div>
                        <div className="containerFlexChild">{activitiesJSX}</div>
                    </div>
                </div>

            );
        }
    }
}

export default Private;