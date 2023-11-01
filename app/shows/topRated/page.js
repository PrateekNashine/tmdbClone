// {
//   "backdrop_path": "/jWXrQstj7p3Wl5MfYWY6IHqRpDb.jpg",
//   "first_air_date": "1952-12-26",
//   "genre_ids": [
//   10763
//   ],
//   "id": 94722,
//   "name": "Tagesschau",
//   "origin_country": [
//   "DE"
//   ],
//   "original_language": "de",
//   "original_name": "Tagesschau",
//   "overview": "German daily news program, the oldest still existing program on German television.",
//   "popularity": 4376.134,
//   "poster_path": "/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg",
//   "vote_average": 7.5,
//   "vote_count": 135
//   }

"use client"
import React, { useEffect, useState } from 'react';
import axios from '@/utils/API_Authentication';
import Link from 'next/link';


const page = () => {
  const [topRated, setTopRated] = useState([]);

  const topRatedShows = async () => {
    try {
      const { data } = await axios.get("/3/tv/on_the_air?api_key=8c4692652155d837c43fac28f8dd958");
      setTopRated(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    topRatedShows();
  }, [])


  let showList = <h3 className='mt-5 w-100 text-center text-danger'>Loading...</h3>
  if (topRated.length > 0) {
    showList = topRated.map((show, index) => {
      return (
        <Link style={{ textDecoration: "none", color: "#000" }} href={`./${show.id}`}>
          <div className="card trending-shows-card m-3" style={{ width: "20rem", maxWidth: "250px", minWidth: "250px", border: "5px solid #000" }} key={index}>
            <img src={'https://image.tmdb.org/t/p/w500/' + show.poster_path} className='card-img-top display-img' alt="Display Image" />
            <div className="card-body">
              <h5 className="card-title">{show.name}</h5>
              <p className="card-text">
                {show.first_air_date}
              </p>
            </div>
          </div>
        </Link>
      )
    })
  }

  return (
    <div className='container mt-4 '>
      <h1 className='text-center'>Top Rated Shows</h1>
      <div className='d-flex mt-3 flex-wrap justify-content-center' key={Math.floor(Math.random() * 10000)}>
        {showList}
      </div>
    </div>
  )
}

export default page