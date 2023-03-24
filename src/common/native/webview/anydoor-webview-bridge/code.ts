export enum CODE {
    //数据解析错误
    PARSE_ERROR = 100,
    //成功
    SUCCESS = 200,
    //数据传输时错误
    FAIL_ON_SEND = 300
}


export const CODE_MSG: ICODE_MSG<CODE> = {
    [CODE.PARSE_ERROR]: '数据解析错误',
    [CODE.SUCCESS]: "ok",
    [CODE.FAIL_ON_SEND]: "数据传输时错误"
}


export type ICODE_MSG<T extends string | number | symbol> = {
    [key in T]: string
}