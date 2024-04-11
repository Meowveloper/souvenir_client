<template>
	<div>
		<h1>This is customer List Page</h1>
		<div v-if="customers.loading" class="mainLoader"></div>
		<template v-else>
			<div
				class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
				<template v-for="(item, i) in preparedCustomerList" :key="i">
					<CustomerCard
						v-if="!customers.loading"
						:propsCustomer="item"></CustomerCard>
				</template>
			</div>
		</template>

		<hr />

		<CustomerForm
			:isOrderPage="false"
			@newCustomerCreated="newCustomerCreated"></CustomerForm>
	</div>
</template>

<script src="./CustomerList.js"></script>

<style src="./CustomerList.css" lang="css" scoped></style>
