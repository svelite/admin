import Login from './Login.svelte';

export default {
	name: 'Login',
	description: 'Login Page',
	component: Login,
	props: {},
	load(props, api) {
		return {
			login(body) {
				return api.auth.login(body);
			}
		};
	}
};
