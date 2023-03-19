/* eslint-disable no-unused-vars */

/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-12-27 19:33:45
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2022-12-27 21:34:33
 * @FilePath: \backend\src\common\define\menu.ts
 * @Description: 用于判断菜单是哪种menu还是option
 */
export enum MENU_TYPE {
    // 菜单
    MENU = 'menu',
    // 选项
    OPTION = 'option',
    OTHER = 'other'
}

export interface IMenu {
    type?: string,
    name?: string
}

export interface IMenuItem{
    name: string,
    path:string,
    title:string,
    children?:IMenuItem[] | undefined
}
