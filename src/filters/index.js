import strshortlen from './strShortLen';


export default {
    install(Vue) {
        Vue.filter('strshortlen', strshortlen);
    }
}