<script>
	import PageHeader from './PageHeader.svelte';
	import Base from '../Base/Base.svelte';

    // let backUrl = $state('')

	let {
		title = '',
		actions,
        backUrl = '',
		children,
		container = true,
		theme = 'light',
		dir = 'ltr',
		...restProps
	} = $props();

    // TODO: 
    /* afterNavigate(({from, to}) => {
        if(from?.url.href !== to.url.href)
        backUrl = from.url.href
    })*/

    export function back() {
        // goto(backUrl)
    }

</script>

<Base
	tag="div"
	classes="{theme === 'dark'
		? 'dark'
		: ''} overflow-auto p-3 h-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
	{dir}
	{...restProps}
>
	{#if container}
		<div class="mx-auto container">
			{#if title || actions}
                <PageHeader children={actions} {title} backUrl={backUrl ? backUrl.startsWith('/') ? backUrl : '/' + backUrl : ''}/>
			{/if}
			{@render children()}
		</div>
	{:else}
		{#if title || actions}
            <PageHeader children={actions} {title} backUrl={backUrl ? backUrl.startsWith('/') ? backUrl : '/' + backUrl : ''}/>
		{/if}
		{@render children()}
	{/if}
</Base>

<style>
	:global(html) {
		height: 100%;
	}

	:global(body) {
		height: 100%;
	}
	:global(*) {
		margin: 0;
		box-sizing: border-box;
	}
</style>
