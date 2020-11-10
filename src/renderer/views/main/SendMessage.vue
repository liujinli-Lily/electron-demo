<template>
     <div>
         <el-button @click="sendNotification">发送消息</el-button>
     </div>
</template>

<script>
    export default {
        name: 'SendMessage',
        methods: {
            sendNotification() {
                const myNotification = new window.Notification('标题', {
                    body: 'Electron-Vue 消息发送测试',
                });
                myNotification.onclick = () => {
                    console.log('通知被点击');
                };
            },
        },
    };
</script>

<style scoped>

</style>
