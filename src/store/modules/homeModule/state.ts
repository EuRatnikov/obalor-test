import { MedCard } from "../../../types";

export default class HomeState {
    medCards: MedCard[] = [];
    originalMedCards: MedCard[] = [];
    isLoading: boolean = false;
}