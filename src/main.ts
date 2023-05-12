/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-18 20:24:23
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-10 17:12:29
 * @FilePath: \anydoor-v2\src\main.ts
 * @Description: 入口文件
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { createSSRApp } from "vue"
import * as Pinia from 'pinia'
import tmui from "./tmui"
import App from "./App.vue"
import config from "./config"

export function createApp() {
  const app = createSSRApp(App);
  //合并配置到tmui中
  app.use(tmui, { ...config } as any);
  return {
    app,
    Pinia,
  };
}
