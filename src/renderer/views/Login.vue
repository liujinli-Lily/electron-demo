<template>
    <div>
        <TitleBar>
            <span class="m-header-title">密码登录</span>
        </TitleBar>
        <div class="main">
            <div class="avatar">
                <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="item">
                <el-input placeholder="请输入账号" v-model="account" clearable prefix-icon="el-icon-user"></el-input>
            </div>
            <div class="item">
                <el-input placeholder="请输入密码" v-model="password" show-password prefix-icon="el-icon-lock"></el-input>
            </div>
            <div class="item">
                <el-button type="primary" round @click="login">登录</el-button>
<!--                <el-button round @click="$router.push('/')">取消</el-button>-->
            </div>
        </div>
    </div>
</template>

<script type="module">
import { ipcRenderer } from 'electron';
import TitleBar from '@/components/TitleBar';
export default {
    name: 'Login',
    components: {
        TitleBar,
    },
    data() {
        return {
            account: '',
            password: '',
        };
    },
    mounted() {
        this.changeWindowSize();
    },
    methods: {
        changeWindowSize() {
            ipcRenderer.send('changWindowSize', { width: 400, height: 500 });
        },
        login() {
            if (this.account === 'admin' && this.password === '123456') {
                this.$router.push('Home');
            } else {
                this.$message.error('用户名或密码错误');
            }
        },
        minimize() {
            ipcRenderer.send('minimize');
        },
        close() {
            ipcRenderer.send('close');
        },
    },
};
</script>

<style scoped lang="scss">
.main{
    margin-left:30px;
    margin-right:30px;
    text-align: center;
}
.avatar{
    margin-top: 40px;
    margin-bottom: 40px;
}
.item{
    margin-top: 20px;
}

button{
    width: 100%
}
</style>
