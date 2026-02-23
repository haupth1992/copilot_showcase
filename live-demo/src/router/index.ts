import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/home/HomeView.vue'),
      meta: { title: 'Brodo Swaggins Middle-Earth Survival Kit' }
    },
    {
      path: '/lembas',
      name: 'lembas',
      component: () => import('../components/lembas/LembasCalculator.vue'),
      meta: { title: 'Lembas Bread Calculator' }
    },
    {
      path: '/ring-detector',
      name: 'ring-detector',
      component: () => import('../components/ring/RingDetector.vue'),
      meta: { title: 'Ring Detection System' }
    },
    {
      path: '/weapons',
      name: 'weapons',
      component: () => import('../components/weapons/WeaponList.vue'),
      meta: { title: 'Weapon Proficiency Tracker' }
    },
    {
      path: '/first-aid',
      name: 'first-aid',
      component: () => import('../components/first-aid/InjuryDatabase.vue'),
      meta: { title: 'Elvish First Aid Guide' }
    },
    {
      path: '/travel',
      name: 'travel',
      component: () => import('../components/travel/TravelPlanner.vue'),
      meta: { title: 'Middle-Earth Travel Planner' }
    },
    {
      path: '/pipeweed',
      name: 'pipeweed',
      component: () => import('../components/pipeweed/PipeweedDealerFinder.vue'),
      meta: { title: 'Pipe-Weed Dealer Finder' }
    },
    {
      path: '/fellowship',
      name: 'fellowship',
      component: () => import('../components/fellowship/FellowshipView.vue'),
      meta: { title: 'The Fellowship of the Bling' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ],
})

// Update page title on route change
router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'Brodo Swaggins Survival Kit'
  next()
})

export default router
