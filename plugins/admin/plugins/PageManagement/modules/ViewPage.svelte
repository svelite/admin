<script context="module">
    export async function load({api, props, params}) {
		const pages = await api
			.db('pages')
			.find()
			.all()
			.then((res) => res.data);

        console.log(pages)
		let page = null;
		for (let pageItem of pages) {
			if (params.slug == pageItem.slug) {
				page = pageItem;
			}

			console.log('SKIP', params.slug, pageItem);
		}

		if (page) {
			return {
				page
			};
		}
		return {};
	}
</script>
<script>
	import { SvModule } from 'svelitecms/components';

	let { modules, data } = $props();

</script>

<svelte:head>
	{#if data.page}
		<title>{data.page.title}</title>
	{/if}
</svelte:head>

{#if data.page}
	{#each data.page.modules as module}
		<SvModule component={modules[module.name].component} properties={module.props} />
	{/each}
{:else}
	Empty Svelite Page
{/if}
