<script setup>
import { useUserStore } from '@/stores/userstore.js'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import avatar from '@/assets/avatar.png'

const userStore = useUserStore()
const router = useRouter()
const isCollapse = ref(true)

const pageTitle = ref('欢迎来到光迹-视觉服务可信交易平台')
watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    switch (newPath) {
      case '/works/WorkList':
        pageTitle.value = '作品列表'
        break
      case '/works/WorksCreate':
        pageTitle.value = '作品上传'
        break
      case '/works/MyWorks':
        pageTitle.value = '我的作品'
        break
      case '/demand/publish':
        pageTitle.value = '发布需求'
        break
      case '/demand/search':
        pageTitle.value = '寻找需求'
        break
      case '/demand/my':
        pageTitle.value = '我的需求'
        break
      case '/order/all':
        pageTitle.value = '全部订单'
        break
      case '/order/pending':
        pageTitle.value = '待处理订单'
        break
      case '/order/finished':
        pageTitle.value = '已完成订单'
        break
      case '/user/profile':
        pageTitle.value = '基本资料'
        break
      case '/user/dashboard':
        pageTitle.value = '数据看板'
        break
      case '/user/setting':
        pageTitle.value = '账户设置'
        break
      default:
        pageTitle.value = '欢迎来到光迹-视觉服务可信交易平台'
    }
    
  },
  { immediate: true }
)
const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  } else {
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside 
      :width="isCollapse ? '64px' : '200px'"
      class="sidebar-transition"
      @mouseenter="isCollapse = false"
      @mouseleave="isCollapse = true"
    >
      <div class="el-aside__logo" :class="{ collapsed: isCollapse }"></div>
    
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :hover-timeout="200" 
        :default-active="$route.path"
        text-color="#fff"
        router
        :collapse="isCollapse"
        unique-opened  
        :default-openeds="['sub-menu-works']" 
     
      
      >
        <!-- ====================== 作品分享交流论坛 ====================== -->
        <el-sub-menu index="sub-menu-works" >
          <template #title>
            <el-icon><CameraFilled /></el-icon>
            <span>作品分享</span>
          </template>
          <el-menu-item index="/works/WorkList">
            <el-icon><List /></el-icon>
            <span>作品列表</span>
          </el-menu-item>
          <el-menu-item index="/works/WorksCreate">
            <el-icon><Upload /></el-icon>
            <span>作品上传</span>
          </el-menu-item>
          <el-menu-item index="/works/MyWorks">
            <el-icon><Postcard /></el-icon>
            <span>我的作品</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- ====================== 商业需求 ====================== -->
        <el-sub-menu index="sub-menu-demand">
          <template #title>
            <el-icon><Collection /></el-icon>
            <span>商业需求</span>
          </template>
          <el-menu-item index="/demand/publish">
             <el-icon><List /></el-icon>
            <span>发布需求</span>
          </el-menu-item>
          <el-menu-item index="/demand/search">
             <el-icon><Upload /></el-icon>
             <span>寻找需求</span>
          </el-menu-item>
          <el-menu-item index="/demand/my">
             <el-icon><Postcard /></el-icon>
             <span>我的需求</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- ====================== 我的订单 ====================== -->
        <el-sub-menu index="sub-menu-order">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>我的订单</span>
          </template>
          <el-menu-item index="/order/all">
            <el-icon><List /></el-icon>
            <span>全部订单</span>
          </el-menu-item>
          <el-menu-item index="/order/pending">
            <el-icon><More /></el-icon>
            <span>待处理</span>
          </el-menu-item>
          <el-menu-item index="/order/finished">
            <el-icon><CircleCheck /></el-icon>
            <span>已完成</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- ====================== 个人中心 ====================== -->
        <el-sub-menu index="sub-menu-user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/dashboard">
            <el-icon><Operation /></el-icon>
            <span>数据看板</span>
          </el-menu-item>
          <el-menu-item index="/user/setting">
            <el-icon><Crop /></el-icon>
            <span>账户设置</span>
          </el-menu-item>
        </el-sub-menu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div>
          <span class="app-name">{{pageTitle}}</span>
        </div>

        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.userInfo?.avatar || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">
                基本资料
              </el-dropdown-item>
              <el-dropdown-item command="dashboard" :icon="Crop">
                数据看板
              </el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">
                重置密码
              </el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer>光迹-视觉服务可信交易平台 ©2026</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .sidebar-transition {
    transition: width 0.3s ease !important;
  }
  .el-aside {
    background-color: #232323;
    overflow: hidden;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 150px auto;
      background-position: center;
      transition: all 0.3s ease;
      
      &.collapsed {
        background-size: 40px auto;
      }
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>