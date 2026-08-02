import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Reservation from '../views/Reservation.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home, meta: { titleFa: 'استخر‌بان | لوازم استخر و شنا', titleEn: 'PoolHub | Pool & Swimming Equipment' } },
    { path: '/products', name: 'products', component: Products, meta: { titleFa: 'محصولات | استخر‌بان', titleEn: 'Products | PoolHub' } },
    { path: '/products/:slug', name: 'product-detail', component: ProductDetail, meta: { titleFa: 'جزئیات محصول | استخر‌بان', titleEn: 'Product Details | PoolHub' } },
    { path: '/reservation', name: 'reservation', component: Reservation, meta: { titleFa: 'رزرو نوبت | استخر‌بان', titleEn: 'Book a Service | PoolHub' } },
    { path: '/cart', name: 'cart', component: Cart, meta: { titleFa: 'سبد خرید | استخر‌بان', titleEn: 'Cart | PoolHub' } },
    { path: '/checkout', name: 'checkout', component: Checkout, meta: { titleFa: 'تسویه حساب | استخر‌بان', titleEn: 'Checkout | PoolHub' } },
    { path: '/about', name: 'about', component: About, meta: { titleFa: 'درباره ما | استخر‌بان', titleEn: 'About | PoolHub' } },
    { path: '/contact', name: 'contact', component: Contact, meta: { titleFa: 'تماس با ما | استخر‌بان', titleEn: 'Contact | PoolHub' } },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
