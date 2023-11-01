"use client"
import React, { useEffect, useState } from 'react';
import axios from '@/utils/API_Authentication';
import Link from 'next/link';


const page = () => {
  const [upcoming, setUpcoming] = useState([]);

  const upcomingMovies = async () => {
    try {
      const { data } = await axios.get("/3/movie/upcoming?api_key=8c4692652155d837c43fac28f8dd958d");  
      setUpcoming(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    upcomingMovies();
  }, [])


  let movieList = <h3 className='mt-5 w-100 text-center text-danger'>Loading...</h3>
  if (upcoming.length > 0) {
    movieList = upcoming.map((movie, index) => {
      return (
        <Link style={{textDecoration:"none", color:"#000"}} href={`./${movie.id}`}>
          <div className="card trending-movies-card m-3" style={{ width: "20rem", maxWidth: "250px", minWidth: "250px", border:"5px solid #000" }} key={index}>
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
      <h1 className='text-center'>Upcoming Movies</h1>
      <div className='d-flex mt-3 flex-wrap justify-content-center' key={Math.floor(Math.random() * 10000)}>
        {movieList}
      </div>
    </div>
  )
}

export default page