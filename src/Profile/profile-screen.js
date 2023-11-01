import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { profileThunk, logoutThunk, updateUserThunk } from "../Users/users-thunks";
import { Link} from "react-router-dom";
import {findFavoriteRestaurantsByUserId} from "../Users/favoriteRestaurant-service.js";
// import {findReviewByUserId} from "../Reviews/reviews-service.js";
// import {findDealByUserId} from "../Deals/deals-service.js";
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

     /* This is to display user's deals*/
    const [deals, setDeals] = useState([]);

    const updateProfile = async () => {
       await dispatch(updateUserThunk(profile));
    };


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