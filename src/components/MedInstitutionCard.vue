<template>
  <v-card :class="rootClasses" width="210" elevation="4" @click="showExpand = !showExpand">
    <div :class="$style.medName" v-text="medName"/>
    <div :class="$style.budget" v-text="`${medBudget} руб.`"/>
    <div :class="$style.companyName" v-text="companyName"/>
    <div :class="$style.innNumber" v-text="innNumber"/>

    <v-expand-transition>
      <div v-if="showExpand">
        <div :class="$style.statusContainer">
          <v-chip v-for="status in orderStatuses"
                  :class="$style.status"
                  v-text="status"
                  color="#bdbde5"
                  text-color="white"/>
        </div>
        <div :class="$style.customerName" v-text="customerName"/>

        <div :class="$style.statusContainer">
          <v-chip v-for="program in orderPrograms"
                  :class="$style.status"
                  v-text="program"
                  color="primary"
                  text-color="white"/>
        </div>
      </div>
    </v-expand-transition>

    <div :class="$style.orderInfo">
      <div :class="$style.orderNumber" v-text="orderNumber"/>
      <div :class="$style.orderDate" v-text="`от ${orderDate}`"/>
    </div>

  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MedInstitutionCard extends Vue {
  showExpand = false
  @Prop ({ required: true }) medName!: string
  @Prop ({ required: true }) medBudget!: string
  @Prop ({ default: null })companyName!: string
  @Prop ({ default: null }) innNumber!: string
  @Prop ({ default: null }) orderStatuses!: string[]
  @Prop ({ default: null }) orderPrograms!: string[]
  @Prop ({ default: null }) customerName!: string
  @Prop ({ default: null }) orderNumber!: string
  @Prop ({ default: null }) orderDate!: string

  get rootClasses() {
    return [
      this.$style.root,
      {
        [this.$style.maxCardHeight]: !this.showExpand
      }
    ];
  }
}
</script>

<style lang="scss" module>
.root {
  margin: 0 1rem 1rem 0;
  display: flex;
  flex-direction: column;
}

.maxCardHeight {
  max-height: 198px;
}

  .medName,
  .budget,
  .companyName,
  .orderDate {
    margin-left: 1rem;
  }

  .innNumber,
  .orderNumber,
  .orderDate {
    color: gray;
  }

  .budget {
    font-size: medium;
  }

  .medName {
    padding-top: 1rem;
    padding-right: 0.5rem;
    font-size: large;
    font-weight: bold;
  }

  .companyName {
    padding-top: 0.5rem;
    font-weight: bold;
    font-size: medium;
  }

  .innNumber {
    padding-left: 1rem;
  }

  .statusContainer {
    max-width: 300px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
  }

  .status {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
  }

  .orderInfo {
    margin-top: auto;
    padding: 0.5rem 1rem 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
  }

  .orderNumber {
    margin-right: auto;
  }

  .orderDate {
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .customerName {
    margin-top: 1rem;
    padding: 1rem 0 1rem 1rem;
    background: #e5e5f8;
    font-size: medium;
    font-weight: bold;
  }
</style>

