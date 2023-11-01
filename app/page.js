"use client"
// ?api_key=8c4692652155d837c43fac28f8dd958d
import React, { useState } from 'react';
import style from './style.css';
import Link from 'next/link';
import axios from '../utils/API_Authentication';
import TrendingShow from '@/components/TrendingShow';
import Searchbar from '@/components/Searchbar';
import Navigationbar from '@/components/Navigationbar';

const page = () => {
  const [trending, setTrending] = useState([]);
  const [query, setQuery] = useState('')

  return (
    <div>
      <Navigationbar></Navigationbar>
      <hr />
      <div>
        <Searchbar
          query = {query}
          setQuery = {setQuery}
        >
        </Searchbar>
      </div>
      <hr />
      <TrendingShow
        trending={trending}
        setTrending={setTrending}
      >
      </TrendingShow>
    </div>
  )
}

export default page;