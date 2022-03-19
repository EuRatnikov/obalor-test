import {Mutations} from "vuex-smart-module";
import HomeState from "./state";
import { MedCard } from "../../../types";

export default class HomeMutations extends Mutations<HomeState> {
    setMedCards (cards: MedCard[]) {
        this.state.medCards = cards;
    }

    setOriginalMedCards (cards: MedCard[]) {
        this.state.originalMedCards = cards;
    }

    setIsLoading (isLoading: boolean) {
        this.state.isLoading = isLoading;
    }
}