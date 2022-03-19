import {Actions} from "vuex-smart-module";
import HomeState from "./state";
import { MedCard } from "../../../types";
import HomeMutations from "./mutations";
import HomeGetters from "./getters";
import axios from "axios";

export default class HomeActions extends Actions<HomeState, HomeGetters ,HomeMutations> {
    filterByOrder (value: string) {
        this.commit('setIsLoading', true);
        const cards: MedCard[] = this.state.medCards?.filter(({ orderNumber }) => orderNumber.startsWith(value))
        this.commit('setMedCards', cards);
        this.commit('setIsLoading', false);
    }

    filterByCompanyName (value: string) {
        this.commit('setIsLoading', true);
        const cards: MedCard[] = this.state.medCards?.filter(({ companyName }) => companyName.startsWith(value))
        this.commit('setMedCards', cards);
        this.commit('setIsLoading', false);
    }

    async getMedCards (): Promise<MedCard[] | null> {
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

            return this.state.medCards;
        } catch (err) {
            console.error(err, 'ERROR in getMedCards');
            return null;
        }
    }
}