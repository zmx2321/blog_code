import './App.css';
// 组件名称要大写,否则会报错
import Example1 from './example1/index.js'
// .js文件可以省略
import Example2 from './example2/index'
import Example3 from './example3/index'
import Example4 from './example4/index'
import Example5 from './example5/index'
import Example6 from './example6/index'
import Example7 from './example7/index'
import Example8 from './example8/index'

const name = "first app"

const exam3Name = "example3Data"

function App () {
    return (
        <div className="App">
            example8:
            <Example8 />
            <br />

            example7:
            <Example7 />
            <br />

            example6:
            <Example6 initialMsg="hello world" />
            <br />

            example5:
            <Example5 />
            <br />

            example4:
            <Example4 />
            <br />

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

            app + {name}
        </div>
    );
}

export default App;
