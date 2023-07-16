// 计算文件大小
export default function fileSize(size: number): string {
    try {
        //计算kb
        let filesize = size / 1024
        if (filesize > 1024) {
            filesize = filesize / 1024
            if (filesize > 1024) {
                filesize = filesize / 1024
                if (filesize > 1024) {
                    filesize = filesize / 1024
                    return filesize.toFixed(2) + "Tb"
                } else {
                    return filesize.toFixed(2) + "Gb"
                }
            } else {
                return filesize.toFixed(2) + "Mb"
            }
        } else {
            return filesize.toFixed(2) + "Kb"
        }
    } catch { }
    return "未知"
}