import {showOption} from "./interface/define"

const toast = uni.requireNativePlugin("anydoor_toast")

export function show(option: showOption) {
	toast.show(option)
}