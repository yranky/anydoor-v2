import { getAnydoorHostMPInstance } from "@usc-anydoor/anydoor-mpc"


export function initAnydoorHostMPInstance() {
    getAnydoorHostMPInstance().addHandler({
        "jiaowu": async function (event: string, fromApp: string, data: any) {
            return { '哈哈哈': 123 }
        }
    })
}
