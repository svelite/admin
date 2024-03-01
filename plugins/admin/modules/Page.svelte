<script>
	import {setContext} from 'svelte';
    
    import {SvSlot} from 'svelitecms/components';

	import { Button, Icon, Page } from '$plugins/admin/components';

	let { title = '', backUrl = '', content = [], ...data } = $props();

    let pageEl = $state();

    function back() {
        pageEl.back()
    }

    setContext('PAGE', {back})
</script>

<Page bind:this={pageEl} {backUrl} {title}>
    {#snippet actions()}
		{#each data.actions ?? [] as action}
            <Button color={action.color} href={action.href}>
                {#if action.icon}
                    <Icon name={action.icon} />
                {/if}
                {action.text}
            </Button>
		{/each}
        {/snippet}

	{#snippet children()}
		<SvSlot modules={content} />
	{/snippet}
</Page>
