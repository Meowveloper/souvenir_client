<template>
	<div>
		<div v-if="!changePassword.showForm" class="formContainer p-3">
			<div class="text-start">
				<label for="" class="form-label"> Name </label>
				<input
					type="text"
					class="form-control"
					v-model="userForUpdate.data.name"
					@keyup="watchUpdate" />
				<small
					v-if="userForUpdate.errors.emptyName"
					class="text-danger fw-bold"
					>Name Cannot be Empty..</small
				>
			</div>
			<hr />

			<div class="text-start">
				<label for="" class="form-label">Email</label>
				<input
					type="email"
					class="form-control"
					v-model="userForUpdate.data.email"
					@keyup="watchUpdate" />
				<small
					v-if="userForUpdate.errors.emptyEmail"
					class="text-danger fw-bold"
					>Email Cannot be Empty..</small
				>
			</div>
			<hr />

			<div class="text-start">
				<label for="" class="form-label">Role</label>
				<input
					class="form-control"
					type="text"
					v-model="userForUpdate.data.role"
					disabled />
			</div>
			<hr />

			<div>
				<button
					@click="updateUser"
					v-if="
						showUpdateButton &&
						!userForUpdate.errors.emptyName &&
						!userForUpdate.errors.emptyEmail
					"
					class="btn btn-success me-2">
					<div
						v-if="userForUpdate.loading"
						class="updateLoader"></div>
					<span v-else>Update</span>
				</button>
				<button
					@click="userForUpdate.data = { ...user }; showUpdateButton = false;"
					v-if="showUpdateButton"
					class="btn btn-outline-secondary me-2">
					Reset
				</button>
				<button
					class="btn" style="background-color: var(--second); color: var(--first);"
					@click="changePassword.showForm = true">
					Change Password
				</button>
			</div>
		</div>

		<div v-else class="changePasswordContainer p-3">
			<div class="text-start">
				<label for="">Old Password</label> <br />
				<input
					type="password"
					class="form-control"
					v-model="changePassword.oldPassword" />
				<strong
					class="text-danger"
					v-if="changePassword.wrongOldPassword"
					>Incorrect Old Password</strong
				>
			</div>
			<hr />

			<div class="text-start">
				<label for="">New Password</label> <br />
				<input
					type="password"
					class="form-control"
					@keyup="checkChangePasswordValidation"
					v-model="changePassword.newPassword" />
				<strong
					class="text-danger"
					v-if="changePassword.shortNewPassword"
					>Password must be at least 8 characters.</strong
				>
				<br />
				<strong
					class="text-danger"
					v-if="changePassword.weakNewPassword"
					>Password must contain at least one number.</strong
				>
			</div>
			<hr />

			<div class="text-start">
				<label for="">Confirm Password</label> <br />
				<input
					type="password"
					class="form-control"
					@keyup="checkChangePasswordValidation"
					v-model="changePassword.confirmPassword" />
				<strong
					class="text-danger"
					v-if="changePassword.wrongConfirmPassword"
					>Confirm Password must be the same with New
					Password.</strong
				>
			</div>
			<hr />

			<button
				v-if="showChangePasswordButton"
				@click="updatePassword"
				class="btn btn-primary me-2">
				<div
					v-if="changePassword.loading"
					class="changePasswordLoader"></div>
				<span v-else>Change Password</span>
			</button>

			<button
				class="btn btn-outline-dark"
				@click="changePassword.showForm = false">
				Back
			</button>
		</div>
	</div>
</template>

<script src="./ProfilePage.js"></script>

<style lang="css" scoped>
.formContainer {
	width: 60%;
	margin: 50px auto;
	@media screen and (max-width: 430px) {
		width: 95%;
	}
}

.changePasswordContainer {
	width: 95%;
	margin: 50px auto;
	@media screen and (min-width: 431px) {
		width: 60%;
	}
}

/* HTML: <div class="loader"></div> */
.updateLoader {
	width: 50px;
	aspect-ratio: 1;
	border-radius: 50%;
	animation: l11 2s infinite;
}
@keyframes l11 {
	0% {
		background: conic-gradient(#f03355 0, #0000 0);
	}
	12.5% {
		background: conic-gradient(#f03355 45deg, #0000 46deg);
	}
	25% {
		background: conic-gradient(#f03355 90deg, #0000 91deg);
	}
	37.5% {
		background: conic-gradient(#f03355 135deg, #0000 136deg);
	}
	50% {
		background: conic-gradient(#f03355 180deg, #0000 181deg);
	}
	62.5% {
		background: conic-gradient(#f03355 225deg, #0000 226deg);
	}
	75% {
		background: conic-gradient(#f03355 270deg, #0000 271deg);
	}
	87.5% {
		background: conic-gradient(#f03355 315deg, #0000 316deg);
	}
	100% {
		background: conic-gradient(#f03355 360deg, #0000 360deg);
	}
}

/* HTML: <div class="loader"></div> */
.changePasswordLoader {
	width: 60px;
	aspect-ratio: 2;
	--_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
	background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
	background-size: calc(100% / 3) 50%;
	animation: l3 1s infinite linear;
}
@keyframes l3 {
	20% {
		background-position: 0% 0%, 50% 50%, 100% 50%;
	}
	40% {
		background-position: 0% 100%, 50% 0%, 100% 50%;
	}
	60% {
		background-position: 0% 50%, 50% 100%, 100% 0%;
	}
	80% {
		background-position: 0% 50%, 50% 50%, 100% 100%;
	}
}
</style>
