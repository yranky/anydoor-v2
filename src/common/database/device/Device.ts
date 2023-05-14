/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-12 16:51:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-13 20:18:10
 * @FilePath: \anydoor-v2\src\common\database\device\Device.ts
 * @Description: 设备类
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import SQLite, { SQLITE_STATUS_CODE } from "@/common/sql/SQLite"
import databases, { DATA } from "../database"
import ERROR_TARGET from "@/common/errorHandler/ERROR_TARGET"
import { DEVICE_TABLES_NAME } from "../tables/device"
import { v4 as uuidv4 } from 'uuid'
import ToastModule from "@/common/native/toast/ToastModule"
import useDeviceStore from "@/store/device"
import { isEmpty } from "lodash"
import { UNI_STORAGE } from "../UNI_STORAGE"

export default class Device {
    //sqlite对象
    private sql: SQLite | undefined
    //构造函数
    private constructor() { }

    //获取实例对象
    static async getInstance() {
        if (uni.$anydoor.Device === undefined) {
            uni.$anydoor.Device = new Device()
            //初始化工作
            uni.$anydoor.Device.sql = new SQLite(DATA.DEVICE)
            //需要等待完成才能
            await uni.$anydoor.Device.initDataTable()
        }
        return uni.$anydoor.Device
    }

    //初始化设备表
    async initDataTable() {
        return await this.sql!.executeSql([
            databases[DATA.DEVICE].tables[DEVICE_TABLES_NAME.INFO].init,
        ], ERROR_TARGET.DEVICE_CLASS)
    }

    //初始化设备id
    async initDeviceId() {
        let uuid
        try {
            uuid = await this.getOAID()
        } catch {
            uuid = uuidv4()
        }
        //先查询
        const result = await this.sql?.selectSql(`select * from ${DEVICE_TABLES_NAME.INFO}`, ERROR_TARGET.DEVICE_CLASS)
        if (result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "设备编号初始化失败" })
        }
        if (result?.data instanceof Array && result.data.length === 0) {
            const sql = `
            insert into  ${DEVICE_TABLES_NAME.INFO} (key,value) values ('device_id','${uuid}')
            `
            //初始化
            await this.sql!.executeSql([
                sql
            ], ERROR_TARGET.DEVICE_CLASS)

            //保存到storage
            uni.setStorageSync(UNI_STORAGE.UNI_DEVICE_ID, uuid)
        }
        //最终的结果
        const last_result = await this.sql?.selectSql(`select * from ${DEVICE_TABLES_NAME.INFO}`, ERROR_TARGET.DEVICE_CLASS)
        if (result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "设备编号初始化失败" })
        }
        const id = this.getDeviceId(last_result?.data || [])
        useDeviceStore().$state.deviceId = id
        return last_result
    }

    //获取deviceid
    getDeviceId(result: any) {
        const uuid = uuidv4()
        const item = result.find((item: any) => item.key === 'device_id')
        return item ? item.value : uuid
    }

    //获取oaid
    private getOAID() {
        return new Promise((resolve, reject) => {
            //先看看能不能获取到oaid
            plus.device.getOAID({
                success: function (e) {
                    if (!isEmpty(e.oaid)) {
                        resolve(e.oaid)
                    } else {
                        reject()
                    }
                },
                fail: function () {
                    reject()
                }
            })
        })
    }

}