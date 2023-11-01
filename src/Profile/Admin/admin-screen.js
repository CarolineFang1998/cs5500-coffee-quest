import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllUsersThunk} from "../../Users/users-thunks";
import {useNavigate} from "react-router";
import Nav from "../../nav";
import {findUserById} from "../../Users/users-service";
import {updateUserThunk} from "../../Users/users-thunks";
import {updateAllUsers} from "../../Users/users-reducer";
import * as userService from "../../Users/users-service";

function AdminScreen() {
    return (
        <div className="container-fluid">
            <h1 className="display-4 mt-3" style={{ fontWeight: 'bold'}}>Admin Dashboard</h1>
        </div>
    );
}

export default AdminScreen;