<template>
    <div class="title-bar" :style="styles">
        <slot/>
        <div class="right">
            <span class="el-icon-close" @click="close" />
            <span v-if="isMax" class="el-icon-copy-document" @click="unmaximize" />
            <span v-else class="u-max" @click="maximize" />
            <span class="el-icon-minus" @click="minimize"/>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
    name: 'TitleBar',
    props: {
       styles: {
           type: String,
           default() {
               return 'background:#1FD3F7;';
           },
       },
    },
    data() {
       return {
           isMax: false,
       };
    },
    mounted() {
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
        minimize() {
            ipcRenderer.send('minimize');
        },
        close() {
            ipcRenderer.send('close');
        },
        unmaximize() {
            ipcRenderer.send('unmaximize');
        },
        maximize() {
            ipcRenderer.send('maximize');
        },
    },
};
</script>

<style scoped lang="scss">
    .title-bar{
        height: 50px;
        /*line-height: 50px;*/
        /*background: #1FD3F7;*/
        padding: 0 10px;
        -webkit-app-region: drag; // 可拖动
        .right{
            position: absolute;
            top: 0px;
            right: 0px;
            -webkit-app-region: no-drag; // 不可拖动
        }
        .right span{
            width:20px;
            height:20px;
            float:right;
            margin-top:15px;
            margin-right:15px;

        }
        .u-max{
            position: relative;
            &:after{
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                content: "";
                border: 1px solid #666;
                height: 12px;
                width: 12px;
                background: transparent;
            }
        }
    }
</style>
