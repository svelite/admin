<script context="module">

    export async function load({api}) {
		return {
			login(body) {
				return api.auth.login(body);
			}
		};
	}
</script>
<script>
	import { Button, ButtonGroup, Card, CardBody, CardHeader, FormField, Input } from '$plugins/admin/components';

	let request = $state({});

	let { data } = $props();
</script>

<Card>
	<form onsubmit={() => data.login(request)}>
		<CardHeader title="Login" />
		<CardBody>
			<FormField label="Username">
				<Input name="username" bind:value={request.username} />
			</FormField>
			<FormField label="Password">
				<Input type="password" name="password" bind:value={request.password} />
			</FormField>
			<ButtonGroup>
				<Button color="primary" class="px-10 ms-auto" size="lg" type="submit">Login</Button>
			</ButtonGroup>
		</CardBody>
	</form>
</Card>
