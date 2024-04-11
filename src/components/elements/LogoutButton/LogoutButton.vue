<template>
	<div>
		<a href="#" :class="prepareClasses" @click="funcLogout">Log out</a>
	</div>
</template>

<script>
export default {
	name: "LogoutButton",
	props: {
		classList: {
			type: Array,
		},
	},
	methods: {
		async funcLogout() {
			this.$store.dispatch("setStorageUser", {});
			this.$store.dispatch("setStorageToken", "");
			localStorage.clear();
			this.$router.push({ name: "LoginView" });
		},
	},
	computed: {
		prepareClasses() {
			return this.classList.join(" ");
		},
	},
};
</script>

<style lang="css" scoped></style>
