import meAlert from './alert/index.js'

const install = function(Vue) {
    //注册全局组件
    Vue.component(meAlert.name, meAlert);
    // console.log(a);
    //添加全局API
    Vue.prototype.$alert = meAlert
}
export default install