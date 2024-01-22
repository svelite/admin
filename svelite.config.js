import { AdminPanelPlugin } from './plugins/admin/plugin'
import Header from './modules/Header.svelte'
import HelloWorld from './modules/HelloWorld.svelte'

export default {
    plugins: [
       AdminPanelPlugin({
           pageManagement: false,
           collections: [
               {name: 'Books', slug: 'books', fields: [
                   {name: 'title', label: 'Title', type: 'plain_text'},
                   {name: 'genre', label: 'Genre', type: 'plain_text'},
                   {name: 'content', label: 'Content', type: 'rich_text', visibility: {
                       list: false,

                   }, tab: 'Content'},
               ]}
           ]
            // admin panel config...
         }),
    ],
    // custom modules
    modules: {
        Header,
        HelloWorld
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
    api: 'http://localhost:3010/api'
}
