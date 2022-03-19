import { Module } from 'vuex-smart-module'
import actions from './actions'
import mutations from './mutations'
import state from './state'

const home = new Module({
    state,
    actions,
    mutations
})

export default home