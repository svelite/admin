import config from '../svelite.config.js'
import {createRoot} from 'svelte'
import {SvPage} from 'svelitecms/components'
import {normalizeConfig, loadPageData} from 'svelitecms'

const path = window.location.pathname
loadPageData(path, normalizeConfig(config)).then(x => {
    createRoot(SvPage, {
        target: document.getElementById('app'),
        props: x 
    })
})
