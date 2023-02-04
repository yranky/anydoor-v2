/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-10-06 16:15:03
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-04 16:10:12
 * @FilePath: \anydoor-v2\src\common\toast\toast.ts
 * @Description: Toast通知类
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { showOption } from "./interface/define"


export default class Toast {
	static toast = uni.requireNativePlugin("anydoor_toast")
	static show(option: showOption) {
		Toast.toast.show(option, (res) => {
			console.log(res)
		})
	}
}