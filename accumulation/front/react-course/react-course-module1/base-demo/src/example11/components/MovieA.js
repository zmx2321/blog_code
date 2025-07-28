import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';

export default function MovieA () {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // 这里发起 ajax 请求
        console.log('发起 ajax 请求');
        setMovies([
            { id: 1, name: '111' },
            { id: 2, name: '222' },
            { id: 3, name: '333' },
        ]);
    }, []);

    return (
        <>
            <h2>
                111
            </h2>
            <MovieList movies={movies} />
        </>
    );
}
