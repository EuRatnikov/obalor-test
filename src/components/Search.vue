<template>
  <div :style="{ width: `${width}rem` }">
    <v-text-field :placeholder="placeholder"
                  prepend-inner-icon="mdi-magnify"
                  dense
                  outlined
                  single-line
                  solo
                  autofocus
                  clearable
                  rounded
                  @change="handleInput"
                  @click:clear="handleClear"/>
  </div>
</template>

<script>
  export default {
    name: 'Search',

    props: {
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
      handleInput (inputValue) {
        this.$emit('input', inputValue);
      },
      handleClear () {
        this.$emit('clear');
      }
    }
  };
</script>