import { relative } from './relative.js'

const state = relative({
    a: 1,
    b: 2
})

function fn() {
    state.a
    state.b
}

fn()

state.a ++