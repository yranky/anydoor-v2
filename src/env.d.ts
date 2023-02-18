/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-18 20:24:23
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-18 10:18:16
 * @FilePath: \anydoor-v2\src\env.d.ts
 * @Description: 声明
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
/// <reference types="vite/client" />

import Theme from "@/common/theme/Theme"

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare global {
  interface $anydoor {
    Theme?: Theme
  }
  interface Uni {
    $anydoor: $anydoor
  }
}

export { }