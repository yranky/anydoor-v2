/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-25 18:17:37
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-04-01 15:18:49
 * @FilePath: \anydoor-v2\src\common\database\UNI_STORAGE.ts
 * @Description: 缓存标识
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export enum UNI_STORAGE {
    //轮播图列表缓存
    SWIPER_LIST = "swiper_list",
    //提示列表
    TIP_LIST = "tip_list",
    //菜单列表(首页菜单列表)
    MENU_INDEX_LIST = "menu_index_list",
    //菜单列表(我的部分)
    MENU_MY_LIST = "menu_my_list",
    //高校列表
    COMPANY_LIST = "company_list",
    //教学计划
    JW_PLAN = "jw_plan",
    //教学计划当前选择的学期
    JW_PLAN_SEMESTER = "jw_plan_semester",
    //成绩
    JW_SCORE = "jw_score",
    //成绩当前选择的学期
    JW_SCORE_SEMESTER = "jw_score_semester"
}