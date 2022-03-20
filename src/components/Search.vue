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
                  @input="$emit('input', $event)"
                  @click:append="$emit('clear')"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  @Prop ({ default: null }) value!: string
  @Prop ({ default: null }) placeholder!: string
  @Prop ({ default: null }) width!: number
}
</script>