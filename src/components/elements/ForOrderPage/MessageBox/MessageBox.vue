<template>
	<div class="theParent">
		<div class="theMiddle" ref="forPdf">
			<div class="text-black text-start d-flex justify-content-between">
				<h6>Customer name : {{ orderRecord.customer.name }}</h6>
				<span>{{ myanmarDate }}</span>
			</div>
			<div v-if="orderRecord.products.length !== 0" class="cardContainer">
				<div
					class="table-wrapper-scroll-y table-wrapper-scroll-x my-custom-scrollbar">
					<table
						class="table table-dark table-bordered table-striped mb-0">
						<thead>
							<tr>
								<th scope="col" v-if="!togglePdf"></th>
								<th scope="col">Name</th>
								<th scope="col">Price</th>
								<th scope="col">Quantity</th>
								<th scope="col">Total</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(item, i) in orderRecord.products"
								:key="i">
								<th scope="row" v-if="!togglePdf">
									<img
										:src="`http://localhost:8000/storage/productImages/${item.image}`"
										alt="Product Image"
										width="100px"
										height="100px" />
								</th>
								<td>{{ item.name }}</td>
								<td>{{ item.price }} Kyats</td>
								<td>x {{ item.qty }}</td>
								<td>{{ item.qty * item.price }} Kyats</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<p class="text-black text-start mt-1">
				Payment Type: {{ orderRecord.paymentType.name }}
			</p>
			<p class="text-black text-start">
				Status:
				<span :class="classesForStatus">{{ orderRecord.status }}</span>
			</p>
			<p class="text-black text-start">
				Paid??:
				<span :class="classesForPaid">{{ orderRecord.paid }}</span>
			</p>
			<p class="text-black text-start">
				Checkout Total :
				<span class="text-success fs-3">{{ orderRecord.total }}</span>
				Kyats
			</p>
			<button
				v-if="checkOrderValidation && !togglePdf"
				class="btn" style="background-color: var(--second);"
				@click="recordOrder">
				<span style="color: var(--first);" v-if="!orderCreateLoading">Record</span>
				<div v-else class="orderCreateLoader"></div>
			</button>
			<button
				@click="downloadPdf"
				v-if="togglePdf"
				class="btn btn-primary">
				Download PDF
			</button>
		</div>
	</div>
</template>

<script src="./MessageBox.js"></script>

<style src="./MessageBox.css" lang="css" scoped></style>
