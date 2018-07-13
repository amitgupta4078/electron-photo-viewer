import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import ImageViewer from '../components/ImageViewer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/imageViewer',
      name: 'image-viewer',
      component: ImageViewer,
      props: true
    }
  ]
})
