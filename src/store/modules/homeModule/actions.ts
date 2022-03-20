import { Actions } from "vuex-smart-module";
import { MedCard } from "@/types";

import HomeState from "./state";
import HomeMutations from "./mutations";
import HomeGetters from "./getters";
import axios from "axios";

export default class HomeActions extends Actions<HomeState, HomeGetters, HomeMutations> {
    filterByOrder (value: string) {
        if (!value)
            return this.clearOrderFilter();

        this.commit('setIsLoading', true);
        this.commit('setOrderFilter', value.toLowerCase());

        const cards: MedCard[] = this.state.originalMedCards
            ?.filter(({ orderNumber }) => filterBy(orderNumber, this.state.orderFilter!))
            ?.filter(({ medName }) => this.state.companyFilter ? filterBy(medName, this.state.companyFilter): true);

        this.commit('setMedCards', cards);
        this.commit('setIsLoading', false);
    }

    filterByCompanyName (value: string) {
        if (!value)
            return this.clearCompanyFilter();

        this.commit('setIsLoading', true);
        this.commit('setCompanyFilter', value.toLowerCase());

        const cards: MedCard[] = this.state.originalMedCards
            ?.filter(({ medName }) => filterBy(medName, this.state.companyFilter!))
            ?.filter(({ orderNumber }) => this.state.orderFilter ? filterBy(orderNumber, this.state.orderFilter): true);

        this.commit('setMedCards', cards);
        this.commit('setIsLoading', false);

        if (this.state.orderFilter)
            this.filterByOrder(this.state.orderFilter);
    }

    clearOrderFilter () {
        if (this.state.companyFilter)
            this.commit('setMedCards', this.state.originalMedCards.filter(({ medName }) => filterBy(medName, this.state.companyFilter!)));
        else
            this.commit('setMedCards', this.state.originalMedCards);

        this.commit('setOrderFilter', undefined);
    }

    clearCompanyFilter () {
        if (this.state.orderFilter)
            this.commit('setMedCards', this.state.originalMedCards.filter(({ orderNumber }) => filterBy(orderNumber, this.state.orderFilter!)));
        else
            this.commit('setMedCards', this.state.originalMedCards);

        this.commit('setCompanyFilter', undefined);
    }

    clearAllFilters () {
        this.commit('setMedCards', this.state.originalMedCards);
        this.commit('setCompanyFilter', undefined);
        this.commit('setOrderFilter', undefined);
    }

    async prepareMedCards () {
        this.commit('setIsLoading', true);
        try {
            const response = await axios.get('https://run.mocky.io/v3/42c0bd04-eb40-4eb4-b862-bb7fdb2e70eb');
            const { data } = response || {};
            if (!data)
                return null;

            const { cards } = data || {};
            this.commit('setOriginalMedCards', cards);
            this.commit('setMedCards', cards);
            this.commit('setIsLoading', false);
        } catch (err) {
            console.error(err, 'ERROR in getMedCards');
            throw Error('Request error! Something goes wrong in prepareMedCards')
        }
    }
}

function filterBy (filterableValue: string, inputValue: string) {
    return filterableValue.toLowerCase().startsWith(inputValue)
}