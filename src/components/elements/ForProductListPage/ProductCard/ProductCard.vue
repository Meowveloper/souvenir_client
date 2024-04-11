<template>
	<template v-if="deleted === false">
		<div v-if="product === undefined"></div>
		<template v-else>
			<div v-if="!showUpdate" class="card" style="width: 46%">
				<img
					:src="`http://127.0.0.1:8000/storage/productImages/${product.image}`"
					class="card-img-top"
					alt=""
					height="200px" />

				<ul
					class="list-group list-group-flush d-flex flex-column align-items-start justify-content-between"
					style="min-height: 190px">
					<li class="list-group-item w-100 text-start fw-bold fs-4">
						{{ product.name }}
					</li>
					<li class="list-group-item w-100 text-start">
						Price:
						<span class="fw-bold">{{ product.price }}</span> Kyats
					</li>
					<li class="list-group-item w-100 text-start">
						Category:
						<span class="fw-bold">{{ product.category_name }}</span>
					</li>
					<li class="list-group-item w-100 text-start">
						In Stock:
						<span :class="instockClassList">{{
							product.instock
						}}</span>
					</li>
				</ul>
				<div class="card-body">
					<button
						class="btn btn-primary me-2"
						@click="showUpdate = true">
						Edit
					</button>
					<button class="btn btn-danger" @click="emitDelete">
						<div class="updateLoader" v-if="deleteLoading"></div>
						<span v-else>Delete</span>
					</button>
				</div>
			</div>

			<div v-else class="card" style="width: 46%">
				<img
					:src="`http://127.0.0.1:8000/storage/productImages/${product.image}`"
					class="card-img-top"
					alt=""
					height="200px" />

				<ul
					class="list-group list-group-flush"
					style="min-height: 190px">
					<li
						class="list-group-item text-start d-flex align-items-center gap-1">
						Image:
						<input
							class="form-control"
							type="file"
							@change="
								(e) => {
									productForUpdate.image = e.target.files[0];
								}
							" />
					</li>
					<li
						class="list-group-item text-start d-flex align-items-center gap-1">
						Name:
						<input
							type="text"
							class="form-control"
							v-model="productForUpdate.data.name" />
					</li>
					<li
						class="list-group-item text-start d-flex align-items-center gap-1">
						Price:
						<input
							type="text"
							class="form-control"
							v-model="productForUpdate.data.price" />
					</li>
					<li
						class="list-group-item text-start d-flex align-items-center gap-1">
						In Stock:
						<input
							type="number"
							class="form-control"
							v-model="productForUpdate.data.instock" />
					</li>
				</ul>
				<div class="card-body">
					<button
						v-if="isValidate"
						class="btn btn-success me-2"
						@click="funcUpdateProduct">
						<div
							class="updateLoader"
							v-if="productForUpdate.loading"></div>
						<span v-else>Save</span>
					</button>
					<button
						class="btn btn-outline-dark"
						@click="
							productForUpdate.data = { ...product };
							showUpdate = false;
						">
						Back
					</button>
				</div>
			</div>
		</template>
	</template>
</template>

<script src="./ProductCard.js"></script>

<style src="./ProductCard.css" lang="css" scoped></style>
