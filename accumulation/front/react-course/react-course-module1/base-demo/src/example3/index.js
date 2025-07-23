import { useState, useEffect } from 'react';

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

function Example2 () {
    return (
        <div className="example2">
            { ulEle }
        </div>
    );
}

export default Example2;