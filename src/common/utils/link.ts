export function linkTo(path: string, data: any = {}) {
    uni.navigateTo({
        url: `${path}?data=${encodeURIComponent(JSON.stringify(data))}`
    })
}