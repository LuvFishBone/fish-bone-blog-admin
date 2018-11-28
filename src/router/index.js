import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/pages/Login'], resolve)
        },
        {
            path: '/articlelist',
            name: 'articlelist',
            component: resolve => require(['@/pages/ArticleList'], resolve)
        },
        {
            path: '/publishAnalyze',
            name: 'publishAnalyze',
            component: resolve => require(['@/pages/PublishAnalyze'], resolve)
        },
        {
            path: '/publishArticle',
            name: 'publishArticle',
            component: resolve => require(['@/pages/PublishArticle'], resolve)
        },
        {
            path: '/tags',
            name: 'tags',
            component: resolve => require(['@/pages/Tags'], resolve)
        },
        {
            path: '/types',
            name: 'types',
            component: resolve => require(['@/pages/Types'], resolve)
        },
        {
            path: '/manageComments',
            name: 'manageComments',
            component: resolve => require(['@/pages/ManageComments'], resolve)
        },
        {
            path: '/about',
            name: 'about',
            component: resolve => require(['@/pages/About'], resolve)
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})

router.beforeEach((to, from, next) => {
    // redirect会重新进行路由守卫，next()不会
    if (localStorage.AuthToken) {
        axios.get(
            '/api/v1/tokens/check', {
        })
        .then(res => {
            // token验证通过
            const pathArr = ['/publishAnalyze', '/articlelist', '/publishArticle', '/tags', '/types', '/manageComments', '/about']
            if (pathArr.indexOf(to.path) === -1) {
                next('publishAnalyze')
            }
            else {
                next()
            }
        })
        .catch(err => {
            // token验证不通过
            console.log(err)
            if (to.path !== '/login') {
                next('login')
            }
            else {
                next()
            }
        })
    }
    else {
        if (to.path !== '/login') {
            next('login')
        }
        else {
            next()
        }
    }
})

export default router