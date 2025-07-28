import MovieList from './MovieList';

// 高阶组件：withFetching
import withFetching from './HOC/withFetch';

const MovieB = (props) => {
    return (
        <>
            <h2>
                222
            </h2>
            <MovieList movies={props.data || []} />
        </>
    );
}

export default withFetching('B')(MovieB); // 注意文件名修正
