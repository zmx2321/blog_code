import MovieList from './MovieList';

// 高阶组件：withFetching
import withFetching from './HOC/withFetch';

const MovieA = (props) => {
    return (
        <>
            <h2>
                111
            </h2>
            <MovieList movies={props.data || []} />
        </>
    );
}

export default withFetching('A')(MovieA);