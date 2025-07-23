import './App.css';
// 组件名称要大写,否则会报错
import Example1 from './example1/index'
import Example2 from './example2/index'
import Example3 from './example3/index'
import Example4 from './example4/index'

const name = "first app"

const exam3Name = "example3Data"

function App () {
    return (
        <div className="App">
            example4:
            <Example4 />
            <br /><br />

            example3:  父传子
            <Example3 name={exam3Name} testData="testData" testData2="testData2" />
            <br />

            example2:
            <Example2 />
            <br />

            example1:
            {/* // 组件名称要大写,否则会报错 - react认为,小写的组件是html标签 */}
            <Example1 />
            <br />

            app + { name }
        </div>
    );
}

export default App;
