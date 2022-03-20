<template>
  <div :class="$style.root">
    <div :class="$style.searches">
      <Search placeholder="Номер заявки"
              :value="orderFilterValue"
              :width="11.8"
              @input="handleOrderNumberInput"
              @clear="handleClearOrderNumber"/>

      <Search :class="$style.search"
              :value="companyFilterValue"
              placeholder="Наименование клиента"
              :width="16.1"
              @input="handleCompanyNameInput"
              @clear="handleClearCompanyName"/>
    </div>

    <div v-if="isLoading" :class="$style.cards">
      <MedInstitutionCard v-for="i in 10"
                          :key="i"
                          :isLoading="true"/>
    </div>

    <div v-else-if="medCards.length"
         :class="$style.cards">
      <MedInstitutionCard v-for="(card, index) in medCards"
                          :key="index"
                          :isLoading="isLoading"
                          v-bind="card"/>
    </div>

    <div v-else-if="!medCards.length && !isLoading" :class="$style.noFilterResultContainer">
      <div :class="$style.noFilterResultText">
        По заданным фильтрам нет результатов
      </div>
      <v-btn rounded color="primary" dark @click="handleClearAllFilters">
        Сбросить фильтры
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
    handleOrderNumberInput (value: string) {
      homeModule.actions.filterByOrder(value);
    },
    handleCompanyNameInput (value: string) {
      homeModule.actions.filterByCompanyName(value);
    },
    handleClearCompanyName () {
      homeModule.actions.clearCompanyFilter();
    },
    handleClearOrderNumber () {
      homeModule.actions.clearOrderFilter();
    },
    handleClearAllFilters () {
      homeModule.actions.clearAllFilters();
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
  @media screen and (max-width: 600px) {
    .cards {
      justify-content: center;
      padding: 0.1rem 0 1rem 0;
    }
  }

  @media screen and (min-width: 600px) {
    .cards {
      padding: 0.1rem 0 1rem 2rem;
    }
  }

 .root {
   overflow-y: hidden;
   display: flex;
   flex-direction: column;
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
  }

  .searches {
    display: flex;
    flex-direction: row;
    margin: 2rem 2rem 0 2rem;
  }

  .search {
    margin-left: 1rem;
  }

  .noFilterResultContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .noFilterResultText {
    font-weight: normal;
    font-size: large;
    margin-bottom: 0.5rem;
  }
</style>
