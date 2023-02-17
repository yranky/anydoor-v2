import { ITables } from "../IDatabase";

export enum SETTING_TABLES_NAME {
    //主题数据
    THEME = "setting_theme"
}

const SETTING_TABLES: ITables<SETTING_TABLES_NAME> = {
    [SETTING_TABLES_NAME.THEME]: {
        init: `
        CREATE TABLE IF NOT EXISTS ${SETTING_TABLES_NAME.THEME}(
            'key' text not null,
            'value' text,
            primary key ('key')
        );
        `
    }
}

export default SETTING_TABLES