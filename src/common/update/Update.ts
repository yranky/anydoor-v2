export default class Update {
    private constructor() {
    }

    //获取实例对象
    static getInstance() {
        if (uni.$anydoor.Update === undefined) {
            uni.$anydoor.Update = new Update()
        }
        return uni.$anydoor.Update
    }

    //检查是否有更新
    check() {
        //先请求接口，判断是否有更新
    }

    //更新
    update() {
        
    }
}