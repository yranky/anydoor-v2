export default class DialogModule {
    //初始化模块
    private constructor() {}
    static getInstance(): DialogModule {
        if (uni.$anydoor.DialogModule === undefined) {
            uni.$anydoor.DialogModule = new DialogModule()
            //初始化
            uni.$anydoor_native.Dialog_Module.init({});
        }
        return uni.$anydoor.DialogModule
    }
}