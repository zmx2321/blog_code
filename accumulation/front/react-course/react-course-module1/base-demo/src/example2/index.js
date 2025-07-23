let liList = ['111', '222', '333']

const ulEle = (
    <ul>
        {
            liList.map((item, index) => {
                return <li key={index}>{item}</li>
            })
        }
    </ul>
)

// 过滤条件
const ulEle2 = (
    <ul>
        {
            liList.map((item, index) => {
                return parseInt(item) > 120 ? <li key={index}>{item}</li> : null
            })
        }
    </ul>
)

/* function Example2 () {
    return (
        <div className="example2">
            ulEle1:
            { ulEle }
            ulEle2:
            { ulEle2 }
        </div>
    );
}

export default Example2; */

export default function Example2 () {
    return (
        <div className="example2">
            ulEle1:
            { ulEle }
            ulEle2:
            { ulEle2 }
        </div>
    );
}