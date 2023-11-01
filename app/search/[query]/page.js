/*
{
    backdrop_path: "/2PDTWfuBWQKVC7aPAqJK5UCpz08.jpg"
    id: 557
    media_type: "movie"
    original_title: "Spider-Man"
    overview: "After being bitten by a genetically altered spider at Oscorp, nerdy but endearing    high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man."
    poster_path: "/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg"
    release_date: "2002-05-01"
    title: "Spider-Man"
}
*/
"use client"
import React, { useEffect, useState } from 'react';
import axios from '@/utils/API_Authentication';
import Link from 'next/link';
import style from './style.css';


const page = (props) => {

    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: '3/search/multi',
            params: { query: props.params.query },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzQ2OTI2NTIxNTVkODM3YzQzZmFjMjhmOGRkOTU4ZCIsInN1YiI6IjY0ZWI0MjU1YzYxM2NlMDEwYjhkOGFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f_DUhQOIuXXs7mcVVmrnX5dmb0RopjXqyFho5OpfhqE'
            }
        };

        axios.request(options)
            .then(function (response) {
                setFetchedData(response.data.results);
            })
            .catch(function (error) {
                console.error(error);
            });


    }, [])


    // console.log(fetchedData);
    let movie = props.params.query;

    let searchedMovieList = <h3 className='mt-5 w-100 text-center text-danger'>No results found </h3>
    if (fetchedData.length > 0) {
        searchedMovieList = fetchedData.map((movie, index) => {
            return (
                <Link style={{ textDecoration: "none", color: "#000" }} href={`../${movie.id}`}>
                    <div class="card searchCard mb-3" style={{ maxWidth: "700px" }}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className='card-img-top display-img' alt="Poster Image" style={{ width: "150px" }} />
                            </div>
                            <div class="col-md-8 text-center">
                                <div class="card-body">
                                    <h5 class="card-title">{movie.title}</h5>
                                    <p class="card-text">{movie.overview}</p>
                                    <p class="card-text-p"><small class="text-body-secondary">{movie.release_date}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        });
    }
    return (
        <div>
            <h1 className='display-4 text-center'>You searched: "{movie}"</h1>
            {searchedMovieList}
        </div>
    )
}

export default page