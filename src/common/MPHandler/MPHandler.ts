import useJiaowuStore from "@/store/jiaowu"
import { EVENT_TYPE, IOnUniMPEventReceiveResult } from "./IMPHandler"

export default class MPHandler {
    //构造函数
    private constructor() { }

    public static getInstance() {
        //如果没有就重新加载
        if (uni.$anydoor.MPHandler === undefined) {
            uni.$anydoor.MPHandler = new MPHandler()
        }
        //开启监听
        uni.$anydoor.MPHandler.listen()
        return uni.$anydoor.MPHandler
    }

    //监听消息
    private listen() {
        uni.$anydoor_native.MP.onUniMPEventReceive((res: IOnUniMPEventReceiveResult<any>) => {
            if (res.event === EVENT_TYPE.LOGIN_JW) this.getJwInfo(res.fromAppid, res.event, res.data.uuid)
        })
    }

    //获取教务信息
    private getJwInfo(fromAppId: string, event: EVENT_TYPE, uuid: string) {
        const jiaowuStore = useJiaowuStore()
        //是否登录
        const isLogin = jiaowuStore.isLogin
        //账户
        const account = jiaowuStore.jiaowuAccount
        //id
        const config = jiaowuStore.jiaowuConfig
        uni.$anydoor_native.MP.sendUniMPEvent(fromAppId, event, {
            uuid: uuid,
            data: {
                isLogin,
                account,
                config
            }
        })
    }
}