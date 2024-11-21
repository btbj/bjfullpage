import FullPage from "./FullPage.vue";

const components = [FullPage]
export const install = function(Vue) {
  components.map(el => {
    Vue.component(el.name, el) // 注册组件
  })
}

export default install