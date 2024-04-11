import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "LoginView",
		component: () => import("../views/LoginView/LoginView.vue"),
		beforeEnter: (to, from, next) => {
			if (localStorage.getItem('user') && localStorage.getItem('token')) {
				store.dispatch("setStorageUser", JSON.parse(localStorage.getItem('user') || '{}'));
				store.dispatch(
					"setStorageToken",
					JSON.parse(localStorage.getItem("token") || "{}")
				);
				next({ name: 'LayoutView' });
			} else {
				next();
			}
		}
	},

	{
		path: "/souvenir",
		name: "LayoutView",
		component: () => import("../views/LayoutView/LayoutView.vue"),
		beforeEnter: (to, from, next) => {

			if ((localStorage.getItem('user') && localStorage.getItem('token'))) {
				next();
			} else {
				next({ name: "LoginView" });
			}
		},
	},

	{
		path: "/register",
		name: "RegisterView",
		component: () => import("../views/RegisterView/RegisterView.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
