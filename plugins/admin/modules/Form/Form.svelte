<script lang="ts">
	import { goto } from '$app/navigation';
	import {getContext} from 'svelte';

    import {Button, Card, CardBody, Tabs, TabPanel} from 'svelitecms/components';

    import Form from '../../components/Form.svelte'
    import FormTab from '../../components/FormTab.svelte'
	import AppFormField from '../../components/AppFormField.svelte';

	let { data, load, tabs = [], goBack = false, submit, fields, actions, params, ...rest } = $props();

	let value: any = $state(data.value ?? {});

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

</script>

<Form onsubmit={onSubmit}>
    {#each tabs ?? [] as tab}
        <TabPanel name={tab}>
            {#each fields.filter(x => x.tab === tab || (tab === 'General' && !x.tab)) as field}
                <AppFormField upload={data.upload} file={data.file} {field} bind:value={value[field.name]} />
            {/each}

        </TabPanel>
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
