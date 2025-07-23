/**
 * 复用组件
 * 当调用比较多的时候
 * 当组件的功能比较复杂的时候
 */
import SubmitBtn from './component/SubmitBtn';

const Example4 = () => {
    return (
        <div className="example4">
            <SubmitBtn name="新增" alt='add' />
            <SubmitBtn name="删除" alt='delete' />
        </div>
    );
}

export default Example4;