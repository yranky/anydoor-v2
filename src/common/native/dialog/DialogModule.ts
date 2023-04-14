export default class DialogModule {
    //初始化模块
    private constructor() {}
    static getInstance(): DialogModule {
        if (uni.$anydoor.DialogModule === undefined) {
            uni.$anydoor.DialogModule = new DialogModule()
        }
        return uni.$anydoor.DialogModule
    }
}