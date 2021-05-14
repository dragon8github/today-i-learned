<template>
	<div class="home">
		<Hello :name="count" @fuck="clickHandler" />
		<button @click="inc">+</button>
	</div>
</template>

<script setup>
import Hello from '@/components/Hello.vue'

// declaring a variable that compiles to a ref
ref: count = 1

function inc() {
	// the variable can be used like a plain value
	count++
}

// access the raw ref object by prefixing with $
console.log($count.value)

function clickHandler(args) {
	console.log($count.value, args)
}
</script>
