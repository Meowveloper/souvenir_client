<template>
	<div class="container-sm p-3">
		<div class="">
			<h3>You can record the information of each order in this page.</h3>
			<hr />
			<div class="customerFormContainer my-5">
				<CustomerForm
					@customer-id="
						(id) => {
							getCustomer(id);
						}
					"
					data-aos="fade-up-right"
					data-aos-duration="2000"></CustomerForm>
			</div>

			<div class="ProductFormContainer my-5">
				<ProductForm
					data-aos="fade-up-left"
					data-aos-duration="2000"
					@products="getProductsForOrder"></ProductForm>
			</div>

			<div class="PaymentTypeFormContainer my-5">
				<PaymentTypeForm
					@payment-type-id="getPaymentType"
					data-aos="fade-up-right"
					data-aos-duration="2000"></PaymentTypeForm>
			</div>

			<div class="PaymentTypeFormContainer my-5">
				<StatusPaidForm
					@status="getStatus"
					@paid="getPaid"
					data-aos="fade-up-left"
					data-aos-duration="2000"></StatusPaidForm>
			</div>

			<button @click="toggleMessageBox" v-if="appearMessageBox" class="closeMessageBox btn btn-dark">X</button>

			<MessageBox v-if="appearMessageBox" :orderRecord="orderRecord"></MessageBox>
			<button class="btn btn-outline-success" @click="toggleMessageBox">
				Done
			</button>
		</div>
	</div>
</template>

<script src="./CreateOrder.js"></script>

<style src="./CreateOrder.css" lang="css" scoped></style>
