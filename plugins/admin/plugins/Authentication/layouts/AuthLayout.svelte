<script>
	import styles from './AuthLayout.css?url'
</script>
<svelte:head>
	<link rel="stylesheet" href={styles}>
</svelte:head>
<div class="h-screen p-4 flex items-start py-20 justify-center bg-gray-50 dark:bg-gray-900">
	<div class="w-full max-w-md">
        <slot/>
	</div>
</div>
