import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueDirectiveImagePreviewer, { cursor: '' })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
