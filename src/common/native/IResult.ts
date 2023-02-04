export default interface IResult<T> {
    //是否成功
    success: boolean
    //信息
    msg?: string
    //data
    data?: T
}