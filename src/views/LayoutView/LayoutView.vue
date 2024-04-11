<template>
	<header ref="mainHeader">
		<div class="logo">Souvenir</div>

		<div class="dropDownContainer">
			<div class="dropdown">
				<button
					class="btn btn-secondary dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false">
					<i class="bi bi-list"></i>
				</button>
				<ul class="dropdown-menu">
					<li>
						<a
							class="dropdown-item"
							href="#"
							@click="currentPageComponent = 'OrderList'"
							>Order List & Details</a
						>
					</li>
					<li>
						<a
							class="dropdown-item"
							href="#"
							@click="currentPageComponent = 'CreateOrder'"
							>Record a New Order</a
						>
					</li>
					<li>
						<a
							class="dropdown-item"
							href="#"
							@click="currentPageComponent = 'ProductList'"
							>Products</a
						>
					</li>
					<li>
						<a
							class="dropdown-item"
							href="#"
							@click="currentPageComponent = 'CustomerList'"
							>Customers</a
						>
					</li>
				</ul>
			</div>
		</div>
		<div class="dropdown profileDropDown">
			<button
				class="btn btn-secondary dropdown-toggle"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false">
				{{ user.name }}
			</button>
			<ul class="dropdown-menu">
				<li>
					<a @click="currentPageComponent = 'ProfilePage'" href="#" class="dropdown-item">Your Profile</a>
				</li>

				<li>
					<LogoutButton :classList="['dropdown-item']"></LogoutButton>
				</li>
			</ul>
		</div>
	</header>

	<main>
		<component :is="currentPageComponent"></component>
	</main>

	<footer>This is footer</footer>
</template>

<script src="./LayoutView.js"></script>

<style src="./LayoutView.css" lang="css" scoped></style>
