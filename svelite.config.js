import AdminPanelPlugin from './plugins/admin'
import {normalizeConfig} from 'svelitecms'

const config = {
    plugins: [
       AdminPanelPlugin({
           pageManagement: false,
           collections: [
               {name: 'Expenses', slug: 'expenses', fields: [
                   {name: 'name', label: 'Name', type: 'plain_text'},
                   {name: 'description', label: 'Description', type: 'plain_text'},
                   {name: 'value', label: 'Value', type: 'number'},
                   {name: 'is_deleted', label: 'Is Deleted', type: 'switch'},

               ]}
           ]
            // admin panel config...
         }),
    ],
    // custom modules
    modules: {
        Header: import('./modules/Header.svelte'),
        HelloWorld: import('./modules/HelloWorld.svelte')
    },
    // custom layouts
    layouts: {},
    pages: [
        {
            slug: '/hello', 
            title: 'Hello', 
            modules: [
                { name: "Header", props: {}},
                {
                    name: 'HelloWorld', 
                    props: {}
                }
            ]
        }
    ],
    api: 'http://localhost:3010/api',
    $ctx: async () => {
        const {createMemoryDb} = await import('svelitecms/db')
        return {
            db: createMemoryDb({})
        }
    }
}

// const conf = await normalizeConfig(config)

export default config
