<template>
	<div class="bg-white p-2 rounded-2 shadow" style="width: 45%">
		<div v-if="!forUpdate.show" ref="testing">
			<template
				v-for="[key, value] in Object.entries(customer)"
				:key="key">
				<p
					class="text-start py-1"
					style="border-bottom: 1px solid grey">
					<span class="text-capitalize">{{
						key.split("_").join(" ")
					}}</span>
					<br />
					<span class="fw-bold fs-5">{{
						value == null ? "No data" : value
					}}</span>
				</p>
			</template>

			<button class="btn btn-primary" @click="forUpdate.show = true">
				Edit
			</button>
		</div>

		<div v-else style="min-height: 418px">
			<div class="inputGroup text-start">
				<label>Id</label>
				<input
					disabled
					type="text"
					class="form-control"
					v-model="forUpdate.data.id" />
			</div>
			<hr />
			<div class="inputGroup text-start">
				<label>Name</label>
				<input
					type="text"
					class="form-control"
					v-model="forUpdate.data.name" />
			</div>
			<hr />
			<div class="inputGroup text-start">
				<label>Phone</label>
				<input
					type="text"
					class="form-control"
					v-model="forUpdate.data.phone" />
			</div>
			<hr />
			<div class="inputGroup text-start">
				<label>Address</label>
				<input
					type="text"
					class="form-control"
					v-model="forUpdate.data.address" />
			</div>
			<hr />
			<div class="inputGroup text-start">
				<label>Fb Account Link</label>
				<input
					type="text"
					class="form-control"
					v-model="forUpdate.data.fb_account_link" />
			</div>
			<hr />

			<button class="btn btn-success me-1" @click="update">
				<div class="loader" v-if="forUpdate.loading"></div>
				<span v-else>Save</span>
			</button>
			<button
				class="btn btn-outline-dark"
				@click="forUpdate.show = false">
				Back
			</button>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "CustomerCard",

	props: {
		propsCustomer: {
			type: Object,
		},
	},

	//-----------------------------------

	data() {
		return {
			customer: this.propsCustomer,

			forUpdate: {
				data: {},
				loading: false,
				show: false,
			},
		};
	},

	//---------------------------------------------

	methods: {
		async update() {
			this.forUpdate.loading = true;
			await axios
				.post(
					"http://127.0.0.1:8000/api/customer/update",
					this.forUpdate.data
				)
				.then((response) => {
					console.log(response);
					this.customer = { ...this.forUpdate.data };
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					this.forUpdate.loading = false;
					this.forUpdate.show = false;
				});
		},
	},

	//----------------------------------------

	mounted() {
		this.customer = { ...this.propsCustomer };
		this.forUpdate.data = { ...this.customer };
		console.log(this.$refs.testing.offsetHeight);
	},
};
</script>

<style lang="css" scoped>
/* HTML: <div class="loader"></div> */
.loader {
	width: 40px;
	height: 12px;
	--c: #000 50%, #0000 0;
	background: linear-gradient(90deg, var(--c)) 0 0%,
		linear-gradient(-90deg, var(--c)) 0 50%,
		linear-gradient(90deg, var(--c)) 0 100%;
	background-size: 8px calc(100% / 3);
	background-repeat: repeat-x;
	animation: l8 0.25s infinite linear;
}
@keyframes l8 {
	100% {
		background-position: -8px 0%, -8px 50%, -8px 100%;
	}
}
</style>
