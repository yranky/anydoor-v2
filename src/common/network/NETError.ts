//状态
export enum STATUS {
	EMPTY = "empty",
	ERROR = "error",
	SUCCESS = "success",
	WARNING = "warning",
	LOCK = "lock",
	NETWORK = "network"
}

export enum ACTION {
	RETRY = "重试",
	DEFAULT = ""
}
//网络错误
export default interface NETError {
	name: string,
	show: boolean,
	color: string,
	status: STATUS,
	btnText: ACTION,
	title: string,
	subTitle: string,
	showBtn: boolean,
	value: number
}