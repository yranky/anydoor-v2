interface IMProgramItem {
    mpid: string | number,
    unid: string | number,
    name: string,
    icon: string,
    wgt: string,
    create_time: string,
    update_time: string,
    password?: string,
    enableBackground: number | boolean,
    mp_vid: string | number,
    ext: string | Object
}