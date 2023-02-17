import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { OnThemeChangeCallbackResult } from "@dcloudio/types/uni-app/uni/base/ThemeChange"
import SQLite, { SQLITE_STATUS_CODE } from "../sql/SQLite";
import databases, { DATA } from "../database/database";
import { SETTING_TABLES_NAME } from "../database/tables/setting";
import { IThemeDataResult, IThemeDatabaseKeys, IThemeMode, ThemeDefaultVal } from "./IThemeDatabase";
import Toast from "../toast/toast";
import ERROR_TARGET from "../errorHandler/ERROR_TARGET";
import { insertKeyAndValueDefault } from "../database/tools";

export default class Theme {
    private static instance: Theme | null = null
    //sqlite对象
    private sql: SQLite | undefined

    private constructor() {
        //初始化sql
        this.sql = new SQLite(DATA.SETTTING)
    }

    //获取instance
    static async getInstance() {
        if (Theme.instance === null) {
            Theme.instance = new Theme()
            //初始化主题设置相关数据表
            await Theme.instance.initDataTable()
            //初始化
            await Theme.instance.init()
        }
        return Theme.instance
    }

    //跟随系统
    setSystemFirst(open: boolean) {
        const store = useTmpiniaStore()
        if (open === true) {
            //设置跟随系统
            plus.nativeUI.setUIStyle("auto")
            //获取当前状态
            const currentMode = uni.getSystemInfoSync().theme
            //如果是夜间模式,修改tmui的样式
            if (currentMode === "dark") store.setTmVuetifyDark(true)
            else store.setTmVuetifyDark(false)
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
            if (currentMode === "dark") store.setTmVuetifyDark(true)
            else store.setTmVuetifyDark(false)

            //设置系统状态到数据库
            this.sql?.executeSql([
                `update ${SETTING_TABLES_NAME.THEME} set value = '0' where key='${IThemeDatabaseKeys.FOLLOW_SYSTEM}'`,
                `update ${SETTING_TABLES_NAME.THEME} set value = '${currentMode}' where key='${IThemeDatabaseKeys.CURRENT_MODE}'`,
            ], ERROR_TARGET.THEME_CLASS)
        }
    }

    //从数据库里面获取主题模式并序列化
    async getThemeData(): Promise<IThemeDataResult> {
        const result = await this.sql?.selectSql(`select * from ${SETTING_TABLES_NAME.THEME} where key='${IThemeDatabaseKeys.CURRENT_MODE}'`)
        if (result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            Toast.show({ text: "主题信息获取失败!" })
        }
        return result?.data || []
    }

    //初始化
    async init() {
        //首先从数据库里面获取

        //store
        const store = useTmpiniaStore()
        const currentMode = uni.getSystemInfoSync().theme
        //如果当前是夜间模式
        if (currentMode === "dark") {
            store.setTmVuetifyDark(true)
        } else {
            store.setTmVuetifyDark(false)
        }
        //主题切换监听
        uni.onThemeChange((res: OnThemeChangeCallbackResult) => {
            console.log(res.theme)
            if (res.theme === "dark") {
                store.setTmVuetifyDark(true)
            } else {
                store.setTmVuetifyDark(false)
            }
        })
    }

    //初始化数据库
    async initDataTable(): Promise<void> {
        //建表
        await this.sql!.executeSql([databases[DATA.SETTTING].tables[SETTING_TABLES_NAME.THEME].init], ERROR_TARGET.THEME_CLASS)
        //初始化数据
        await this.sql?.executeSql(insertKeyAndValueDefault(SETTING_TABLES_NAME.THEME, ThemeDefaultVal), ERROR_TARGET.THEME_CLASS)
    }

}