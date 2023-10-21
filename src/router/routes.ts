import { ROUTE_PATH } from "./ROUTE_PATH";
import { AuthMode, IRoutes } from "./define/config";

const routes: IRoutes<ROUTE_PATH> = {
    [ROUTE_PATH.INDEX]: {
        PATH: ROUTE_PATH.INDEX,
        NAME: "首页",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.MY]: {
        PATH: ROUTE_PATH.MY,
        NAME: "我的",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.DETAIL]: {
        PATH: ROUTE_PATH.DETAIL,
        NAME: "详情",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.SEARCH]: {
        PATH: ROUTE_PATH.SEARCH,
        NAME: "搜索",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.ARTICLE_LIST]: {
        PATH: ROUTE_PATH.ARTICLE_LIST,
        NAME: "文章列表",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.ARTICLE_DETAIL]: {
        PATH: ROUTE_PATH.ARTICLE_DETAIL,
        NAME: "文章详情",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.ARTICLE_DETAIL_WEB]: {
        PATH: ROUTE_PATH.ARTICLE_DETAIL_WEB,
        NAME: "文章详情",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.NOTICE_LIST]: {
        PATH: ROUTE_PATH.NOTICE_LIST,
        NAME: "通知列表",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.NOTICE_DETAIL]: {
        PATH: ROUTE_PATH.NOTICE_DETAIL,
        NAME: "通知详情",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.LOGIN]: {
        PATH: ROUTE_PATH.LOGIN,
        NAME: "登录",
        AUTH: [AuthMode.NOT_LOGIN],
        SEARCH: false
    },
    [ROUTE_PATH.SETTING]: {
        PATH: ROUTE_PATH.SETTING,
        NAME: "设置",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.DOWNLOAD]: {
        PATH: ROUTE_PATH.DOWNLOAD,
        NAME: "下载",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.MINI_PROGRAM]: {
        PATH: ROUTE_PATH.MINI_PROGRAM,
        NAME: "微应用",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.JIAOWU_PLAN]: {
        PATH: ROUTE_PATH.JIAOWU_PLAN,
        NAME: "教学计划",
        AUTH: [AuthMode.JIAOWU],
        SEARCH: false
    },
    [ROUTE_PATH.JIAOWU_SCORE]: {
        PATH: ROUTE_PATH.JIAOWU_SCORE,
        NAME: "成绩查询",
        AUTH: [AuthMode.JIAOWU],
        SEARCH: false
    },
    [ROUTE_PATH.JIAOWU_EXAM]: {
        PATH: ROUTE_PATH.JIAOWU_EXAM,
        NAME: "考试查询",
        AUTH: [AuthMode.JIAOWU],
        SEARCH: false
    },
    [ROUTE_PATH.LESSON]: {
        PATH: ROUTE_PATH.LESSON,
        NAME: "课程表",
        AUTH: [AuthMode.JIAOWU],
        SEARCH: false
    },
    [ROUTE_PATH.LESSON_SETTING]: {
        PATH: ROUTE_PATH.LESSON_SETTING,
        NAME: "课程表设置",
        AUTH: [AuthMode.JIAOWU],
        SEARCH: false
    },
    [ROUTE_PATH.WEBVIEW]: {
        PATH: ROUTE_PATH.WEBVIEW,
        NAME: "网页",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.COMPANY_SELECT]: {
        PATH: ROUTE_PATH.COMPANY_SELECT,
        NAME: "学校选择",
        AUTH: [AuthMode.NOT_JIAOWU_LOGIN],
        SEARCH: false
    },
    [ROUTE_PATH.JIAOWU_LOGIN]: {
        PATH: ROUTE_PATH.JIAOWU_LOGIN,
        NAME: "教务登录",
        AUTH: [AuthMode.NOT_JIAOWU_LOGIN],
        SEARCH: false
    },
    [ROUTE_PATH.JIAOWU_MY]: {
        PATH: ROUTE_PATH.JIAOWU_MY,
        NAME: "我的教务",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.APP_DETAIL]: {
        PATH: ROUTE_PATH.APP_DETAIL,
        NAME: "应用详情",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.LESSON_SETTING_COLOR]: {
        PATH: ROUTE_PATH.LESSON_SETTING_COLOR,
        NAME: "课程颜色",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.LESSON_SETTING_BACKGROUND]: {
        PATH: ROUTE_PATH.LESSON_SETTING_BACKGROUND,
        NAME: "课程背景设置",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.LESSON_ADD]: {
        PATH: ROUTE_PATH.LESSON_ADD,
        NAME: "课程添加",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.LESSON_SETTING_EDIT]: {
        PATH: ROUTE_PATH.LESSON_SETTING_EDIT,
        NAME: "课程编辑",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.LESSON_SETTING_EDIT_DETAIL]: {
        PATH: ROUTE_PATH.LESSON_SETTING_EDIT_DETAIL,
        NAME: "课程编辑详情",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.QRCODE_RESULT]: {
        PATH: ROUTE_PATH.QRCODE_RESULT,
        NAME: "扫码结果",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.SEARCH_LIST]: {
        PATH: ROUTE_PATH.SEARCH_LIST,
        NAME: "搜索列表",
        AUTH: [],
        SEARCH: false
    },
    [ROUTE_PATH.COMMON_DETAIL]: {
        PATH: ROUTE_PATH.COMMON_DETAIL,
        NAME: "详情",
        AUTH: [],
        SEARCH: false
    }
}

export default routes