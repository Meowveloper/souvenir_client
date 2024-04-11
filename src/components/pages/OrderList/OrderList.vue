<template>
	<OrderDetails
		:allData="dataForOrderDetailsPage"
		v-if="showDetailsPage"
		@close-page="closeDetailsPage"
		@reload="closeDetailsAndReload"></OrderDetails>
	<!-- <button
		v-if="showDetailsPage"
		:style="changeToggleButtonStyle"
		class="toggleDetailsPage btn btn-danger"
		@click="showDetailsPage = !showDetailsPage">
		X
	</button> -->
	<div class="mother" v-if="!showDetailsPage">
		<div class="initialLoading" v-if="orders.loading"></div>
		<template v-else>
			<div class="unPaid">
				<h4>Unpaid Orders</h4>
				<div v-if="unpaids.length === 0">
					There is no unpaid orders yet
				</div>
				<div
					v-else
					v-for="(item, i) in unpaids"
					:key="i"
					class="d-flex justify-content-start p-1 gap-2 align-items-center my-2"
					style="border-bottom: 1px solid black">
					<div>
						<span class="fw-bold fs-4">
							{{ item.id }}
						</span>
						.
					</div>

					<div class="text-start" style="width: 20%">
						{{ item.customer_name }}
					</div>
					<div class="text-start" style="width: 20%">
						Total : <br />
						<span class="fw-bold text-success">
							{{ item.total }}
						</span>
					</div>
					<div class="text-start" style="width: 20%">
						Paid: <br />
						<span class="fw-bold text-danger text-capitalize">{{
							item.paid
						}}</span>
					</div>

					<div class="text-start" style="width: 20%">
						{{ item.created_at }} <br />
						<span class="text-danger fw-bold"
							>({{ item.howLong }} ago)</span
						>
					</div>

					<button
						@click="
							() => {
								generateDetails(item);
							}
						"
						class="btn btn-dark"
						title="Show Details">
						<i class="bi bi-file-earmark-text-fill"></i>
					</button>
				</div>
			</div>
			<hr>
			<div class="paid">
				<h4>Paid Orders</h4>
				<div v-if="paids.length === 0">
					There is no paid orders yet.
				</div>
				<div
					v-else
					v-for="(item, i) in paids"
					:key="i"
					class="d-flex justify-content-start p-1 gap-2 align-items-center my-2"
					style="border-bottom: 1px solid black">
					<div>
						<span class="fw-bold fs-4">
							{{ item.id }}
						</span>
						.
					</div>

					<div class="text-start" style="width: 20%">
						{{ item.customer_name }}
					</div>
					<div class="text-start" style="width: 20%">
						Total : <br />
						<span class="fw-bold text-success">
							{{ item.total }}
						</span>
					</div>
					<div class="text-start" style="width: 20%">
						Paid: <br />
						<span class="fw-bold text-success text-capitalize">{{
							item.paid
						}}</span>
					</div>

					<div class="text-start" style="width: 20%">
						{{ item.created_at }} <br />
						<span class="text-danger fw-bold"
							>({{ item.howLong }} ago)</span
						>
					</div>

					<button
						@click="
							() => {
								generateDetails(item);
							}
						"
						class="btn btn-dark"
						title="Show Details">
						<i class="bi bi-file-earmark-text-fill"></i>
					</button>
				</div>
			</div>
		</template>
	</div>
</template>

<script src="./OrderList.js"></script>

<style src="./OrderList.css" lang="css" scoped></style>
