<script lang="ts">
	import Form from "$lib/admin/components/Form.svelte";
	import FormTab from "$lib/admin/components/FormTab.svelte";

	import {Input, Button, ButtonGroup, FormField} from "svelitecms/components";

    let {data, collections} = $props()

    let value: any = {}
</script>

