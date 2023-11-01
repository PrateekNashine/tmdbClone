"use client"
import React, { useEffect, useState } from 'react';
import axios from '@/utils/API_Authentication';
import Link from 'next/link';


const TrendingShow = (props) => {
  let { trending, setTrending } = props;

  const trendingFetch = async () => {
    try {
      const { data } = await axios.get("3/trending/all/day?api_key=8c4692652155d837c43fac28f8dd958d");
      setTrending(data.results);
      //   console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    trendingFetch();
  }, [])


  let showList = <h3 className='mt-5 w-100 text-center text-danger'>Loading...</h3>
  if (trending.length > 0) {
    showList = trending.map((show, index) => {
      return (
        <Link style={{ textDecoration: "none", color: "#000" }} href={`./${show.id}`}>
          <div className="card trending-shows-card m-3" style={{ width: "20rem", maxWidth: "250px", minWidth: "250px", border: "5px solid #000" }} key={index}>
            <img src={'https://image.tmdb.org/t/p/w500/' + show.poster_path} className='card-img-top display-img' alt="Display Image" />
            <div className="card-body">
              <h5 className="card-title">{show.name || show.title}</h5>
              <p className="card-text">
                {show.first_air_date || show.release_date}
              </p>
            </div>
          </div>
        </Link>
      )
    })
  }

  return (
    <div className='container mt-4 '>
      <h1 className='text-center display-5' style={{ fontWeight: "600" }}>Trending TV Shows / Movies</h1>
      <div className='d-flex mt-3 flex-wrap justify-content-center' key={Math.floor(Math.random() * 10000)}>
        {showList}
      </div>
    </div>
  )
}

export default TrendingShow;    