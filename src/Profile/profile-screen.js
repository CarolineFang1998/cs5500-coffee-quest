import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { profileThunk, logoutThunk, updateUserThunk } from "../Users/users-thunks";
import { Link} from "react-router-dom";
import {findFavoriteRestaurantsByUserId} from "../Users/favoriteRestaurant-service.js";
import {findReviewByUserId} from "../Reviews/reviews-service.js";
import {findDealByUserId} from "../Deals/deals-service.js";
import { findFollowedByFollowingThunk } from "./Follow/follows-thunk";
import "./index.css";

function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const [followers, setFollowers] = useState([]);

    const fetchProfile = async () => {
        const response = await dispatch(profileThunk());
        setProfile(response.payload);
    };

   /* This is to display user's favorite restaurants*/
   const [favRestaurant, setFavRestaurant] = useState([]);
        const fetchFavoriteRestaurants = async () => {
        const response = await findFavoriteRestaurantsByUserId(profile._id);
        setFavRestaurant(response);
    };

    /* This is to display user's reviews*/
    const [reviews, setReviews] = useState([]);
    const fetchReviews = async () => {
        const response = await findReviewByUserId(profile._id);
        setReviews(response);
    };

     /* This is to display user's deals*/
    const [deals, setDeals] = useState([]);
    const fetchDeals = async () => {
        const response = await findDealByUserId(profile._id);
        setDeals(response);
    };

    const fetchFollowers = async () => {
        const response = await dispatch(findFollowedByFollowingThunk(profile._id));
        setFollowers(response.payload);
    }

    const updateProfile = async () => {
       await dispatch(updateUserThunk(profile));
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (profile) {
            fetchFollowers();
            fetchFavoriteRestaurants();
            fetchReviews();
            fetchDeals();
        }
    }, [profile]);

       return (
            <>
            <div className="container-fluid">
                <div className="row m-1">
                    <div className="col-12">
                    {profile && (
                        <div>
                            <h1><i class="bi bi-person-circle"></i><span style={{ fontWeight: 'bold'}}> Welcome</span></h1>
                            <div className="header-border" style={{ fontWeight: 'bold'}}>
                                <span>First Name: {profile.firstName}</span><br/>
                                <span>Last Name: {profile.lastName}</span><br/>
                                <span>Email: {profile.email}</span><br/>

                            {profile.restaurantID && profile.restaurantID !== "" && (
                                <>
                                    <span>Restaurant ID: {profile.restaurantID}</span><br/>
                                </>
                            )}

                            {profile.restaurantName && profile.restaurantName !== "" && (
                                <>
                                    <span>Restaurant Name: {profile.restaurantName}</span><br/>
                                </>
                            )}
                            </div>
                            <br/>

                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={profile.firstName}
                                  onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={profile.lastName}
                                  onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={profile.password}
                                  onChange={(e) => setProfile({...profile, password: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profile.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                />
                             </div>
                             <div className=" float-end m-2" onClick={updateProfile}><button className="btn border border-light">Save</button></div>
                        </div>
                    )}
                   </div>

                   <br/>

                    <div>
                    {followers && profile && profile.role === "USER" && (
                          <div className="row">
                              <div className="col-4">
                              <h2><i class="bi bi-person-plus"></i> My Following</h2>
                              <ul className="list-group">
                                  {followers.map((follower) => (
                                      <li key={follower.following._id} className="list-group-item">
                                          <Link to={`/profile/${follower.followed._id}`}>
                                              <span className="fo-color">{follower.followed.username}</span>
                                          </Link>
                                      </li>
                                  ))}
                              </ul>
                              </div>
                              <br/>
                              <div className="col-4">
                              <h2><i class="bi bi-heart-fill text-danger me-2"></i>My Favorite Coffee</h2>
                              <ul className="list-group">
                                  {favRestaurant.map((item) => (
                                      <li className="list-group-item">
                                          <a href={'http://localhost:3000/detail/' + item.restaurantId}>
                                          <span className="res-font">{item.restaurantName}</span>
                                          </a>
                                  </li>))}
                              </ul>
                          </div>
                          <br/>
                        <div className="col-4">
                        <h2><i class="bi bi-chat-left-heart"></i> My Reviews</h2>
                        <ul className="list-group">
                                {reviews.map((item) => (
                                <li className="list-group-item text-secondary">
                                         <span>{item.review} <i class="bi bi-chat-left-dots"></i></span>
                                         <a href={'http://localhost:3000/detail/' + item.restaurantID}>
                                            <span>{item.restaurantName}</span>
                                        </a>
                                </li>))}
                        </ul>
                       </div>
                     </div>
                    )}
                    </div>
                    </div>
                    {deals && profile && profile.role === "OWNER" && (
                        <div className="border-top border-secondary p-4 mt-5">
                            <h2><i class="bi bi-emoji-sunglasses"></i> My Deals</h2>
                            <Link to={'/detail/' + profile.restaurantID}>Go to the Restaurant</Link>
                            <ul className="list-group col-auto">
                                {deals.map((item) => (
                                    <li className="text-info p-3">
                                         <a href={'http://localhost:3000/detail/' + item.restaurantID}>
                                            <span className="deal-font">{item.deal}</span>
                                        </a>
                                    </li>))}
                            </ul>
                        </div>
                    )}
            </div>
            </>
        );
}

export default ProfileScreen;