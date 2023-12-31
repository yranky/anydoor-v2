import IResult from "../IResult";

export default interface IToolModeleNative {
    clearWebviewCache(option: {}, callbackfn?: (result: IResult<undefined>) => void): void
    clearWebviewCacheSync(option: {}): IResult<undefined>
    postErrorSync(option: { content: string }): IResult<undefined>
    getAppNameFromSchemaSync(option: IGetAppNameFromSchema): IResult<IGetAppNameFromSchemaResultItem[]>
    checkIsDarkModeSync(option: {}): boolean
}

interface IGetAppNameFromSchema {
    schema: string
}

interface IGetAppNameFromSchemaResultItem {
    name: string
}