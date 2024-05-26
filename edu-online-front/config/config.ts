// https://umijs.org/config/
import {defineConfig} from 'umi';
import {join} from 'path';
import defaultSettings from './defaultSettings';


export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      name: '主页',
      icon: 'home',
      path: '/homePage',
      component: './HomePage',
      access: 'notAdmin',
    },
    {path: '/admin/login',
    layout: false,
    name: 'login',
    component: './admin/Login',
    hideInMenu: true,
    },
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          name: 'loginUseCode',
          icon: 'smile',
          path: '/user/loginUseCode',
          component: './user/LoginUseCode',
        },
        {
          component: '404',
        },
      ],
    },

    {
      path: '/profile',
      name: '详情',
      icon: 'profile',
      hideInMenu: true,
      routes: [
        {
          path: '/profile',
          redirect: '/profile/basic',
        },
        {
          name: '基础',
          icon: 'smile',
          path: '/profile/basic',
          component: './profile/basic',
        },
        {
          name: '进阶',
          icon: 'smile',
          path: '/profile/advanced',
          component: './profile/advanced',
        },
        {
          path: '/profile/course-info/:courseId',
          component: './profile/CourseInfo',
          name: '课程详情',
          icon: 'book',
        },
        {
          path: '/profile/course-chapter-info/:courseInfoId',
          component: './profile/CourseInfo/chapter',
          name: '课程章节',
          hideInMenu: true,
          icon: 'book',
        },
        {
          path: '/profile/article-info/:articleId',
          name: '文章详情',
          icon: 'book',
          component: './profile/articleInfo'
        }
      ],
    },
    {
      name: '课程',
      icon: 'table',
      path: '/course',
      component: './course',
    },
    {
      path: '/workpanel',
      name: '工作台',
      icon: 'crown',
      access: 'canAdmin',
      component: './workpanel',
    },
    {
      path: '/dashboard',
      name: '仪表盘',
      icon: 'dashboard',
      access: 'canAdmin',
      hideInMenu: true,
      routes: [
        {
          path: '/dashboard',
          redirect: '/dashboard/analysis',
        },
        {
          name: 'analysis',
          icon: 'smile',
          path: '/dashboard/analysis',
          component: './dashboard/analysis',
        },
        {
          name: 'monitor',
          icon: 'smile',
          path: '/dashboard/monitor',
          component: './dashboard/monitor',
        },
        {
          name: 'workplace',
          icon: 'smile',
          path: '/dashboard/workplace',
          component: './dashboard/workplace',
        },
      ],
    },
    {
      path: '/forum',
      icon: 'form',
      name: '论坛',
      routes: [
        {
          name: '文章',
          icon: 'smile',
          path: '/forum/articles',
          component: './forum/articles',
        },
        {
          name: '发布文章',
          icon: 'smile',
          path: '/forum/publish',
          component: './forum/publish',
          hideInMenu: true,
        }
      ]
    },
    {
      path: '/adminChart',
      icon: 'form',
      name: '图表界面',
      component: './adminChart',
      access: 'canAdmin',
    },
    {
      path: '/form',
      icon: 'form',
      name: '表单',
      hideInMenu: true,
      routes: [
        {
          path: '/form',
          redirect: '/form/basic-form',
        },
        {
          name: '基础表单',
          icon: 'smile',
          path: '/form/basic-form',
          component: './form/basic-form',
        },
        {
          name: '分步表单',
          icon: 'smile',
          path: '/form/step-form',
          component: './form/step-form',
        },
        {
          name: '进阶表单',
          icon: 'smile',
          path: '/form/advanced-form',
          component: './form/advanced-form',
        },
        {
          name: '总体表单预览',
          icon: 'smile',
          path: '/form/total-form',
          component: './form/total-form',
        },
      ],
    },
    {
      path: '/list',
      icon: 'table',
      name: '列表',
      hideInMenu: true,
      routes: [
        {
          path: '/list/search',
          name: '列表搜索',
          component: './list/search',
          routes: [
            {
              path: '/list/search',
              redirect: '/list/search/articles',
            },
            {
              name: '文章',
              icon: 'smile',
              path: '/list/search/articles',
              component: './list/search/articles',
            },
            {
              name: '应用',
              icon: 'smile',
              path: '/list/search/applications',

              component: './list/search/applications',
            },
          ],
        },
        {
          path: '/list',
          redirect: '/list/table-list',
        },
        {
          name: '表格',
          icon: 'smile',
          path: '/list/table-list',
          component: './list/table-list',
        },
        {
          name: '基本列表',
          icon: 'smile',
          path: '/list/basic-list',
          component: './list/basic-list',
        },
        {
          name: '卡片列表',
          icon: 'smile',
          path: '/list/card-list',
          component: './list/card-list',
        },
      ],
    },
    {
      name: '个人',
      icon: 'user',
      path: '/account',
      access: 'notAdmin',
      routes: [
        {
          path: '/account',
          redirect: '/account/center',
        },
        {
          name: '个人中心',
          icon: 'smile',
          path: '/account/center',
          component: './account/center',
        },
        {
          name: '个人设置',
          icon: 'smile',
          path: '/account/settings',
          component: './account/settings',
        },
      ],
    },
    {
      path: '/',
      redirect: '/course',
    },
    {
      component: '404',
    },
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api/': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    },
  },
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: true,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    "@ant-design/charts": "charts"
  },
  scripts: [
    'https://unpkg.com/react@17/umd/react.production.min.js',
    'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts.min.js',
    //使用 组织架构图、流程图、资金流向图、缩进树图 才需要使用
    'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts_g6.min.js',
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
