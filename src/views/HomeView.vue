<template>
  <div :class="$style.root">
    <div :class="$style.searches">
      <Search placeholder="Номер заявки"/>
      <Search :class="$style.search" placeholder="Название компании"/>
    </div>
    <div :class="$style.cards" v-if="!isLoading">
      <MedInstitutionCard v-for="card in cards"
                          :id="card.id"
                          :show="card.show"
                          @click="handleClickCard(card)"/>
    </div>

    <div :class="$style.cards" v-else>
      <v-skeleton-loader :class="$style.skeletonCard" v-for="i in 10" :id="i"/>
    </div>
  </div>
</template>

<script>
  import MedInstitutionCard from '@/components/MedInstitutionCard';
  import Search from '@/components/Search';

  export default {
    name: 'Home',

    components: {
      MedInstitutionCard,
      Search
    },

    data: () => ({
      isLoading: false,
      cards: [
        { id: 0, show: false },
        { id: 1, show: false },
        { id: 2, show: false },
        { id: 3, show: false },
        { id: 4, show: false },
        { id: 5, show: false },
        { id: 6, show: false },
        { id: 7, show: false },
        { id: 8, show: false },
        { id: 9, show: false },
        { id: 10, show: false },
        { id: 11, show: false },
        { id: 12, show: false },
        { id: 13, show: false },
        { id: 14, show: false },
        { id: 15, show: false },
        { id: 16, show: false },
        { id: 17, show: false },
        { id: 18, show: false },
        { id: 19, show: false }
      ]
    }),

    methods: {
      handleClickCard (card) {
        card.show = !card.show;
        console.warn(this.cards, 'CARDS');
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
  padding-bottom: 2rem;
}

.searches {
  margin: 2rem 2rem 0 2rem;
}

.search {
  margin-left: 1rem;
}

.skeletonCard {
  width: 300px;
  height: 170px;
}

</style>
