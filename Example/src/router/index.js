/**
 * @author  tuonina
 * @email  976056042@qq.com
 * @createTime  2019/1/25
 * 页面路由
 **/
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '',
    name: 'QA',
    meta: {title: '活动说明'},
    component: () => import('../pages/notice')
  },
  {
    path: '/question',
    name: 'Question',
    meta: {title: '有奖问答'},
    component: () => import('../pages/question')
  },
  {
    path: '/game',
    name: 'Game',
    meta: {title: '幸运抽奖'},
    component: () => import('../pages/game')
  }
];

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
