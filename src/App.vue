<template>
	<!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
	<router-view />
</template>

<style>
* {
	margin: 0px;
	padding: 0px;
	scroll-behavior: smooth;
	font-size: small;
}

:root {
	--vividSkyBlue: #23c9ff;
	--mayaBlue: #7cc6fe;
	--periWinkle: #ccd5ff;
	--coralPink: #d88373;
	--teaGreen: #dceab2;

	--first:  #F7EBEC;
	--second: #59656F;
	--third: #e5989b;
	--fourth: #b5838d;
	--fifth: #1D1E2C;
}

button {
	background-color: var(--second);
	color: var(--fifth);
}

p,
span,
strong,
div {
	color: var(--fifth);
}

border {
	border-color: var(--fourth);
}

input {
	padding: 10px 20px;
	background: none;
	border: none;
	outline: none;
	border-radius: 20px;
	color: #59656f;
	transition: 0.5s;
	box-shadow: 2px 2px 10px grey;
}

input::placeholder {
	color: #59656f;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	font-size: small;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
