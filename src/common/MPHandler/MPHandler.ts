import useJiaowuStore from "@/store/jiaowu"
import { getAnydoorHostMPInstance } from "@usc-anydoor/anydoor-mpc"


export function initAnydoorHostMPInstance() {
    getAnydoorHostMPInstance().addHandler({
        "jiaowu": async function (event: string, fromApp: string, data: any) {
            const jiaowuInfo = useJiaowuStore()
            return {
                account: jiaowuInfo.jiaowuAccount,
                login: jiaowuInfo.isLogin,
                config: jiaowuInfo.jiaowuConfig
            }
        },
        "close": function (event: string, fromApp: string, data: any) {
            return new Promise(resolve => {
                getAnydoorHostMPInstance().getModule().closeUniMP(fromApp, (ret) => {
                    resolve(ret)
                })
            })
        },
        "hide": function (event: string, fromApp: string, data: any) {
            return new Promise(resolve => {
                getAnydoorHostMPInstance().getModule().hideUniMP(fromApp, (ret) => {
                    resolve(ret)
                })
            })
        },
        "show": function (event: string, fromApp: string, data: any) {
            return new Promise(resolve => {
                getAnydoorHostMPInstance().getModule().showUniMP(fromApp, (ret) => {
                    resolve(ret)
                })
            })
        },
        "getMPversion": function (event: string, fromApp: string, data: any) {
            return new Promise(resolve => {
                getAnydoorHostMPInstance().getModule().getUniMPVersion(fromApp, (ret) => {
                    resolve(ret)
                })
            })
        }
    })
}
