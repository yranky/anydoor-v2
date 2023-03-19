import { ITables } from "../IDatabase";

export enum DEVICE_TABLES_NAME {
    //设备信息缓存
    INFO = "device_info"
}

const DEVICE_TABLES: ITables<DEVICE_TABLES_NAME> = {
    [DEVICE_TABLES_NAME.INFO]: {
        init: `
        CREATE TABLE if not exists '${DEVICE_TABLES_NAME.INFO}'(
        'key' text NOT NULL unique,
        'value' text ,
        'ext' text
      )
      `,
        drop: `
        drop table ${DEVICE_TABLES_NAME.INFO}
        `
    }
}

export default DEVICE_TABLES