import Vue from 'vue'
import Vuex from 'vuex'

import { Module, createStore } from 'vuex-smart-module';
import home from "./modules/homeModule";

Vue.use(Vuex)

const root = new Module({
    modules: {
        home
    },
})

const store = createStore(root)

export default store

export const homeModule = home.context(store)