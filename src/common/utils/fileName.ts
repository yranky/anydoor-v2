//解析文件名
export function getFileNameFromDownload(contentDisposition: string, downloadLink: string): string {
    if (contentDisposition) {
        const match = contentDisposition.match(/filename=(.+)$/);
        if (match) {
            return match[1];
        }
    }
    // 解析下载链接中的文件名
    if (downloadLink.indexOf('?') !== -1) {
        downloadLink = downloadLink.substring(0, downloadLink.indexOf('?'));
    }
    const index = downloadLink.lastIndexOf('/');
    if (index !== -1) {
        return downloadLink.substring(index + 1);
    }
    // 无法解析文件名则返回当前时间戳
    return "未知文件";
}