import './App.css';
import Example1 from './example1/index'
import Example2 from './example2/index'
import Example3 from './example3/index'

const name = "first app"

function App () {
    return (
        <div className="App">
            app + { name }

            <br /><br />

            example1:
            <Example1 />

            <br />

            example2:
            <Example2 />

            <br />

            example3:
            <Example3 />
        </div>
    );
}

export default App;
