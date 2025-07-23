/**
 * 复用组件
 * 当调用比较多的时候
 * 当组件的功能比较复杂的时候
 */
import SubmitBtn from './component/SubmitBtn';
import SonBtn from './component/SonBtn';

const dataObj = {
    name: 'zs',
    age: 18,
}

// 结构传值
const dataObj2 = {
    aa: '111',
    bb: '222',
    cc: '333',
}

// 新增父组件处理函数
// 父组件定义一个方法, 用来接收子组件传过来的数据
const handleSon = (sonData) => {
    console.log('父组件接收到数据:', sonData);
};

const Example4 = () => {
    return (
        <div className="example4">
            <SubmitBtn name="新增" alt='add' data={dataObj} {...dataObj2} />
            <SubmitBtn name="删除" alt='delete' data={dataObj} />
            {/* 父组件传值到子组件(以方法的形式) - 传一个方法过去,用来接收子组件的值 */}
            <SonBtn name="编辑" alt='edit' onEdit={handleSon} />
        </div>
    );
}

export default Example4;