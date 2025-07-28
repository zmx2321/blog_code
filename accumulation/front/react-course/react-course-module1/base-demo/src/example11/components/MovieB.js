import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';

export default function MovieB () {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // 这里发起 ajax 请求
        console.log('发起 ajax 请求');
        setMovies([
            { id: 4, name: 'aaa' },
            { id: 5, name: 'bbb' },
            { id: 6, name: 'ccc' },
        ]);
    }, []);

    return (
        <>
            <h2>
                222
            </h2>
            <MovieList movies={movies} />
        </>
    );
}