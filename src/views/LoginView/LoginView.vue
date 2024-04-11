<template>
	<div class="loginContainer">
		<div class="formContainer">
			<img class="loginLogo" src="/loginLogo.jpg" alt="Logo" />
			<h3 class="fw-bolder">Login</h3>
			<div class="inputGroup">
				<label>Email</label>
				<input
					type="email"
					placeholder="example@gmail.com"
					v-model="email"
					@keyup.enter="
						() => {
							this.$refs.password.focus();
						}
					" />
				<small v-if="loginErrors.noUser"
					>There is no account that matched to this email
					address!!</small
				>
			</div>

			<div class="inputGroup">
				<label>Password</label>
				<input
					type="password"
					placeholder="***********"
					v-model="password"
					ref="password"
					@keyup.enter="funcLogin" />
				<small v-if="loginErrors.wrongPassword"
					>Incorrect Password!!</small
				>
			</div>

			<div class="buttonGroup">
				<button @click="(e) => funcLogin(e)">Login</button>
				<div class="loader" v-if="loadingStatus"></div>
			</div>

			<div class="registerGroup">
				<span>Does not have an account?</span>
				<a href="/register">Register</a>
			</div>
		</div>
	</div>
</template>

<script src="./loginView.js"></script>

<style src="./loginView.css" lang="css" scoped></style>
