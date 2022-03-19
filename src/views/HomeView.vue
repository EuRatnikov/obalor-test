<template>
  <div :class="$style.root">
    <div :class="$style.searches">
      <Search placeholder="Номер заявки"
              :width="12"
              @change="handleOrderNumberInput"
              @clear="handleClearOrderNumber"/>

      <Search :class="$style.search"
              placeholder="Название компании"
              :width="15"
              @change="handleCompanyNameInput"
              @clear="handleClearCompanyName"/>
    </div>
    <div :class="$style.cards" v-if="!isLoading">
      <MedInstitutionCard v-for="card in medCards"
                          v-bind="card"
                          @click="handleClickCard(card)"/>
    </div>

    <div :class="$style.cards" v-else>
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
  </div>
</template>

<script>
  import MedInstitutionCard from "../components/MedInstitutionCard.vue";
  import Search from "../components/Search.vue";
  import { homeModule } from "@/store";

  export default {
    name: 'HomeView',

    components: {
      MedInstitutionCard,
      Search
    },

    data: () => ({
      isLoading: true
    }),

    methods: {
      handleClickCard (card) {
        card.showExpand = !card.showExpand;
      },
      handleOrderNumberInput (value) {

      },
      handleClearOrderNumber () {

      },
      handleCompanyNameInput (value) {

      },
      handleClearCompanyName () {

      }
    },

    computed: {
      medCards () {
        return homeModule.state.medCards;
      }
    },

    asyncComputed: {
      mockCards: {
        async get () {
          return homeModule.actions.getMedCards();
        },
        default: []
      }
    }
  }
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
