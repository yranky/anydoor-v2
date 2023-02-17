import { ValueType } from "../database/tools"

export enum IThemeDatabaseKeys {
    //跟随系统
    FOLLOW_SYSTEM = "follow_system",
    //当前的mode
    CURRENT_MODE = "current_mode"
}

export enum IThemeMode {
    AUTO = "auto",
    LIGHT = "light",
    DARK = "dark"
}

export type IThemeDataResult = {
    [key in IThemeDatabaseKeys]?: IThemeMode | String | any
}

//类型和默认值
export const ThemeDefaultVal: IThemeDefaultVal = {
    [IThemeDatabaseKeys.FOLLOW_SYSTEM]: {
        type: ValueType.BOOLEAN,
        default: "1"
    },
    [IThemeDatabaseKeys.CURRENT_MODE]: {
        type: ValueType.STRING,
        default: "auto"
    }
}

//初始数据
export type IThemeDefaultVal = {
    [key in IThemeDatabaseKeys]: {
        type: ValueType,
        default: string
    }
}
