<template>
  <div class="helloWorld" @click='clickHandler'>
    hello, {{ name }}
  </div>
</template>

<script setup>
import { defineEmit, defineProps } from 'vue'

// defineProps
const props = defineProps({
  name: { type: [Number, String], default: '...' },
})

console.log(20210508145649, props)

// defineEmit
const emit = defineEmit(['fuck'])

function clickHandler() {
  emit('fuck', 'shit')
}

</script>

<style scoped lang="scss">

</style>