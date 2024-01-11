import svelte from 'svelitecms/config/svelte'
import adapter from '@sveltejs/adapter-node'

// adapter config as string..
export default svelte({
    kit: {
        files: {lib: './plugins'},
        adapter: adapter()
    }
})
