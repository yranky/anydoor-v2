
/**
 * @param {*} ext
 * @return {*}
 * @description: 获取文件扩展图标
 */
export default function fileType(str:string='',fullname:boolean=false){
    try{
        if(fullname){
            const arr:string[]=str.split(".")
            str = arr[arr.length-1]
        }
    }catch{}
    for(let key in fileTypeIcon){
        if(fileTypeIcon[key].find((item:string)=>item.toLowerCase()===str.toLowerCase())!==undefined){
            return `/static/icon/files/${key}.png`
        }
    }
    return `/static/icon/files/file.png`
}


export const fileTypeIcon:{[key:string]:string[]} = {
    audio:["WAV","FLAC","APE","ALAC","WavPack","MP3","AAC","Ogg","Vorbis","Opus"],
    book:["azw3","mobi","djvu","epub","pdg"],
    excel:["xlsx","xls","csv"],
    file:[],
    folder:[],
    img:["bmp","jpg","jpeg","png","tif","gif","pcx","tga","exif","fpx","svg","psd","cdr","pcd","dxf","ufo","eps","ai","raw","WMF","webp","avif","apng"],
    pdf:['pdf'],
    ppt:["ppt","pps","pptx","pptm"],
    rar:["rar","7z"],
    txt:["txt"],
    word:['doc','docx'],
    zip:['zip'],
    app:['apk','jar'],
    video:["avi","wmv","mpeg","mp4","m4v","mov","asf","flv","f4v","rmvb","rm","3gp","vob","ts","m3u8"]
}