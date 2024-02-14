import AuthenticationPlugin from './plugins/Authentication'
import AdminDashboardPlugin from './plugins/AdminDashboard'
import PageManagementPlugin from './plugins/PageManagement'
import ContentManagementPlugin from './plugins/ContentManagement'
import ContentTypeBuilderPlugin from './plugins/ContentTypeBuilder'

export function getAdminLayout(config: any) {
    return {
        name: 'AdminLayout',
        props: {
            logo: config.logo ?? 'logo.png',
            theme: config.theme ?? 'dark',
            dir: config.dir ?? 'ltr',
			sidebar: [{ title: 'Home', href: '/admin', icon: 'home' }]
        }
    } }

export default function AdminPanelPlugin(config: any) {
    let plugins = []

    let collections = config.collections ?? []

    let layout = getAdminLayout(config)
    let adminPrefix = config.adminPrefix ?? 'admin'

	if (config.contentTypeManagement !== false) {
		// build dynamic tables (collections + custom tables)...
		// and dynamic routes for
        const contentTypeBuilderConfig = {
            layout,
            adminPrefix,
        }

        plugins.push(ContentTypeBuilderPlugin(contentTypeBuilderConfig))
	}


	if (config.dashboard !== false) {
        const adminDashboardConfig = {
            layout,
            adminPrefix,
        }

        plugins.push(AdminDashboardPlugin(adminDashboardConfig))
	}

	if (config.auth !== false) {
        const contentManagementConfig = {
            layout,
            adminPrefix,
            collections: config.collections
        }

        plugins.push(ContentManagementPlugin(contentManagementConfig))
    }

	if (config.pageManagement !== false) {
        const pageManagementConfig = {
            layout,
            adminPrefix,
            uiModules: config.modules ?? {}
        }

        plugins.push(PageManagementPlugin(pageManagementConfig))
	}

	if (config.auth !== false) {
        const authenticationConfig = {
            layout,
            adminPrefix,
            authPrefix: config.authPrefix,
            collections: config.collections
        }

        plugins.push(AuthenticationPlugin(authenticationConfig))
	}

	return {
        plugins,
		modules: {
            Page: import('./modules/Page.svelte'),
            Form: import('./modules/Form.svelte'),
            Table: import('./modules/Table.svelte')
        },
		layouts: {
            AdminLayout: import('./layouts/AdminLayout.svelte')
        }
	};
}

