<template>
	<div class="mother text-start">
		<h1>Order ID: {{ allData.id }}</h1>
		<hr />
		<p>
			Customer Name:
			<span class="fw-bold fs-5">{{ allData.customer_name }}</span>
		</p>

		<p>
			Check Out Date:
			<span class="fw-bold">{{ allData.created_at }} </span
			><span class="fw-bold text-primary"
				>({{ allData.howLong }}) ago</span
			>
		</p>

		<p>
			Total: <span class="fw-bold fs-5">{{ allData.total }}</span> Kyats
			(<span class="fw-bold">with {{ allData.payment_type }}</span
			>)
		</p>

		<div class="d-flex gap-2 align-items-center my-3">
			Paid ?:
			<span
				:class="[
					'fw-bold',
					'text-uppercase',
					allData.paid === 'yes' ? 'text-success' : 'text-danger',
				]"
				>{{ allData.paid }}</span
			>

			<select class="form-control w-25" name="" id="" v-model="updateData.paid">
				<option disabled value="">Update</option>
				<option value="yes">Yes</option>
				<option value="no">No</option>
			</select>

			
		</div>

		<div class="d-flex gap-2 align-items-center my-3">
			Status:
			<span
				:class="[
					'fw-bold',
					'text-capitalize',
					allData.status === 'delivered' ? 'text-success' : '',
					allData.status === 'pending' ? 'text-warning' : '',
					allData.status === 'reject' ? 'text-danger' : '',
				]"
				>{{ allData.status }}</span
			>

			<select class="form-control w-25" name="" id="" v-model="updateData.status">
				<option disabled value="">Update</option>
				<option value="pending">Pending</option>
				<option value="delivered">Delivered</option>
				<option value="reject">Reject</option>
			</select>

			
		</div>

		<div>
			<button v-if="showUpdateButton" @click="updateOrder()" class="btn btn-success">
				
				<div v-if="updateData.loading" class="updateButtonLoader"></div>
				<span v-else>Save</span>
			</button>
		</div>

		<div
			v-for="(item, i) in allData.orderProducts"
			:key="i"
			class="d-flex justify-content-between align-items-center gap-1 my-3">
			<div style="width: 15%">
				<img
					:src="`http://localhost:8000/storage/productImages/${item.image}`"
					alt="Product Image"
					height="100px"
					width="100%" />
			</div>
			<div style="">{{ item.product_name }} ({{ item.price }}Ks)</div>
			<div>x</div>
			<div>{{ item.qty }}</div>
			<div>{{ item.price * item.qty }}Ks</div>
		</div>

		<button
			class="btn btn-outline-dark btnClose"
			@click="
				() => {
					closePage();
				}
			">
			Close
		</button>
	</div>
</template>

<script src="./OrderDetails.js"></script>

<style src="./OrderDetails.css" lang="css" scoped></style>
