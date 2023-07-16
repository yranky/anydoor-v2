/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-18 20:24:23
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-13 10:11:29
 * @FilePath: \anydoor-v2\src\env.d.ts
 * @Description: 声明
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
/// <reference types="vite/client" />

import Theme from "@/common/theme/Theme"
import Lesson from "./common/database/Lesson/Lesson"
import MProgram from "./common/database/mprogram/MProgram"
import BTongjiModule from "./common/native/baidu_tongji/BTongjiModule"
import BuglyModule from "./common/native/bugly/BuglyModule"
import DownloadModule from "./common/native/download/DownloadModule"
import ToastModule from "./common/native/toast/ToastModule"
import IBTonbgjiModuleNative from "./common/native/baidu_tongji/IBTongjiModule"
import IBuglyModuleNative from "./common/native/bugly/IBuglyModule"
import IDownloadModuleNative from "./common/native/download/IDownloadModule"
import IToastModuleNative from "./common/native/toast/IToastModule"
import Device from "./common/database/device/Device"
import User from "./common/database/user/User"
import IDialogModuleNative from "./common/native/dialog/IDialogModule"
import DialogModule from "./common/native/dialog/DialogModule"
import Update from "./common/update/Update"
import IToolModeleNative from "./common/native/tool/IToolModeleNative"
import MPHandler from "./common/MPHandler/MPHandler"

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare global {
  interface $anydoor {
    Theme?: Theme,
    Lesson?: Lesson,
    MProgram?: MProgram,
    BTongjiModule?: BTongjiModule,
    BuglyModule?: BuglyModule,
    DownloadModule?: DownloadModule,
    ToastModule?: ToastModule,
    DialogModule?: DialogModule,
    Device?: Device,
    User?: User,
    Update?: Update,
    MPHandler?: MPHandler
  }
  interface $anydoor_native {
    SQLite_Module: any,
    MP: any,
    BTongji_Module: IBTonbgjiModuleNative,
    Bugly_Module: IBuglyModuleNative,
    Download_Module: IDownloadModuleNative,
    Toast_Module: IToastModuleNative,
    Dialog_Module: IDialogModuleNative,
    Tool_Module: IToolModeleNative
  }
  interface Uni {
    $anydoor: $anydoor,
    $anydoor_native: $anydoor_native
  }
}

export { }