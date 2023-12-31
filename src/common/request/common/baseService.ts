/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-11 21:36:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-16 10:09:07
 * @FilePath: \anydoor-v2\src\common\request\common\baseService.ts
 * @Description: axios
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
// import axios from 'axios'
import axios from 'uni-axios-ts'
// import vue from '@/main'

const service = axios.create({
  timeout: 20000,
  transformResponse: [
    // (data: string) => {
    //   try {
    //     return JSONBigInt({ storeAsString: true }).parse(data)
    //   } catch (e) {
    //     return data
    //   }
    // }
  ]
})

export default service
