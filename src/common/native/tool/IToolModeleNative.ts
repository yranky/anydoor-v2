import IResult from "../IResult";

export default interface IToolModeleNative {
    clearWebviewCache(option: {}, callbackfn?: (result: IResult<undefined>) => void): void
    clearWebviewCacheSync(option: {}): IResult<undefined>
    postErrorSync(option: { content: string }): IResult<undefined>
    getAppNameFromSchemaSync(option: IGetAppNameFromSchema): IResult<IGetAppNameFromSchemaResultItem[]>
    onThemeChange(option: {}, callbackfn?: (result: IResult<boolean>) => void): void
}

interface IGetAppNameFromSchema {
    schema: string
}

interface IGetAppNameFromSchemaResultItem {
    name: string
}