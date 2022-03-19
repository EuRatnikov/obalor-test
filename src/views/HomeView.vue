<template>
  <div :class="$style.root">
    <div :class="$style.searches">
      <Search placeholder="Номер заявки"
              :value="orderFilterValue"
              :width="12"
              @input="handleOrderNumberInput"
              @clear="handleClearOrderNumber"/>

      <Search :class="$style.search"
              :value="companyFilterValue"
              placeholder="Название компании"
              :width="15"
              @input="handleCompanyNameInput"
              @clear="handleClearCompanyName"/>
    </div>
    <div :class="$style.cards" v-if="medCards.length && !isLoading">
      <MedInstitutionCard v-for="card in medCards"
                          v-bind="card"
                          @click="handleClickCard(card)"/>
    </div>

    <div :class="$style.cards" v-else-if="!medCards.length && isLoading">
      <v-sheet
          v-for="i in 10" :id="i"
          color="grey lighten-4"
          class="pa-3"
      >
        <v-skeleton-loader
            :class="$style.skeletonCard"
            elevation="4"
            type="article, actions"
            max-width="215"
            max-height="198"
        ></v-skeleton-loader>
      </v-sheet>
    </div>

    <div v-else-if="!medCards.length">
      <div>Нет результатов</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MedCard } from "@/types";
import { homeModule } from "@/store";

import MedInstitutionCard from "../components/MedInstitutionCard.vue";
import Search from "../components/Search.vue";

@Component({
  name: 'HomeView',
  components: {
    MedInstitutionCard,
    Search
  },
  mounted() {
    homeModule.actions.prepareMedCards();
  },
  methods: {
    handleClickCard (card: MedCard) {
      card.showExpand = !card.showExpand;
    },
    handleOrderNumberInput (value: string) {
      homeModule.actions.filterByOrder(value);
    },
    handleClearOrderNumber () {
      homeModule.actions.clearOrderFilter();
    },
    handleCompanyNameInput (value: string) {
      homeModule.actions.filterByCompanyName(value);
    },
    handleClearCompanyName () {
      homeModule.actions.clearCompanyFilter();
    }
  },
  computed: {
    medCards () {
      return homeModule.state.medCards;
    },
    orderFilterValue () {
      return homeModule.state.orderFilter;
    },
    companyFilterValue () {
      return homeModule.state.companyFilter;
    },
    isLoading () {
      return homeModule.state.isLoading;
    }
  }
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" module>
.root {
  overflow-y: hidden;
}
.cards {
  position: relative;
  width: 100%;
  height: calc(100% - 4.2rem);
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 0.1rem 0 1rem 2rem;
}
.searches {
  display: flex;
  flex-direction: row;
  margin: 2rem 2rem 0 2rem;
}
.search {
  margin-left: 1rem;
}
.skeletonCard {
  width: 300px;
  height: 200px;
}
</style>
