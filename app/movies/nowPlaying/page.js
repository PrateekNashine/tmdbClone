"use client"
import React, { useEffect, useState } from 'react';
import axios from '@/utils/API_Authentication';
import Link from 'next/link';


const page = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [page, setPage] = useState(1);

  console.log(page);
  const nowPlayingMovies = async () => {
    try {
      const { data } = await axios.get("/3/movie/now_playing?api_key=8c4692652155d837c43fac28f8dd958d");
      setNowPlaying(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    nowPlayingMovies();
  }, [])

  let movieList = <h3 className='mt-5 w-100 text-center text-danger'>Loading...</h3>
  if (nowPlaying.length > 0) {
    movieList = nowPlaying.map((movie, index) => {
      return (
        <Link style={{ textDecoration: "none", color: "#000" }} href={`./${movie.id}`}>
          <div className="card trending-movies-card m-3" style={{ width: "20rem", maxWidth: "250px", minWidth: "250px", border: "5px solid #000" }} key={index}>
            <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className='card-img-top display-img' alt="" />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">
                {movie.release_date}
              </p>
            </div>
          </div>
        </Link>
      )
    })
  }

  return (
    <div className='container mt-4 '>
      <h1 className='text-center'>Now Playing Movies</h1>
      <div className='d-flex mt-3 flex-wrap justify-content-center' key={Math.floor(Math.random() * 10000)}>
        {movieList}
      </div>
      <button onClick={() => setPage(page - 1)} className='btn btn-primary'>Previous Page</button>
      <button onClick={() => { setPage(page + 1) }} className='btn btn-primary'>Next Page</button>
    </div>
  )
}

export default page