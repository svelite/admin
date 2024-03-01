<script context="module">
	export async function load({props, api, params}) {
		let result: any = {};
		console.log(props, params);

		if (props.load) {
			const [collection, field, op, val] = props.load.split(':');

			const value = await api(`/api/content/${collection}/query`)
				.post({
                    filters: {
                        fields: {
                            field: field,
                            operator: op,
                            value: val
                        }, 
                        operator: op, 
                        value: params[val]
                    }
                }).then((res) => res.data[0]);

                console.log(value)
			result.value = value;
		}

		if (props.submit) {
			result.submit = async (newValue) => {
				const [collection, action] = props.submit.action.split(':');
				await api(`/api/content/${collection}/${action}`).post(newValue);

				return true;
			};
		}

        result.upload = api.upload
        result.file = api.file

		return result;
	}
</script>
<script lang="ts">
	import {getContext, onMount} from 'svelte';

    import {Button, Card, CardBody, Tabs, TabPanel} from '$plugins/admin/components';

    import Form from '../components/Form.svelte'
    import FormTab from '../components/FormTab.svelte'
	import AppFormField from '../components/AppFormField.svelte';

	let { data, load, tabs = [], goBack = false, submit, fields, actions, params, ...rest } = $props();

	let value: any = $state(data.value ?? {});
    let loading = $state(true)

    const {back} = getContext('PAGE')

	async function onSubmit(e) {
		e.preventDefault();

		if (data.submit) {
			data.submit(value);

            if(goBack) {
                back()
            }
		}
	}

    onMount(() => {
        loading = false

    })

</script>

<Form onsubmit={onSubmit} {loading}>
    {#each tabs ?? [] as tab}
        <TabPanel name={tab}>
            {#each fields.filter(x => x.tab === tab || (tab === 'General' && !x.tab)) as field}
                <AppFormField upload={data.upload} file={data.file} {field} bind:value={value[field.name]} />
            {/each}

        </TabPanel>
    {:else}
        <CardBody>
            {#each fields.filter(x => !x.tab) as field}
                <AppFormField upload={data.upload} file={data.file} {field} bind:value={value[field.name]} />
            {/each}
        </CardBody>
    {/each}

    {#snippet footer()}
        <div class="flex justify-end gap-2 ms-auto">
            {#each actions ?? [] as action}
                {#if action === 'cancel'}
                    <Button type="button" onclick={() => history.back()}>Cancel</Button>
                {:else}
                    <Button color={action.color} type="button">
                        {action.text}
                    </Button>
                {/if}
            {/each}
            {#if submit}
                <Button color="primary" type="submit">
                    {submit.text}
                </Button>
            {/if}
        </div>
    {/snippet}
</Form>
