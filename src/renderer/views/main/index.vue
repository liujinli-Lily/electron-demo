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
                <div class="demo-image__lazy">
<!--                    <img src="../../assets/images/img_1.jpeg"/>-->
                    <el-image v-for="url in urls" :key="url" :src="url"></el-image>
                </div>
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
            urls: [
                'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            ],
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
    .demo-image__lazy{
        height: 320px;
        overflow-y: auto;
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
