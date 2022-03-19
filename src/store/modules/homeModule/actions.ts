import { Actions } from "vuex-smart-module";
import { MedCard } from "@/types";

import HomeState from "./state";
import HomeMutations from "./mutations";
import HomeGetters from "./getters";
import axios from "axios";

export default class HomeActions extends Actions<HomeState, HomeGetters ,HomeMutations> {
    filterByOrder (value: string) {
        if (!value)
            return this.clearOrderFilter();

        this.commit('setIsLoading', true);
        const cards: MedCard[] = this.state.originalMedCards
            ?.filter(({ orderNumber }) => orderNumber.toLowerCase().startsWith(value.toLowerCase()))
            ?.filter(({ medName }) => this.state.companyFilter ? medName.toLowerCase().startsWith(this.state.companyFilter.toLowerCase()) : true);
        this.commit('setOrderFilter', value);
        this.commit('setMedCards', cards);
        this.commit('setIsLoading', false);
    }

    clearOrderFilter () {
        if (this.state.companyFilter)
            this.commit('setMedCards', this.state.originalMedCards.filter(({ medName }) => medName.toLowerCase().startsWith(this.state.companyFilter!.toLowerCase())));
        else
            this.commit('setMedCards', this.state.originalMedCards);

        this.commit('setOrderFilter', undefined);
    }

    filterByCompanyName (value: string) {
        if (!value)
            return this.clearCompanyFilter();

        this.commit('setIsLoading', true);
        const cards: MedCard[] = this.state.originalMedCards
            ?.filter(({ medName }) => medName.toLowerCase().startsWith(value.toLowerCase()))
            ?.filter(({ orderNumber }) => this.state.orderFilter ? orderNumber.toLowerCase().startsWith(this.state.orderFilter.toLowerCase()) : true);
        this.commit('setCompanyFilter', value);
        this.commit('setMedCards', cards);
        this.commit('setIsLoading', false);

        if (this.state.orderFilter)
            this.filterByOrder(this.state.orderFilter);
    }

    clearCompanyFilter () {
        if (this.state.orderFilter)
            this.commit('setMedCards', this.state.originalMedCards.filter(({ orderNumber }) => orderNumber.toLowerCase().startsWith(this.state.orderFilter!.toLowerCase())));
        else
            this.commit('setMedCards', this.state.originalMedCards);

        this.commit('setCompanyFilter', undefined);
    }

    async prepareMedCards () {
        this.commit('setIsLoading', true);
        try {
            const response = await axios.get('https://run.mocky.io/v3/42c0bd04-eb40-4eb4-b862-bb7fdb2e70eb');
            const { data } = response || {};
            if (!data)
                return null;

            const { cards } = data || {};
            const preparedCards = cards.map((card: MedCard) => ({ ...card, showExpand: false }));
            this.commit('setOriginalMedCards', preparedCards);
            this.commit('setMedCards', preparedCards);
            this.commit('setIsLoading', false);
        } catch (err) {
            console.error(err, 'ERROR in getMedCards');
            return null;
        }
    }
}