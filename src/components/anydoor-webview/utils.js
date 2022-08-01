export default {
	CACHE: {
		DEFAULT: "1",
		//不使用缓存
		NO_CACHE: "2",
		//只要本地有，无论是否过期，或者no-cache，都使用缓存中的数据。本地没有缓存时才从网络上获取。
		LOAD_CACHE_ELSE_NETWORK: "3",
		//只加载本地缓存
		LOAD_CACHE_ONLY: "4"
	}
}
