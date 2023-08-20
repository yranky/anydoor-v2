import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { OnThemeChangeCallbackResult } from "@dcloudio/types/uni-app/uni/base/ThemeChange"
import SQLite, { SQLITE_STATUS_CODE } from "../sql/SQLite";
import databases, { DATA } from "../database/database";
import { SETTING_TABLES_NAME } from "../database/tables/setting";
import { IThemeDataResult, IThemeDatabaseKeys, IThemeMode, ThemeDefaultVal } from "./IThemeDatabase";
import ERROR_TARGET from "../errorHandler/ERROR_TARGET";
import { insertKeyAndValueDefault } from "../database/tools";
import ThemeFilter from "./ThemeFilter";
import ToastModule from "../native/toast/ToastModule";
import useConfigStore from "@/store/config";

export default class Theme {
    //sqlite对象
    private sql: SQLite | undefined
    //变量
    private follow_system: boolean = false

    private constructor() {
        //初始化sql
        this.sql = new SQLite(DATA.SETTTING)
    }

    //获取instance
    static async getInstance() {
        if (uni.$anydoor.Theme === undefined) {
            uni.$anydoor.Theme = new Theme()
            //初始化主题设置相关数据表
            await uni.$anydoor.Theme.initDataTable()
            //初始化
            await uni.$anydoor.Theme.init()
        }
        return uni.$anydoor.Theme
    }

    //跟随系统
    setSystemFirst(open: boolean) {
        this.follow_system = open
        if (open === true) {
            //设置跟随系统
            plus.nativeUI.setUIStyle("auto")
            //获取当前状态
            const currentMode = uni.getSystemInfoSync().theme
            //如果是夜间模式,修改tmui的样式
            this.changeTheme(currentMode === "dark" ? true : false)
            this.sql?.executeSql([
                `update ${SETTING_TABLES_NAME.THEME} set value = '1' where key='${IThemeDatabaseKeys.FOLLOW_SYSTEM}'`,
                `update ${SETTING_TABLES_NAME.THEME} set value = 'auto' where key='${IThemeDatabaseKeys.CURRENT_MODE}'`,
            ], ERROR_TARGET.THEME_CLASS)
        }
        else {
            //获取当前的系统状态
            const currentMode = uni.getSystemInfoSync().theme

            plus.nativeUI.setUIStyle(currentMode as "light" | "auto" | "dark")
            //修改tmui样式
            this.changeTheme(currentMode === "dark" ? true : false)
            //设置系统状态到数据库
            this.sql?.executeSql([
                `update ${SETTING_TABLES_NAME.THEME} set value = '0' where key='${IThemeDatabaseKeys.FOLLOW_SYSTEM}'`,
                `update ${SETTING_TABLES_NAME.THEME} set value = '${currentMode}' where key='${IThemeDatabaseKeys.CURRENT_MODE}'`,
            ], ERROR_TARGET.THEME_CLASS)
        }
    }

    //从数据库里面获取主题模式并序列化
    async getThemeData(): Promise<IThemeDataResult> {
        const result = await this.sql?.selectSql(`select * from ${SETTING_TABLES_NAME.THEME}`)
        if (result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "主题信息获取失败!" })
        }
        const res = ThemeFilter(result?.data || [])
        //是否跟随系统
        this.follow_system = res[IThemeDatabaseKeys.FOLLOW_SYSTEM]
        return res
    }

    //获取静态的数据
    getClassData() {
        console.log(this.follow_system)
        return {
            follow_system: this.follow_system
        }
    }

    //初始化
    async init() {
        //首先从数据库里面获取
        const res = await this.getThemeData()
        //获取当前系统的样式
        const currentMode = uni.getSystemInfoSync().theme
        //如果是跟随系统
        if (res.follow_system === true) {
            //设置跟随系统
            plus.nativeUI.setUIStyle("auto")
            //修改tmui样式
            const store = useTmpiniaStore()
            this.changeTheme(currentMode === "dark" ? true : false)
        } else {
            plus.nativeUI.setUIStyle(res.current_mode)
            //修改tmui样式
            this.changeTheme(res.current_mode === "dark" ? true : false)
        }

        //主题切换监听
        uni.onThemeChange(async (res: OnThemeChangeCallbackResult) => {
            //显示toast
            if (useConfigStore().debug) {
                ToastModule.show({ text: `主题切换 ${uni.$anydoor_native.Tool_Module.checkIsDarkModeSync({}) ? '暗黑模式' : '白天模式'}` })
            }
            const currentMode = uni.getSystemInfoSync().theme
            // @ts-ignore
            const mode = res.theme === "auto" ? currentMode : res.theme
            //如果是跟随系统
            if (this.follow_system === true) {
                this.changeTheme(mode === "dark" ? true : false)
            }
        })
    }

    //切换
    async changeTheme(dark: boolean = false) {
        const store = useTmpiniaStore()
        store.setTmVuetifyDark(dark)
        //更改dialog的主题
        uni.$anydoor_native.Dialog_Module.setDarkModeSync(dark)

        //不是跟随系统
        if (this.follow_system === false) {
            //存储到数据库
            await this.sql?.executeSql([
                `update ${SETTING_TABLES_NAME.THEME} set value = '${dark ? "dark" : "light"}' where key='${IThemeDatabaseKeys.CURRENT_MODE}'`,
            ], ERROR_TARGET.THEME_CLASS)
        }
    }

    //初始化数据库
    async initDataTable(): Promise<void> {
        //建表
        await this.sql!.executeSql([databases[DATA.SETTTING].tables[SETTING_TABLES_NAME.THEME].init], ERROR_TARGET.THEME_CLASS)
        //初始化数据
        await this.sql?.executeSql(insertKeyAndValueDefault(SETTING_TABLES_NAME.THEME, ThemeDefaultVal), ERROR_TARGET.THEME_CLASS)
    }

}