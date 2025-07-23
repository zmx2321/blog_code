/**
 * 复用组件
 * 当调用比较多的时候
 * 当组件的功能比较复杂的时候
 */
import SubmitBtn from './component/SubmitBtn';

const dataObj = {
    name: 'zs',
    age: 18,
}

const Example4 = () => {
    return (
        <div className="example4">
            <SubmitBtn name="新增" alt='add' data={dataObj} />
            <SubmitBtn name="删除" alt='delete' data={dataObj} />
        </div>
    );
}

export default Example4;