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
import Example9 from './example9/index'
import Example10 from './example10/index'
import Example11 from './example11/index'
import Example12 from './example12/index'
import Example13 from './example13/index'
import Example14 from './example14/index'
import Example15 from './example15/index'
import Example16 from './example16/index'
import Example17 from './example17/index'
import Example18 from './example18/index'
import Example19 from './example19/index'
import Example20 from './example20/index'
import Example21 from './example21/index'
import Example22 from './example22/index'
import Example23 from './example23/index'
import Example24 from './example24/index'
import Example25 from './example25/index'
import Example26 from './example26/index'
import Example27 from './example27/index'
import Example28 from './example28/index'
import Example29 from './example29/index'
import Example30 from './example30/index'

const name = "first app"

const exam3Name = "example3Data"

function App () {
    return (
        <div className="App">
            {/* example30:
            <Example30 />
            <br />

            example29:
            <Example29 />
            <br />

            example28:
            <Example28 />
            <br />

            example27:
            <Example27 />
            <br />

            example26:
            <Example26 />
            <br />

            example25:
            <Example25 />
            <br />

            example24:
            <Example24 />
            <br />

            example23:
            <Example23 />
            <br />

            example22:
            <Example22 />
            <br />

            example21:
            <Example21 />
            <br />

            example20:
            <Example20 />
            <br />

            example19:
            <Example19 />
            <br />

            example18:
            <Example18 />
            <br />

            example17:
            <Example17 />
            <br />

            example16:
            <Example16 />
            <br />

            example15:
            <Example15 />
            <br />

            example14:
            <Example14 />
            <br />

            example13:
            <Example13 />
            <br />

            example12:
            <Example12 />
            <br />

            example11:
            <Example11 />
            <br />*/}

            example10:
            <Example10 />
            <br />

            example9:
            {/* <Example9 /> */}
            <br />

            example8:<br />
            <Example8 />
            <br />
            <br />

            example7:<br />
            <Example7 />
            <br />

            example6:
            {/* <Example6 initialMsg="hello world" /> */}
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
