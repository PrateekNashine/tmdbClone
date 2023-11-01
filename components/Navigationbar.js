import React from 'react';
import Link from 'next/link';

const Navigationbar = () => {
  return (
    <div className='nav-container'>
        <ul>
          <li>
            <Link className='link' href={"#"}><h3>Movies</h3></Link>
            <ul className='dropdown'>
              <li><Link className='link' href={"./movies/nowPlaying"}>Now Playing</Link></li>
              <li><Link className='link' href={"./movies/popular"}>Popular</Link></li>
              <li><Link className='link' href={"./movies/topRated"}>Top Rated</Link></li>
              <li><Link className='link' href={"./movies/upcoming"}>Upcoming</Link></li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <Link className='link' href={"#"}><h3>TV Shows</h3></Link>
            <ul className='dropdown'>
              <li><Link className='link' href={"./shows/airingToday"}>Airing Today</Link></li>
              <li><Link className='link' href={"./shows/popular"}>Popular</Link></li>
              <li><Link className='link' href={"./shows/topRated"}>Top Rated</Link></li>
              <li><Link className='link' href={"./shows/onTheAir"}>On The Air</Link></li>
            </ul>
          </li>
        </ul>
      </div>
  )
}

export default Navigationbar