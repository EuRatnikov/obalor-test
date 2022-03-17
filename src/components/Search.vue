<template>
  <v-toolbar class="rounded-pill" floating short>
    <v-text-field :placeholder="placeholder"
                  prepend-icon="mdi-magnify"
                  hide-details
                  single-line
                  flat
                  solo
                  @input="handleInput"/>
  </v-toolbar>
</template>

<script lang="ts">
  export default {
    name: 'Search',

    props: {
      placeholder: {
        type: String,
        default: null
      }
    },

    methods: {
      handleInput (inputValue) {
        this.$emit('input', inputValue);
      }
    }
  };
</script>
