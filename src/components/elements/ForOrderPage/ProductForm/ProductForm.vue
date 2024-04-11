<template>
	<div class="Container">
		<h6>Product Information</h6>
		<div class="oldProductLoading" v-if="this.oldProducts.loading"></div>
		<div class="productFormContainer" v-else>
			<template v-if="isOrderPage">
				<button
					class="toggleButton"
					v-if="!appearProductForm"
					@click="appearProductForm = !appearProductForm">
					Create
				</button>
				<button
					class="toggleButton"
					v-else
					@click="appearProductForm = !appearProductForm">
					Back
				</button>
			</template>
			<template v-if="!appearProductForm && isOrderPage">
				<div class="left">
					<p>Choose a Product</p>
					<div>
						<select
							class="form-control"
							ref="oldProducts"
							v-model="oldProducts.selectedId"
							@change="oldProducts.selectedProductQty = 1">
							<option disabled value="">Choose an product</option>
							<option
								v-for="(item, i) in oldProducts.list"
								:key="i"
								:value="item.id">
								{{ item.name }}
							</option>
						</select>
						<div class="quantityContainer">
							<div class="">
								<span
									class="btn btn-danger"
									@click="oldProducts.selectedProductQty--"
									>-</span
								>

								<input
									type="number"
									class="form-control"
									style="width: 50px"
									v-model="oldProducts.selectedProductQty" />
								<span
									class="btn btn-success"
									@click="oldProducts.selectedProductQty++"
									>+</span
								>
							</div>
						</div>
					</div>
					<button
						class="btn btn-outline-dark mt-3"
						@click="addProductToOrder">
						Add
					</button>
				</div>

				<div class="productList my-4" ref="productList">
					<template
						v-for="(item, i) in productsForOrder.list"
						:key="i">
						<div class="card p-3" style="width: 45%">
							<img
								class="card-img-top rounded"
								:src="`http://localhost:8000/storage/productImages/${item.image}`"
								alt="Product Image"
								height="100px" />
							<div class="card-body">
								<div
									class="card-title d-flex justify-content-center align-items-center gap-1">
									<span class="fw-bold"
										>"{{ item.name }}"</span
									><span class="text-muted">x</span>
									<input
										type="number"
										class="form-control"
										style="width: 35px"
										v-model="item.qty"
										@change="
											$emit(
												'products',
												this.productsForOrder.list
											)
										" />
								</div>

								<p class="card-text">
									{{ item.description }}
								</p>
								<a
									@click="productsForOrder.list.splice(i, 1)"
									href="#"
									class="btn btn-outline-danger"
									>Remove</a
								>
							</div>
						</div>
					</template>
				</div>
			</template>

			<div v-else class="right">
				<p v-if="isOrderPage">New Product??</p>
				<p v-else>Create New Product</p>

				<div class="inputGroup">
					<label class="form-label">Product Name</label>
					<input
						type="text"
						class="form-control"
						placeholder="Name"
						v-model="newProduct.name" />
					<strong
						v-if="newProduct.errors.repeatName"
						class="invalidMessage text-danger fw-bold smallText"
						>New product's name cannot be the same with an existing
						product.</strong
					>
					<strong
						v-if="newProduct.errors.emptyName"
						class="invalidMessage text-danger fw-bold smallText"
						>Name cannot be empty.</strong
					>
				</div>
				<hr />

				<div class="inputGroup">
					<label class="form-label">Price</label>
					<input
						type="number"
						class="form-control"
						placeholder="Price"
						v-model="newProduct.price" />

					<strong
						v-if="newProduct.errors.emptyPrice"
						class="invalidMessage text-danger fw-bold smallText"
						>Price cannot be empty.</strong
					>
				</div>
				<hr />

				<div class="inputGroup">
					<label for="" class="form-label">Category</label>
					<select
						class="form-control"
						v-model="newProduct.categoryId">
						<option disabled value="">Choose category</option>
						<option
							v-for="(item, i) in categories.list"
							:key="i"
							:value="item.id">
							{{ item.name }}
						</option>
					</select>

					<div class="newCategory">
						<label for="" class="form-label"
							>Create New Category</label
						>
						<input
							type="text"
							class="form-control mb-3"
							placeholder="Category Name"
							v-model="newCategory.name" />
						<strong
							v-if="newCategory.errors.emptyName"
							class="invalidMessage text-danger fw-bold smallText"
							>Category cannot be empty.</strong
						>
						<input
							type="text"
							class="form-control"
							placeholder="Description"
							v-model="newCategory.description" />

						<button
							class="btn mt-3" style="border: 1px solid var(--fourth)"
							@click="createCategory">
							Create
						</button>
					</div>
				</div>
				<hr />

				<div class="inputGroup">
					<label class="form-label">Image</label>
					<input
						type="file"
						class="form-control"
						@change="
							(e) => {
								getImage(e);
							}
						" />
					<strong
						v-if="newProduct.errors.invalidImage"
						class="invalidMessage text-danger fw-bold smallText"
						>Image's file type is invalid.</strong
					>
					<strong
						v-if="newProduct.errors.emptyImage"
						class="invalidMessage text-danger fw-bold smallText"
						>Image cannot be empty.</strong
					>
				</div>
				<hr />

				<div class="inputGroup">
					<label class="form-label">In stock</label>
					<input
						type="number"
						class="form-control"
						v-model="newProduct.instock" />
					<strong
						v-if="newProduct.errors.emptyInstock"
						class="invalidMessage text-danger fw-bold smallText"
						>Image cannot be empty.</strong
					>
				</div>
				<hr />

				<div class="inputGroup">
					<label class="form-label">Description</label>
					<textarea
						type="text"
						class="form-control"
						placeholder="Description"
						v-model="newProduct.description"></textarea>
				</div>

				<div class="mt-3">
					<button class="btn btn-dark" @click="createProduct">
						Create
					</button>
				</div>

				<div class="newProductLoader" v-if="newProduct.loading"></div>
			</div>
		</div>
	</div>
</template>

<script src="./ProductForm.js"></script>

<style src="./ProductForm.css" lang="css" scoped></style>
