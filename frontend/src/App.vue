<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <router-link to="/">Home</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
import { ref, provide } from 'vue'
import store from '@/store'

export default {
  setup() {
    provide('store', store)
    const activeMenu = ref('1')

    return {
      activeMenu,
    }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>