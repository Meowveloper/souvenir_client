<template>
	<div>
		<h1>Product List Page</h1>

		<div v-if="products.loading" class="mainLoader"></div>

		<div
			v-else
			class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
			<h4 class="text-center my-5" v-if="products.list.length === 0">
				There is no products yet..
			</h4>
			<template v-else>
				<template v-for="(item, i) in products.list" :key="i">
					<ProductCard
						:propsProduct="item"
						v-if="!products.loading"></ProductCard>
				</template>
			</template>
		</div>

		<hr>

		<div class="">
			<ProductForm @need-reload="reLoad" :isOrderPage="false"></ProductForm>
		</div>
	</div>
</template>

<script src="./ProductList.js"></script>

<style src="./ProductList.css" lang="css" scoped></style>
