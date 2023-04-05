/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-08-03 15:55:15
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-04-05 14:10:23
 * @FilePath: \anydoor-v2\src\router\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { ComponentPublicInstance, nextTick } from "vue"
import routes from "./routes"
import { ROUTE_PATH } from "./ROUTE_PATH"
import { AuthMode } from "./define/config"
import useJiaowuStore from "@/store/jiaowu"
import { linkTo } from "@/common/utils/link"
//如果想要使用框架的自带工具函数请输入uni.$tm.u.?你的方法
//网络请示为uni.$tm.fetch.?你的方法

interface beforeRouterOpts {
	path: string,//当前页面路径，不含前缀 /
	opts?: any,//页面参数
	context: ComponentPublicInstance | null,
}

/**
 * 路由访问前执行的函数
 * @param path 页面路径，不带前缀/
 */
export const useTmRouterBefore = (arg: beforeRouterOpts): void => {
	// 每一个页面在初化前都会执行
}
/**
 * 路由访问后执行的函数
 * @param path 页面路径，不带前缀/
 * @param opts 页面加载完成后返回的参数
 */
export const useTmRouterAfter = (arg: beforeRouterOpts): void => {
	//每一个页面初始后都会执行
	console.log(arg)
}
