<template>
    <!-- 列表项 -->
    <view @click="itemClick" @longpress="menuShow = true" class="download-item">
        <view class="download-item-icon" :style="{
            backgroundColor: color.csscolor
        }">
            <image :src="iconUrl" class="download-item-icon-image" />
        </view>
        <view class="download-item-info">
            <anydoorText class="download-item-info-title" :lines="1" :text="props.itemInfo.filename" :font-size="30" />
            <view class="download-item-info-detail-container">
                <anydoorText :lines="1" :text="itemInfoText" color="grey" :font-size="25" />
                <anydoorText :lines="1" :text="itemRateText" color="grey" :font-size="25" />
            </view>
        </view>
        <view class="download-item-close" @click.stop="menuShow = true">
            <tm-icon :font-size="30" color="grey" name="tmicon-gengduo"></tm-icon>
        </view>
        <tm-action-menu @change="menuItemClick" v-model="menuShow" :list="actionList"></tm-action-menu>
    </view>
</template>
<script lang="ts" setup>
import fileType from "@/common/utils/fileType"
import anydoorText from "@/components/anydoor-text/anydoor-text.vue"
import { ref } from "vue"
import theme from "@/tmui/tool/theme/theme"
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue"
import tmActionMenu from "@/tmui/components/tm-action-menu/tm-action-menu.vue"
import { computed } from "vue"
import { TASK_STATE, TASK_STATE_NAME } from "@/common/native/download/IDownloadModule"
import { STATUS_TYPE } from "@/common/define/status"
import ToastModule from "@/common/native/toast/ToastModule"
import DownloadModule, { IDownloadTask } from "@/common/native/download/DownloadModule"
enum ACTION_TYPE {
    //打开
    OPEN = "open",
    //取消任务
    CANCEL = "cancel",
    //列表移除
    REMOVE = "remove",
    //彻底单数
    DELETE = "delete",
    //重新下载
    RE_DOWNLOAD = "re_download"
}


const props = defineProps({
    itemInfo: {
        type: Object,
        default: () => {
            return {

            }
        }
    }
});

const itemInfoText = computed(() => {
    return props.itemInfo.current + "/" + props.itemInfo.total
})

const itemRateText = computed(() => {
    return props.itemInfo.status === TASK_STATE.RUNNING ? props.itemInfo.rate : statusFilter(props.itemInfo.status)
})

const menuShow = ref<boolean>(false)

const emits = defineEmits(['itemClick'])

//menuItemClick
const menuItemClick = (listitem: any, index: number) => {
    switch (listitem.id) {
        //取消任务，未完成的任务才有(和移除任务一样)
        case ACTION_TYPE.CANCEL:
            //取消任务
            removeTask(true)
            break
        case ACTION_TYPE.DELETE:
            //取消任务
            removeTask(true)
            break
        case ACTION_TYPE.REMOVE:
            //删除任务
            removeTask()
            break
        case ACTION_TYPE.OPEN:
            openFile()
            break
        case ACTION_TYPE.RE_DOWNLOAD:
            reDownload()
            break
    }
}

//打开文件
function openFile() {
    uni.openDocument({
        filePath: props.itemInfo.detail.filePath,
        fail: (res) => {
            ToastModule.show({ text: "无法打开当前文件" })
        }
    });
}

//重新下载
async function reDownload() {
    const res: any = await removeTask(true, false)
    if (res.success === true) {
        //重新创建任务
        DownloadModule.getInstance().create(props.itemInfo.detail.url || "")
    } else {
        ToastModule.show({ text: "失败!" })
    }
}

//移除任务
function removeTask(removeFile: boolean = false, toast: boolean = true) {
    return new Promise(resolve => {
        //不删除文件
        if (removeFile === false) {
            DownloadModule.getInstance().removeRecord(props.itemInfo.detail.taskId)
        } else {
            //删除文件
            uni.removeSavedFile({
                filePath: props.itemInfo.detail.filePath,
                success: () => {
                        DownloadModule.getInstance().removeRecord(props.itemInfo.detail.taskId)
                        // toast && ToastModule.show({ text: "成功!" })
                        resolve({ success: true })
                },
                fail: (fail) => {
                    //只是路径问题
                    if (fail.code === 14) {
                        DownloadModule.getInstance().cancel({
                            taskId: props.itemInfo.detail.taskId,
                            removeFile: true
                        }, () => {
                            DownloadModule.getInstance().removeRecord(props.itemInfo.detail.taskId)
                            // toast && ToastModule.show({ text: "成功!" })
                            resolve({ success: true })
                        })
                    } else {
                        toast && ToastModule.show({ text: fail.errMsg })
                        resolve({ success: false })
                    }
                }
            })
        }
    })

}

//action
const actionList = computed(() => {
    //如果任务已经完成
    if (props.itemInfo.detail.isComplete) {
        return [
            { text: "从列表移除", id: ACTION_TYPE.REMOVE },
            { text: '打开', id: ACTION_TYPE.OPEN },
            { text: '彻底删除', id: ACTION_TYPE.DELETE }
        ]
    } else {
        return [{
            text: '重新下载', id: ACTION_TYPE.RE_DOWNLOAD
        }, {
            text: '取消任务', id: ACTION_TYPE.CANCEL
        }]
    }
})

const itemClick = () => {

    try {
        //如果下载完成了
        if (props.itemInfo.detail.isComplete) openFile()
    } catch {

    }
    emits("itemClick", props.itemInfo)
}

// 图标
const iconUrl = computed(() => {
    return fileType(props.itemInfo.filename || '', true)
})

//颜色
const color = theme.getColor("primary")

//状态
const statusFilter = (status: STATUS_TYPE): string => {
    return TASK_STATE_NAME[status] || "未知"
}
</script>
<style lang="scss" scoped>
.download-item {
    padding: 20rpx 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    //下载元素的图标
    .download-item-icon {
        width: 70rpx;
        height: 70rpx;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 5rpx;
        flex-grow: 0;
        flex-shrink: 0;

        .download-item-icon-image {
            width: 50rpx;
            height: 50rpx;
            margin: 10rpx;
        }
    }

    // 下载信息
    .download-item-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 0 0 20rpx;
        width: 550rpx;

        // 主题
        .download-item-info-title {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        //下载元信息
        .download-item-info-detail-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }

    // 右侧删除图标
    .download-item-close {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 70rpx;
        align-items: center;
        height: 50rpx;
    }
}
</style>