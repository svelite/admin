<script>
    import {TabPanel} from "$plugins/admin/components";

    let {name, children} = $props()
</script>
<TabPanel {name}>
    {@render children()}
</TabPanel>
