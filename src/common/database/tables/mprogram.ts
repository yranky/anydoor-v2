import { ITables } from "../IDatabase"

export enum MPROGRAM_TABLES_NAME {
    //安装的小程序等
    PROGRAM = "mprogram_program"
}

const MPROGRAM_TABLES: ITables<MPROGRAM_TABLES_NAME> = {
    //安装的小程序等
    [MPROGRAM_TABLES_NAME.PROGRAM]: {
        init: "CREATE TABLE if not exists " + MPROGRAM_TABLES_NAME.PROGRAM + " ( `appid` VARCHAR(200) NOT NULL , `name` VARCHAR(200) NOT NULL , `icon` VARCHAR(300) NOT NULL , `wgt` VARCHAR(500) NOT NULL , `create_time` DATETIME NOT NULL , `update_time` DATETIME NOT NULL , `password` VARCHAR(500) NOT NULL , `enableBackground` TINYINT(1) NOT NULL DEFAULT '0' , PRIMARY KEY (`appid`));"
    }
}

export default MPROGRAM_TABLES