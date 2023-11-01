import React, { useContext, useState } from 'react';
import axios from '@/utils/API_Authentication';
import { useRouter } from 'next/navigation';

const Searchbar = (props) => {
    const router = useRouter();
    let {query, setQuery} = props;

    const queryFetch = (e) => {
        e.preventDefault();

        const newData = {
            query
        };

        router.push(`./search/${query}`);
    }


    return (
        <div className='welcome-container'>
            <h1 className='welcome-heading text-center fw-bold mb-5'>Welcome.</h1>
            <form className='input-group mb-3 w-50 search-bar' onSubmit={queryFetch}>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    type="text"
                    className="form-control"
                    placeholder="Search for Movies / TV Shows here"
                    name='searched-text'
                >
                </input>
                <button className="btn btn-info" type="button" id="button-addon2">Search</button>
            </form>
        </div>
    )
}

export default Searchbar