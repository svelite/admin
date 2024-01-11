import { AdminPanelPlugin } from './plugins'

async function folderBasedModules(files = []) {
    let modules = {}

    for(let file of files) {
        const module = await import(`./modules/${file}.svelte`)
        
        modules[file] = {
            name: file,
            description: 'todo',
            component: module.default
        }

        try {
            const meta = await import(`./modules/${file}.js`)
            if(meta.default) {
                modules[file].name = meta.default.name
                modules[file].description = meta.default.description
            }

        } catch(err) {
            // 
        }
    }
    
    return {
        modules
    }
}

export default {
    plugins: [
       AdminPanelPlugin({
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

    },
    // custom layouts
    layouts: {},
    pages: [
        {
            slug: 'hello', 
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
