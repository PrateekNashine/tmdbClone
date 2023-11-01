/*
backdrop_path:  "/t2rAdgjSh0WYbXzdOB5zTDqzdCI.jpg"
first_air_date:"2022-11-02"
genres: Array(0) 
    0: {id: 18, name: 'Drama'}
id: 213713
languages: ['hi']
last_air_date: "2023-08-30"
last_episode_to_air :{id: 4612972, name: 'Episode 301', overview: '', vote_average: 0, vote_count: 0, …}
name: "Faltu"
next_episode_to_air: {id: 4612973, name: 'Episode 302', overview: '', vote_average: 0, vote_count: 0, …}
number_of_episodes: 302
number_of_seasons: 1
original_language: "hi"
original_name: "Faltu"
overview: "What's in a name? Amidst the arid landscape of Rajasthan, a young woman with dreamy eyes struggles to prove her worth."
poster_path: "/lgyFuoXs7GvKJN0mNm7z7OMOFuZ.jpg"
seasons: Array(0)
    0: {air_date: '2022-11-02', episode_count: 302, id: 315105, name: 'Season 1', overview: '', …}
status: "Returning Series"
tagline: ""

Trailer:

id: "6492f7d343cd5400c81b03ff"
key: "1ynDrlVlr9E"
name: "Yeşil Vadi'nin Kızı İlk Tanıtım | Yakında hafta içi her gün Show TV'de!"
site: "YouTube"
type: "Teaser"
*/

/*
    Trailer Video Data
{
"iso_639_1": "en",
"iso_3166_1": "US",
"name": "Official Trailer",
"key": "QWKLkT3AgsI",
"site": "YouTube",
"size": 1080,
"type": "Trailer",
"official": true,
"published_at": "2023-08-31T17:36:28.000Z",
"id": "64f0d1a5caa50800e951c227"
},
*/
"use client"
import axios from '@/utils/API_Authentication';
import { addRequestMeta } from 'next/dist/server/request-meta';
import React, { useEffect, useState } from 'react';
import style from './styles.css';
import Link from 'next/link';


const page = (props) => {
    const [movieDetails, setMovieDetails] = useState();
    const [backdropPath, setBackdropPath] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [seriesName, setSeriesName] = useState('');
    const [genres, setGenres] = useState([]);
    const [totalSeasons, setTotalSeasons] = useState('');
    const [tagline, setTagline] = useState('');
    const [overview, setOverview] = useState('');

    // const [trailerLink, setTrailerLink] = useState([])
    // let trailerKey;

    const movieDescriptionFetch = async () => {
        try {
            const { data } = await axios.get(`3/tv/${props.params.id}?api_key=8c4692652155d837c43fac28f8dd958d`);
            setMovieDetails({ data });
            setBackdropPath(data.backdrop_path);
            setPosterPath(data.poster_path);
            setSeriesName(data.name);
            setTagline(data.tagline);
            setOverview(data.overview);
            setGenres(data.genres);
            setTotalSeasons(data.number_of_seasons);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const openCreditLinkFetch = async () => {
        try {
            const {data} = await axios.get(`3/tv/${props.params.id}/videos?api_key=8c4692652155d837c43fac28f8dd958d`)
            // setTrailerLink(data.results);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        movieDescriptionFetch();
        openCreditLinkFetch();  
    }, []);

    console.log(props.params.id);
    // trailerLink.map((id)=>{
    //     if (id.name === "Official Trailer" || id.name === "Main Trailer") {
    //         // console.log(id);
    //         trailerKey = id.key;
    //     }
    // });

    // let trailer = <div><iframe width="560" height="315" src={`https://www.youtube.com/embed/`+trailerKey+`?si=Y4YF-IOjo8l_JTxz`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>
    const watchTrailer =()=>{
        // console.log("clicked");
    }

    // https://api.themoviedb.org/3/tv/216289/videos?api_key=8c4692652155d837c43fac28f8dd958d

    let moviedets =
        <div className='backdrop'>
            <img className='backdrop-img' src={`https://image.tmdb.org/t/p/w500/` + backdropPath} alt="backdrop image" />
            <div className='movie-dets'>
                <img className='poster-img' src={`https://image.tmdb.org/t/p/w500/` + posterPath} alt="poster image" />
                <div className='dets'>
                    <h1 className='display-4'>{seriesName}</h1>
                    <h5> No. of Seasons: {totalSeasons} | {genres.map((id) => {
                        return id.name + ", "
                    })}</h5>
                    <button onClick={watchTrailer} className='btn btn-primary mt-3'>Play Trailer</button>
                    <h5 className='mt-3 tagline'><i>{tagline}</i></h5>
                    <h4 className='mt-3 fw-bold'>Overview</h4>
                    <p className='movie-overview'>{overview}</p>
                </div>
            </div>
        </div>

    return (
        <div>
            {/* <iframe width="560" height="315" src={`https://www.youtube.com/embed/`+trailerKey+`?si=Y4YF-IOjo8l_JTxz`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>   */}
            <div key={Math.floor(Math.random() * 10000)}>
                {moviedets}
                {/* {trailer} */}
            </div>
        </div>
    )
}

export default page;