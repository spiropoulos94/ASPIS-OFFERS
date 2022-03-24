<template>
  <div class="login">
    <!-- <el-button @click="$store.commit('login')">Login</el-button> -->
    <div class="logo-wrapper">
      <img class="logo-img" src="../../public/assets/images/aspis_logo.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.logo-img {
  width: 200px;
  height: 200px;
}
</style>
