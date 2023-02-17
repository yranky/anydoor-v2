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
    [key in IThemeDatabaseKeys]: IThemeMode | String
}

//初始化数据
export const ThemeDefaultVal: IThemeDefaultVal = {
    [IThemeDatabaseKeys.FOLLOW_SYSTEM]: "1",
    [IThemeDatabaseKeys.CURRENT_MODE]: "auto"
}

//初始数据
export type IThemeDefaultVal = {
    [key in IThemeDatabaseKeys]: IThemeMode | String
}