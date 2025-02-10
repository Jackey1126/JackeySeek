export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/talk',
    name: 'talk',
    component: () => import('@/views/talkView.vue'),
  },
]