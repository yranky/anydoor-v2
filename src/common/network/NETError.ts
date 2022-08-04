
export enum status {
	empty = "empty",
	error = "error",
	success = "success",
	warning = "warning",
	lock = "lock",
	network = "network"
}

export enum action {
	retry = "重试",
	default = ""
}

export default interface NETError {
	name: string,
	show: boolean,
	color: string,
	status: status,
	btnText: action,
	title: string,
	subTitle: string,
	showBtn: boolean,
	value: number
}