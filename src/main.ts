/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-18 20:24:23
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-16 21:21:16
 * @FilePath: \anydoor-v2\src\main.ts
 * @Description: 入口文件
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import { createSSRApp } from "vue"
import * as Pinia from 'pinia'
import tmui from "./tmui"
import App from "./App.vue"
import theme from "./theme/index"
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia());
  app.use(tmui, {
    theme: theme
  } as Tmui.tmuiConfig)
  return {
    app,
    Pinia,
  };
}
