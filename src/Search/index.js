import axios from "axios";
import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router";
import {useDispatch} from "react-redux";
import SearchItem from "./search-item";
import {useParams } from 'react-router-dom';
import SearchList from "./search-list";
import "./search.css";
import SearchListWithCoffe from "./search-list-with-coffe";

/*
    * This component is empty search page. Will redirect to the search criteria page after click search.
 */
function Search() {
    return (
        <div>
            <h1>Find Your Next Coffee Stop with Coffee-Quest</h1>

            <Routes>
                <Route path="/" element={<SearchListWithCoffe/>}/>
                <Route path=":zip/:searchContext" element={<SearchList/>}/>
            </Routes>



        </div>
    );
}
export default Search;