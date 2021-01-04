<template>
    <div class="left">
        <div class="avatar">
            <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div class="menu-item" @click="$router.push('/home/index')">
            <div>
                <span class="el-icon-chat-round"></span>
            </div>
            <div>
                <span>消息</span>
            </div>
        </div>
        <div class="menu-item" @click="$router.push('/home/calendar')">
            <div>
                <span class="el-icon-date"/>
            </div>
            <div>
                <span>日程</span>
            </div>
        </div>
        <div class="menu-item" @click="$router.push('/home/send-message')">
            <div>
                <span class="el-icon-message-solid"/>
            </div>
            <div>
                <span>send</span>
            </div>
        </div>
        <div class="menu-item" @click="openCalendarWindow">
            <div>
                <span class="el-icon-message-solid"/>
            </div>
            <div>
                <span>open</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron';
    export default {
        name: 'LeftBar',
        methods: {
            openCalendarWindow() {
                ipcRenderer.send('openCalendarWindow');
            },
        },
    };
</script>

<style scoped lang="scss">
    .left{
        /*width: 80px;*/
        /*height: 100%;*/
        width: 80px;
        height: 100vh;
        text-align: center;
        background: #1FD3F7;
        -webkit-app-region: drag; // 可拖动
        .avatar{
            margin-top: 20px;
        }
        .menu-item{
            -webkit-app-region: no-drag; // 不可拖动
            margin-top: 20px;
            /*opacity: 0.6;*/
            &:hover{
                opacity: 1
            }
            span{
                color: #fff;
                font-size: 14px;
            }
        }
    }
</style>
