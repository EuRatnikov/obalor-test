<template>
  <div :style="{ width: `${width}rem` }">
    <v-text-field :placeholder="placeholder"
                  :value="value"
                  prepend-inner-icon="mdi-magnify"
                  dense
                  outlined
                  single-line
                  solo
                  autofocus
                  clearable
                  rounded
                  @input="handleInput"
                  @click:append="handleClear"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component ({
  name: 'Search',

  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: 12
    }
  },

  methods: {
    handleInput (value: string) {
      this.$emit('input', value);
    },
    handleClear () {
      this.$emit('clear');
    }
  }
})
export default class Search extends Vue {}
</script>