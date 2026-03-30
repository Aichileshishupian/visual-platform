<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/home">首页</router-link>
      <router-link to="/work">作品</router-link>
      <router-link to="/demand">需求</router-link>
      <router-link to="/order">订单</router-link>
      <router-link to="/user">我的</router-link>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style>

</style>