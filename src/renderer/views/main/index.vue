<template>
    <div class="m-message">
        <div class="left-content">
            <el-scrollbar class="file-list" wrap-class="scrollbar-filelist" :noresize="false" tag="ul">
                <li v-for="(item, index) in fileList" :key="index" class="file-item">
                    <div class="item-icon">
                        <el-avatar shape="square" :size="40" fit="fill" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
                    </div>

                    <p class="item-title">{{ item.title }}</p>
                    <p class="item-time">{{ item.time }}</p>
                </li>
            </el-scrollbar>
        </div>
        <div class="right-content">
            <div>

            </div>
        </div>
    </div>

</template>

<script>
import { ipcRenderer } from 'electron';
export default {
    name: 'Home',
    data() {
        return {
            fileList: [],
            fileItem: {
                title: 'electron',
                content: '',
            },
            isMax: false,
        };
    },
    mounted() {
        this.init();
        this.getScreen();
    },
    methods: {
        getScreen() {
            // 渲染进程 接收主进程消息
            ipcRenderer.on('unmaximize', (event, params) => {
                this.isMax = params;
            });
            ipcRenderer.on('isMax', (event, params) => {
                this.isMax = params;
            });
        },
        init() {
            for (let i = 0; i < 20; i += 1) {
                const item = {
                    id: i + 1,
                    title: `随便取名字${i}`,
                    time: '2020-11-10',
                };
                this.fileList.push(item);
            }
        },
        changeSize() {
            ipcRenderer.send('changWindowSize', { width: 1050, height: 700 });
        },
        minimize() {
            ipcRenderer.send('minimize');
        },
    },
};
</script>

<style lang="scss" scoped>
    .m-message{
        display: flex;
    }
    .right-content{
        flex: 1;
    }
    .left-content{
        width: 300px;
        height: calc(100% - 50px);
        border-right: 1px solid #eaeefb;
    }
    .file-list {
        user-select: none;
        .file-item {
            display: flex;
            align-items: center;
            height: 55px;
            border-bottom: 1px solid #eaeefb;
            .item-icon {
                margin-left: 0px;
                margin-right: 12px;
            }
            .item-title {
                flex: 1;
                margin-right: 5px;
                font-size: 14px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .item-time {
                width: 80px;
                font-size: 12px;
            }
        }
    }
</style>
<style lang="scss">
    .scrollbar-filelist {
        height: calc(100vh - 33px);
        overflow-x: hidden !important;
        ul{
            padding-left: 12px;
        }
    }
    .el-scrollbar__bar {
        opacity: 1;

        &.is-vertical {
            right: 0px;
            width: 5px;
            .el-scrollbar__thumb {
                background-color: rgba(144, 147, 153, 0.5);
            }
        }
    }
</style>
