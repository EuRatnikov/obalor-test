<template>
  <v-card :class="rootClasses" width="300" elevation="4" @click="$emit('click')">
    <div :class="$style.medName">Частная клиника "Здоровье"</div>
    <div :class="$style.budget">2 000 000 руб.</div>
    <div :class="$style.companyName">ООО "Стройсвет"</div>
    <div :class="$style.innNumber">ИНН 98423245</div>

    <v-expand-transition>
      <div v-if="show">
        <div :class="$style.statusContainer">
          <v-chip v-for="status in ['Исполнение', 'На экспертизе', 'Новая']" color="#bdbde5" text-color="white" :class="$style.status" v-text="status"/>
        </div>
        <div :class="$style.customerName">Иванов И.И</div>

        <div :class="$style.statusContainer">
          <v-chip v-for="status in ['Физиотерапия', 'Неврология']" color="primary" text-color="white" :class="$style.status" v-text="status"/>
        </div>
      </div>
    </v-expand-transition>

    <div :class="$style.orderInfo">
      <div :class="$style.orderNumber">2334562</div>
      <div :class="$style.orderDate">от 20.12.2021</div>
    </div>

  </v-card>
</template>

<script lang="ts">
export default {
  name: 'MedInstitutionCard',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    medName: {
      type: String,
      required: true
    },
    medBudget: {
      type: Number,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    innNumber: {
      type: Number,
      required: true
    },
    orderStatuses: {
      type: Array,
      default: null
    },
    customerName: {
      type: String,
      default: null
    },
    orderNumber: {
      type: Number,
      default: null
    },
    orderDate: {
      type: String,
      default: null
    }
  },
  data: () => ({

  }),
  computed: {
    rootClasses () {
      return [
        this.$style.root,
        {
          [this.$style.maxCardHeight]: !this.show
        }
      ];
    }
  }
};
</script>

<style lang="scss" module>
.root {
  margin: 1.5rem 0 0 1.5rem;
}

.maxCardHeight {
  max-height: 170px;
}

.medName,
.budget,
.companyName {
  margin-left: 1rem;
}

.budget {
  font-size: medium;
}

.medName {
  padding-top: 1rem;
  font-size: large;
  font-weight: bold;
}

.companyName {
  padding-top: 0.5rem;
  font-weight: bold;
  font-size: medium;
}

.innNumber {
  color: gray;
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
  padding: 0.5rem 1rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
}

.orderNumber {
  color: gray;
  margin-right: 2rem;
}

.orderDate {
  color: gray;
}

.customerName {
  margin-top: 1rem;
  padding: 1rem 0 1rem 1rem;
  background: #e5e5f8;
  font-size: large;
}
</style>
