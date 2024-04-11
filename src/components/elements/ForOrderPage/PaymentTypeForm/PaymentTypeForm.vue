<template>
	<div class="paymentTypeFormContainer">
		<p class="text-center fw-bold fs-5">
			Payment Type<br />
			Information
		</p>

		<div class="oldPaymentsLoader" v-if="paymentTypes.loading"></div>
		<template v-else>
			<button
				class="toggleButton"
				v-if="!appearCreateForm"
				@click="toggle">
				Create
			</button>
			<button
				class="toggleButton"
				v-if="appearCreateForm"
				@click="toggle">
				Back
			</button>
			<div class="oldPayMentTypes" v-if="!appearCreateForm">
				<p class="fs-bold">Choose a Payment Type</p>
				<select class="form-control" v-model="paymentTypes.selectedId">
					<option
						v-for="(item, i) in paymentTypes.list"
						:key="i"
						:value="item.id">
						{{ item.name }}
					</option>
				</select>
			</div>

			<div class="createForm" v-if="appearCreateForm">
				<p class="fs-bold">Create a new Payment Type</p>
				<div class="text-start">
					<label for="" class="form-label">Name</label>
					<input
						v-model="newPaymentType.name"
						type="text"
						class="form-control"
						placeholder="eg: KBZ pay" />
					<span
						v-if="newPaymentType.errors.emptyName"
						class="text-danger text-start fw-bold"
						>Name cannot be empty!!</span
					>
				</div>

				<button class="btn btn-dark my-3" @click="createPaymentType">Create</button>
				<div class="newPaymentLoader" v-if="newPaymentType.loading"></div>
			</div>
		</template>
	</div>
</template>

<script src="./PaymentTypeForm.js"></script>

<style src="./PaymentTypeForm.css" lang="css" scoped></style>
