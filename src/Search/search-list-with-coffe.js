import axios from "axios";
import Nav from "../nav";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import SearchItem from "./search-item";
import {useParams, useNavigate} from 'react-router-dom';

const SEARCH_URL = "http://localhost:4000/api/search/";
/*
    * This component is used to display the search results.
    * Also support search function if user wants to search again.
 */
function SearchListWithCoffe() {
    // get the search context and zip code from the url
    const {searchContext, zip} = useParams();

    const navigate = useNavigate();

    // set the search context and zip code to the state
    const [search, setSearch] = useState(searchContext);
    const [zipCode, setZip] = useState(zip);
    const [results, setResults] = useState([]);
    const [isRunEffect, setIsRunEffect] = useState(false);

    async function searchYelp() {
        if(search === "" || zipCode === "") {
            alert("Please enter the search context and zip code!");
            return;
        }

        // when user click search button, it will redirect to the search page and reload the page
        navigate(`/search/${zipCode}/${search}`);
        window.location.reload();
    }

    useEffect(() => {
        const asyncData = async () => {
            setIsRunEffect(true);
            try{
                // This is the node API url for search restraurant informations
                const response = await axios(SEARCH_URL + zipCode + '/' + search);
                console.log(response);
                setResults(response.data);
            }catch (e) {
                console.log(e);
            }
        };
        // make sure we only run asyncData() once
        if(isRunEffect == false){
            asyncData();
        }
    });

    return (
        <div >
            <div className="input-group">
                <input
                    className={"form-control"}
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"restraunt name"}
                />
                <input
                    className={"form-control"}
                    type = "text"
                    value={zipCode}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder={"zip code/city name"}
                />
                <button type="button" className="btn btn-outline-primary" onClick={searchYelp}>
                    Search</button>
            </div>
            <div className="gif d-none d-sm-block" >
                <img id="myGif" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGdzbmxlZmJubG83bWR3MTNuMXBiMzdiNjdqMTdlbXAyOTF4Y2Y4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LVaNdR02zQ0Jh9oAot/giphy.gif" alt="A GIF Image"></img>
            </div>

        </div>
    );
}
export default SearchListWithCoffe;