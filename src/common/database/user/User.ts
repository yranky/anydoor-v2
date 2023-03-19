import SQLite, { SQLITE_STATUS_CODE } from "@/common/sql/SQLite"
import databases, { DATA } from "../database"
import ERROR_TARGET from "@/common/errorHandler/ERROR_TARGET"
import { USER_TABLES_NAME } from "../tables/user"
import ToastModule from "@/common/native/toast/ToastModule"

export default class User {
    //sqlite对象
    private sql: SQLite | undefined
    //构造函数
    private constructor() { }

    //获取实例对象
    static async getInstance() {
        if (uni.$anydoor.User === undefined) {
            uni.$anydoor.User = new User()
            //初始化工作
            uni.$anydoor.User.sql = new SQLite(DATA.USER)
            //需要等待完成才能
            await uni.$anydoor.User.initDataTable()
        }
        return uni.$anydoor.User
    }

    //初始化用户表
    async initDataTable() {
        return await this.sql!.executeSql([
            databases[DATA.USER].tables[USER_TABLES_NAME.ACCOUNT].init,
            databases[DATA.USER].tables[USER_TABLES_NAME.TOKEN].init,
            databases[DATA.USER].tables[USER_TABLES_NAME.CURRENT].init,
        ], ERROR_TARGET.USER_CLASS)
    }

    //插入一个用户
    async insertUserAccount(token: string, refresh_token: string) {
        //初始工作
        await this.sql?.executeSql([
            //清空当前的
            `
        DELETE FROM ${USER_TABLES_NAME.CURRENT}
        `,
            //插入一条新的
            `
        insert into  ${USER_TABLES_NAME.ACCOUNT} (ext) values ('')
        `], ERROR_TARGET.USER_CLASS)
        //返回上一次插入的id
        const current = await this.sql?.selectSql(`select * from ${USER_TABLES_NAME.ACCOUNT} order by id desc limit 1`, ERROR_TARGET.USER_CLASS)
        if (current?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "登录出现问题!" })
        }
        let id = 0
        try {
            id = current?.data[0].id
        } catch { }
        const time: number = new Date().getTime() / 1000
        //将当前行的id加入current,将token也保存
        await this.sql?.executeSql([`insert into  ${USER_TABLES_NAME.CURRENT} (id) values (${id})`,
        //将token也保存
        `insert into  ${USER_TABLES_NAME.TOKEN} (token,refresh_token,create_time,update_time,uid) values (${token},${refresh_token},${time},${time},${id})`
        ], ERROR_TARGET.USER_CLASS)

    }

}