<script lang="ts">
    import {Tabs} from "svelitecms/components";

    let {children, footer, ...rest} = $props()

    let tabs = $state([])
</script>


<form {...rest}>
    <Tabs bind:tabs>
        {@render children()}
        
        <div class="p-3 flex justify-end">
            {@render footer()}
        </div>
    </Tabs>
</form>
