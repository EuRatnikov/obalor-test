import { Mutations } from "vuex-smart-module";
import { MedCard } from "@/types";

import HomeState from "./state";

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

    setOrderFilter (value: string | undefined) {
        this.state.orderFilter = value;
    }

    setCompanyFilter (value: string | undefined) {
        this.state.companyFilter = value;
    }
}