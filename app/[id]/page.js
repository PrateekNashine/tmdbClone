// Data Example in this page:

// https://api.themoviedb.org/3/movie/movie_id/videos?api_key=8c4692652155d837c43fac28f8dd958d
// backdrop_path:"/2Icjry0xdRSNxrtsBR1F47b9r3u.jpg"
// id:742536
// name: "The Meg Collection"
// poster_path: "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg"
// genres: Array(3)
//  0:{ id: 28, name: 'Action' }
//  1:{ id: 878, name: 'Science Fiction' }
//  2:{ id: 27, name: 'Horror' }
// original_title: "Meg 2: The Trench"
// overview: "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival."
// poster_path: "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg"
// release_date: "2023-08-02"
// runtime: 116
// tagline: "Back for seconds."
// title: "Meg 2: The Trench"

"use client"
import axios from '@/utils/API_Authentication';
import { addRequestMeta } from 'next/dist/server/request-meta';
import React, { useEffect, useState } from 'react';
import style from './styles.css'
import Link from 'next/link';


const page = (props) => {
    const [Details, setDetails] = useState();
    const [backdropPath, setBackdropPath] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [title, setTitle] = useState('');
    const [seriesName, setSeriesName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState('');
    const [totalSeasons, setTotalSeasons] = useState('');
    const [totalEpisodes, setTotalEpisodes] = useState('');
    const [tagline, setTagline] = useState('');
    const [overview, setOverview] = useState('');

    const [trailerLink, setTrailerLink] = useState([])
    let trailerKey;

    const movieDescriptionFetch = async () => {
        try {
            const { data } = await axios.get(`3/movie/${props.params.id}?api_key=8c4692652155d837c43fac28f8dd958d`);
            setDetails({ data });
            setBackdropPath(data.backdrop_path);
            setPosterPath(data.poster_path);
            setTitle(data.title);
            setReleaseDate(data.release_date);
            setTagline(data.tagline);
            setOverview(data.overview);
            setGenres(data.genres);
            setRuntime(data.runtime);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const showDescriptionFetch = async ()=>{
        try {
            const {data} = await axios.get(`3/tv/${props.params.id}?api_key=8c4692652155d837c43fac28f8dd958d`);
            setDetails({ data });
            setBackdropPath(data.backdrop_path);
            setPosterPath(data.poster_path);
            setSeriesName(data.name)
            setTotalSeasons(data.number_of_seasons);
            setTotalEpisodes(data.number_of_episodes);
            setTagline(data.tagline);
            setOverview(data.overview);
            setGenres(data.genres);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        movieDescriptionFetch();
        showDescriptionFetch();
        trailerLinkFetch();
    }, []);

    const trailerLinkFetch = async () => {
        try {
            const { data } = await axios.get(`3/movie/${props.params.id}/videos?api_key=8c4692652155d837c43fac28f8dd958d`)
            setTrailerLink(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    trailerLink.map((id)=>{
        if (id.name === "Official Trailer" || id.name === "Main Trailer") {
            // console.log(id);
            trailerKey = id.key;
        }
    });

    let trailer = <div><iframe style={{marginLeft:"50%",marginTop:"20px", transform:"translate(-50%,0%)"}} width="560" height="315" src={`https://www.youtube.com/embed/`+trailerKey+`?si=Y4YF-IOjo8l_JTxz`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>
    const watchTrailer =()=>{
        // console.log("clicked");
    }
    console.log(totalEpisodes);
    const hour = Math.floor(runtime / 60);
    const minute = runtime % 60;

    let moviedets =
        <div className='backdrop'>
            <img className='backdrop-img' src={`https://image.tmdb.org/t/p/w500/` + backdropPath} alt="backdrop image" />
            <div className='movie-dets'>
                <img className='poster-img' src={`https://image.tmdb.org/t/p/w500/` + posterPath} alt="poster image" />
                <div className='dets'>
                    <h1 className='display-4'>{title || seriesName}</h1>
                    <h5>{releaseDate || totalSeasons} | {genres.map((id) => {
                        return id.name + ", "
                    })} | {totalEpisodes === "undefined" ? hour+"h "+ minute+"m" : totalEpisodes}</h5>
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
                {trailer}
            </div>
        </div>
    )
}

export default page;