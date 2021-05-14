<template>
  <div class="helloWorld">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// defineProps
const props = defineProps({
  msg: { type: [Number, String], default: '...' },
})
</script>

<style scoped lang="scss">

</style>