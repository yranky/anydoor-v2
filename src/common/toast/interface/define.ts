/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-10-06 16:17:15
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-01-26 10:42:46
 * @FilePath: \anydoor-v2\src\common\toast\interface\define.ts
 * @Description: 通知的一些定义
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
interface showOption {
	postion?: position,
	text: String
}


enum position {
	top = "top",
	center = "center",
	bottom = "bottom"
}

export {
	position,
	showOption
}