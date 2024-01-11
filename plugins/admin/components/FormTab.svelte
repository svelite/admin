<script>
    import {TabPanel} from "svelitecms/components";

    let {name, children} = $props()
</script>
<TabPanel {name}>
    {@render children()}
</TabPanel>
