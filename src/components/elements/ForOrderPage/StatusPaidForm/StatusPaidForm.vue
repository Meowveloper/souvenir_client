<template>
	<div class="parentContainer">
		<div class="">
			<label for="" class="form-label fw-bold fs-3">Status:</label>
			<select class="form-control" v-model="status" @change="$emit('status', status)">
				<option value="pending">Pending</option>
				<option value="delivered">Delivered</option>
				<option value="reject">Reject</option>
			</select>
		</div>

		<div class="line"></div>
		<div class="">
			<label for="" class="form-label fw-bold fs-3">Paid??:</label>
			<select class="form-control" v-model="paid" @change="$emit('paid', paid)">
				<option value="yes">Yes</option>
				<option value="no">No</option>
			</select>
		</div>
	</div>
</template>

<script src="./StatusPaidForm.js"></script>

<style src="./StatusPaidForm.css" lang="css" scoped></style>
