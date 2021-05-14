<template>
	<div class="about">
		{{ count }}
		<button @click="commit">commit</button>
		<button @click="dispatch">dispatch</button>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

let store = useStore()
let count = computed(() => store.state.AppData.count)
let commit = () => store.commit('AppData/Add_COUNT')
let dispatch = () => store.dispatch('AppData/setAppData', parseInt(Math.random() * 100))
</script>

<style scoped lang="scss">
</style>
