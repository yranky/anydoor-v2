import NETError from "./NETError"
import { STATUS, ACTION } from "./NETError"
import { last, cloneDeep } from "lodash"
export const errorCodeList: Array<NETError> = [
	{
		name: "ERROR_AUTHENTICATION",
		title: "连接错误",
		subTitle: "未授权",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -4
	}, {
		name: "ERROR_BAD_URL",
		title: "连接失败",
		subTitle: "不正确的url",
		btnText: ACTION.DEFAULT,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: false,
		show: true,
		value: -12
	}, {
		name: "ERROR_CONNECT",
		title: "网络错误",
		subTitle: "服务器连接失败",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -6
	}, {
		name: "ERROR_FAILED_SSL_HANDSHAKE",
		title: "连接错误",
		subTitle: "SSL握手失败",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -11
	}, {
		name: "ERROR_FILE",
		title: "错误",
		subTitle: "通用文件错误",
		btnText: ACTION.DEFAULT,
		color: "red",
		status: STATUS.ERROR,
		showBtn: false,
		show: true,
		value: -13
	}, {
		name: "ERROR_FILE_NOT_FOUND",
		title: "错误",
		subTitle: "未找到文件",
		btnText: ACTION.DEFAULT,
		color: "red",
		status: STATUS.ERROR,
		showBtn: false,
		show: true,
		value: -14
	}, {
		name: "ERROR_HOST_LOOKUP",
		title: "网络错误",
		subTitle: "请检查网络",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -2
	}, {
		name: "ERROR_IO",
		title: "错误",
		subTitle: "IO错误",
		btnText: ACTION.DEFAULT,
		color: "red",
		status: STATUS.ERROR,
		showBtn: false,
		show: true,
		value: -7
	}, {
		name: "ERROR_PROXY_AUTHENTICATION",
		title: "连接错误",
		subTitle: "代理用户验证失败",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -5
	}, {
		name: "ERROR_REDIRECT_LOOP",
		title: "连接错误",
		subTitle: "重定向次数过多",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -9
	}, {
		name: "ERROR_TIMEOUT",
		title: "网络错误",
		subTitle: "连接超时",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -8
	}, {
		name: "ERROR_TOO_MANY_REQUESTS",
		title: "连接错误",
		subTitle: "请求次数过多",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -15
	}, {
		name: "ERROR_UNKNOWN",
		title: "未知错误",
		subTitle: "",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.ERROR,
		showBtn: true,
		show: true,
		value: -1
	}, {
		name: "ERROR_UNSAFE_RESOURCE", title: "连接错误",
		subTitle: "安全浏览策略取消了资源加载",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: -16
	}, {
		name: "ERROR_UNSUPPORTED_AUTH_SCHEME",
		title: "连接错误",
		subTitle: "不支持的身份验证方案",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: false,
		show: true,
		value: -3
	}, {
		name: "ERROR_UNSUPPORTED_SCHEME",
		title: "连接错误",
		subTitle: "不支持的URI方案",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: false,
		show: true,
		value: -10
	}, {
		name: "SAFE_BROWSING_THREAT_BILLING",
		title: "错误",
		subTitle: "该资源已被阻止，因为它可能会诱骗用户签订计费协议",
		btnText: ACTION.DEFAULT,
		color: "red",
		status: STATUS.ERROR,
		showBtn: false,
		show: true,
		value: 4
	}, {
		name: "SAFE_BROWSING_THREAT_MALWARE",
		title: "错误",
		subTitle: "资源被阻止，因为它包含恶意软件",
		btnText: ACTION.DEFAULT,
		color: "red",
		status: STATUS.ERROR,
		showBtn: false,
		show: true,
		value: 1
	}, {
		name: "SAFE_BROWSING_THREAT_PHISHING",
		title: "错误",
		subTitle: "资源被阻止，因为它包含欺骗性内容",
		btnText: ACTION.DEFAULT,
		color: "red",
		status: STATUS.ERROR,
		showBtn: false,
		show: true,
		value: 2
	}, {
		name: "SAFE_BROWSING_THREAT_UNKNOWN",
		title: "错误",
		subTitle: "资源因未知原因被阻止",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.ERROR,
		showBtn: true,
		show: true,
		value: 0
	}, {
		name: "SAFE_BROWSING_THREAT_UNWANTED_SOFTWARE",
		title: "错误",
		subTitle: "资源被阻止，因为它包含不需要的软件",
		btnText: ACTION.DEFAULT,
		color: "red",
		status: STATUS.ERROR,
		showBtn: false,
		show: true,
		value: 3
	},
	//这个始终放最后
	{
		name: "DEFALUT",
		title: "未知错误",
		subTitle: "",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.ERROR,
		showBtn: true,
		show: true,
		value: 900
	}
]

//http错误
export const httpErrorCodeList: Array<NETError> = [
	{
		name: "Forbidden",
		title: "错误",
		subTitle: "网站拒绝访问",
		btnText: ACTION.RETRY,
		color: "red",
		status: STATUS.NETWORK,
		showBtn: true,
		show: true,
		value: 403
	}
]

export default function getError(code: number, errorType: string = "error") {
	if (errorType === "error") {
		const item: NETError | undefined = errorCodeList.find(i => i.value === code) || last(errorCodeList)
		return cloneDeep(item)
	} else if (errorType === 'httpError') {
		const item: NETError | undefined = httpErrorCodeList.find(i => i.value == code)
		return typeof item === "undefined" ? {
			name: "",
			title: "",
			subTitle: "",
			btnText: ACTION.DEFAULT,
			color: "red",
			STATUS: STATUS.ERROR,
			showBtn: false,
			show: false,
			value: -999
		} : cloneDeep(item)
	}
	return {
		name: "",
		title: "",
		subTitle: "",
		btnText: ACTION.DEFAULT,
		color: "red",
		STATUS: STATUS.ERROR,
		showBtn: false,
		show: false,
		value: -999
	}
}