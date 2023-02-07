// 当前按钮延迟触发
const setBtnEvent = ()=> {
    let testBtnList = document.querySelectorAll('.test_btn')
    // console.log(testBtn)
    testBtnList.forEach(btnItem=> {
        btnItem.addEventListener('click', e=> {
            e.stopPropagation()

            let { target } = e
            target.disabled = true

            let timer = setTimeout(()=> {
                target.disabled = false

                clearTimeout(timer)
            }, 3000)
        })
    })
}

// 其他按钮操作
const otherBtnEvent = ()=> {
    let btn0 = document.querySelector('#btn0')
    btn0.addEventListener('click', ()=> {
        console.log('btn0')
    })
}

// 禁用所有按钮
const prohibit = ()=> {
    let testBtnList = document.querySelectorAll('.test_btn0')
    // console.log(testBtn)
    testBtnList.forEach(btnItem=> {
        btnItem.disabled = true
        let timer = setTimeout(()=> {
            btnItem.disabled = false

            clearTimeout(timer)
        }, 3000)
    })
}

// 所有按钮延迟触发
const setBtnEvent0 = ()=> {
    let testBtnList = document.querySelectorAll('.test_btn0')
    testBtnList.forEach(btnItem=> {
        btnItem.addEventListener('click', e=> {
            prohibit()
        })
    })
}



window.onload = ()=> {
    setBtnEvent()
    otherBtnEvent()

    setBtnEvent0()  // 如果不需要点击触发，这条注释，解开下一条
    // prohibit()
}