<template>
  <div class="about">
    <h1>This is the login page</h1>
    <el-button @click="$store.commit('login')">Login</el-button>
    <el-button @click="$store.commit('logout')">Log out</el-button>
  </div>
</template>
