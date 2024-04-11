<template>
	<div class="customerFormContainer">
		<h6>Customer Information</h6>
		<div v-if="oldCustomerLoading" class="oldCustomerLoading"></div>
		<div v-else class="formContainer">
			<template v-if="isOrderPage">
				<button
					class="toggleButton"
					v-if="!appearNewCustomerForm"
					@click="appearNewCustomerForm = !appearNewCustomerForm">
					Create
				</button>
				<button
					class="toggleButton"
					v-else
					@click="appearNewCustomerForm = !appearNewCustomerForm">
					Back
				</button>
				<div class="left" v-if="!appearNewCustomerForm">
					<p>Old Customer??</p>
					<select class="form-control" v-model="orderForm.selectedId">
						<option selected disabled value="">
							Choose from old Customers.
						</option>
						<option
							v-for="(item, i) in customerList"
							:key="i"
							:value="item.id">
							{{ item.name }}
						</option>
					</select>
				</div>
			</template>

			<div class="right" v-if="!isOrderPage || appearNewCustomerForm">
				<p>New Customer??</p>
				<div class="inputGroup">
					<label class="form-label">Name</label>
					<input
						type="text"
						class="form-control"
						placeholder="Name"
						v-model="newCustomer.name" />
					<strong
						v-if="newCustomer.nameRepeat"
						class="invalidMessage text-danger fw-bold smallText"
						>New customer's name cannot be the same with an existing
						customer.</strong
					>
					<strong
						v-if="newCustomer.emptyName"
						class="invalidMessage text-danger fw-bold smallText"
						>Name cannot be empty.</strong
					>
				</div>
				<hr />

				<div class="inputGroup">
					<label class="form-label">Phone</label>
					<input
						type="text"
						class="form-control"
						placeholder="09xxxxxxx"
						v-model="newCustomer.phone" />
					<strong
						v-if="newCustomer.phoneRepeat"
						class="invalidMessage text-danger fw-bold smallText"
						>New customer's phone cannot be the same with an
						existing customer.</strong
					>
					<strong
						v-if="newCustomer.invalidPhNum"
						class="invalidMessage text-danger fw-bold smallText"
						>Phone Number can only contains numerical values and
						"+".</strong
					>
					<strong
						v-if="newCustomer.emptyPhone"
						class="invalidMessage text-danger fw-bold smallText"
						>Phone cannot be empty.</strong
					>
				</div>
				<hr />

				<div class="inputGroup">
					<label class="form-label">Address</label>
					<input
						type="text"
						class="form-control"
						placeholder="Yangon......."
						v-model="newCustomer.address" />
					<strong
						v-if="newCustomer.emptyAddress"
						class="invalidMessage text-danger fw-bold smallText"
						>Address cannot be empty.</strong
					>
				</div>
				<hr />

				<div class="inputGroup">
					<label class="form-label">Fb Profile Link</label>
					<input
						type="text"
						class="form-control"
						placeholder="https://....."
						v-model="newCustomer.fbLink" />
				</div>
				<hr />

				<div class="mt-3">
					<button class="btn btn-dark" @click="createCustomer">
						Create
					</button>
				</div>
				<div class="newCustomerLoading" v-if="newCustomerLoading"></div>
			</div>
		</div>
	</div>
</template>

<script src="./CustomerForm.js"></script>

<style src="./CustomerForm.css" lang="css" scoped></style>
