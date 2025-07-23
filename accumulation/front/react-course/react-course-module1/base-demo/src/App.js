import './App.css';
import Example1 from './example1/index'
import Example2 from './example2/index'

const name = "first app"

function App () {
    return (
        <div className="App">
            app + { name }
            <Example1 />
            <Example2 />
        </div>
    );
}

export default App;
