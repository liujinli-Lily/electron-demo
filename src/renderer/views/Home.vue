<template>
    <div style="height: 100%; display: flex;">
        <LeftBar>
            <div class="avatar">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
        </LeftBar>
        <div class="m-containter">
            <TitleBar :styles="'background: none'"/>
            <div>
                <router-view style="width: 100%"/>
            </div>
        </div>

    </div>

</template>

<script>

import LeftBar from '@/components/LeftBar.vue';
import TitleBar from '../components/TitleBar';
export default {
    name: 'Home',
    components: {
        LeftBar,
        TitleBar,
    },
};
</script>

<style scoped lang="scss">
    .m-containter{
        flex: 1;
    }
</style>
