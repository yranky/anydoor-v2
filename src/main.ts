/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-18 20:24:23
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-12 17:28:24
 * @FilePath: \anydoor-v2\src\main.ts
 * @Description: 入口文件
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import { createSSRApp } from "vue"
import * as Pinia from 'pinia'
import tmui from "./tmui"
import App from "./App.vue"
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia());
  app.use(tmui)
  return {
    app,
    Pinia,
  };
}
