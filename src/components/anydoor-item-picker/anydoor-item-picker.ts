
export interface IListArray {
    label: string | number,
    value: string | number
}

export type Ilist = IListArray | string | number


export enum CONFIG_TYPE {
    ONE = "one",
    TWO = "two",
    THREE = "three",
    FOUR = "four",
    FIVE = "five",
    SIX = "six"
}

export type IConfig = {
    [key in CONFIG_TYPE]: {
        margin: string,
        padding: string,
        width: string,
        height: string,
        boxMargin: string,
        boxPadding: string,
        lineHeight: string
    }
}

export const config: IConfig = {
    [CONFIG_TYPE.ONE]: {
        //外边距
        margin: "10rpx 25rpx",
        //内边距
        padding: "0 20rpx",
        //宽度
        width: "700rpx",
        //高度
        height: "80rpx",
        //外部盒子的外边距
        boxMargin: "0",
        //外部盒子的内边距
        boxPadding: "0",
        //文字的行高
        lineHeight: "80rpx"
    },
    [CONFIG_TYPE.TWO]: {
        //外边距
        margin: "10rpx 25rpx",
        //内边距
        padding: "0 20rpx",
        //宽度
        width: "325rpx",
        //高度
        height: "80rpx",
        //外部盒子的外边距
        boxMargin: "0",
        //外部盒子的内边距
        boxPadding: "0",
        //文字的行高
        lineHeight: "80rpx"
    },
    [CONFIG_TYPE.THREE]: {
        //外边距
        margin: "10rpx 25rpx",
        //内边距
        padding: "0 20rpx",
        //宽度
        width: "200rpx",
        //高度
        height: "80rpx",
        //外部盒子的外边距
        boxMargin: "0",
        //外部盒子的内边距
        boxPadding: "0",
        //文字的行高
        lineHeight: "80rpx"
    },
    [CONFIG_TYPE.FOUR]: {
        //外边距
        margin: "10rpx",
        //内边距
        padding: "0 10rpx",
        //宽度
        width: "167.5rpx",
        //高度
        height: "80rpx",
        //外部盒子的外边距
        boxMargin: "0",
        //外部盒子的内边距
        boxPadding: "0",
        //文字的行高
        lineHeight: "80rpx"
    },
    [CONFIG_TYPE.FIVE]: {
        //外边距
        margin: "10rpx 10rpx",
        //内边距
        padding: "0 10rpx",
        //宽度
        width: "130rpx",
        //高度
        height: "80rpx",
        //外部盒子的外边距
        boxMargin: "0",
        //外部盒子的内边距
        boxPadding: "0",
        //文字的行高
        lineHeight: "80rpx"
    },
    [CONFIG_TYPE.SIX]: {
        //外边距
        margin: "10rpx",
        //内边距
        padding: "0 10rpx",
        //宽度
        width: "105rpx",
        //高度
        height: "105rpx",
        //外部盒子的外边距
        boxMargin: "0",
        //外部盒子的内边距
        boxPadding: "0",
        //文字的行高
        lineHeight: "105rpx"
    }
}