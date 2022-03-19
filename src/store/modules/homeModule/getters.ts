import { Getters } from 'vuex-smart-module'
import HomeState from "./state";

export default class HomeGetters extends Getters<HomeState> {
    getIsLoading(): boolean {
        return this.state.isLoading;
    }
}