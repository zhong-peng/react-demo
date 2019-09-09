import {
  Dashboard,
  ArticleList,
  ArticleEdit,
  Notification
} from './pages'

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    title: '仪表盘',
    iconType: 'dashboard',
    isMenu: true,
    exact: false
  },
  {
    path: '/notification',
    component: Notification,
    isMenu: false,
    exact: false
  },
  {
    path: '/article/list',
    component: ArticleList,
    title: '文章列表',
    iconType: 'ordered-list',
    isMenu: true,
    exact: false
  },
  {
    path: '/article/edit/:id',
    component: ArticleEdit,
    title: '文章列表',
    isMenu: false,
    exact: false
  }
]

export default routes