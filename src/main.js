import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
Vue.use(ElementUI);
import vueCitySelect from './lib/index.js'
Vue.use(vueCitySelect);
new Vue({
  el: '#app',
  render: h => h(App)
})
