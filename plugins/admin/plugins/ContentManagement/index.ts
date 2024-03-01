import { table, form, page } from "../../helpers/index.js";

export default (config: any) => {
    const collections = config.collections ?? []
    const adminPrefix = config.adminPrefix ?? 'admin'
    const pages: any[] = []

    for (let collection of collections) {

        if (collection.slug.startsWith('_')) {
            continue;
        }

        config.layout.props.sidebar.push({
            icon: collection.icon ?? 'database',
            href: '/admin/content/' + collection.slug,
            title: collection.name,
            visible: collection.sidebar
        });

        const collectionFormFields = collection.fields.map((x) => ({ label: x.name, ...x }));

        const collectionTableFields = collection.fields.filter(x => x.visibility?.list !== false).map((x) => {

            if (!x.label) x.label = x.name;

            if (x.type === 'plain_text' || x.type === 'number' || x.type === 'switch') {
                x.type = 'text';
            }

            if (x.type === 'select') {
                x.type = 'badge';
            }

            return x;
        });

        const tabs: any[] = [];
        let hasTab = collection.fields.some(x => !!x.tab)
        let hasGeneralTab = collection.fields.some(x => !x.tab)

        if (hasTab) {
            if (hasGeneralTab) tabs.push('General')

            collection.fields.map(x => {
                if (x.tab) {
                    if (!tabs.includes(x.tab)) {
                        tabs.push(x.tab)
                    }
                }
            })
        }

        const contentListPage = {
            slug: 'admin/content/' + collection.slug,
            title: collection.name,
            layout: config.layout,
            modules: [
                page({
                    title: collection.name,
                    backUrl: '',
                    actions: [
                        {
                            text: 'Add New Item',
                            color: 'primary',
                            icon: 'plus',
                            href: '/admin/content/' + collection.slug + '/create'
                        }
                    ],
                    content: [
                        table(collection.slug, collectionTableFields, [
                            'remove',
                            {
                                color: 'primary',
                                icon: 'edit',
                                href: '/admin/content/' + collection.slug + '/{id}'
                            }
                        ])
                    ]
                })
            ]
        };

        console.log({ collectionFormFields })

        const contentCreatePage = {
            slug: adminPrefix + '/content/' + collection.slug + '/create',
            title: 'Add ' + collection.name,
            layout: config.layout,
            modules: [
                page({
                    title: 'Add ' + collection.name,
                    backUrl: adminPrefix + '/content/' + collection.slug,
                    actions: [],
                    content: [
                        form(collectionFormFields, ['cancel'], {
                            color: 'primray',
                            action: collection.slug + ':insert',
                            text: 'Create',
                        }, '', true, [])
                    ],
                })
            ]
        };
        const contentUpdatePage = {
            slug: 'admin/content/' + collection.slug + '/:id',
            title: 'Update ' + collection.name,
            layout: config.layout,
            modules: [
                page({
                    title: 'Update ' + collection.name,
                    actions: [],
                    backUrl: adminPrefix + '/content/' + collection.slug,
                    content: [
                        form(
                            collectionFormFields,
                            [],
                            {
                                color: 'primray',
                                action: collection.slug + ':update',
                                text: 'Update'
                            },
                            collection.slug + ':id:=:id',
                            true,
                            tabs
                        )
                    ],
                })
            ]
        };
        pages.push(contentListPage);
        pages.push(contentCreatePage);
        pages.push(contentUpdatePage);
    }

    return {
        pages,
        $routes: {
            async 'api/content/:collection/insert'(req) {
                const { db, body, params: { collection } } = req

                const result = await db(collection).insert(body)

                return {
                    body: {result},
                    status: 200,
                    headers: {}
                }
            },
            async 'api/content/:collection/update'(req) {
                const { db, body, params: { collection } } = req

                const result = await db(collection).update(body)

                return {
                    body: {result},
                    status: 200,
                    headers: {}
                }
            },
            async 'api/content/:collection/remove'(req) {
                const { db, body, params: { collection } } = req

                const result = await db(collection).remove(body.id)

                return {
                    body: {result},
                    status: 200,
                    headers: {}
                }
            },
            async 'api/content/:collection/query'(req) {
                const { db, body, params: { collection } } = req

                // filters, ...
                const result = await db(collection).query(body)

                return {
                    body: result,
                    status: 200,
                    headers: {}
                }
            },
        }
    }
}
