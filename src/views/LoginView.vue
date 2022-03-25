<template>
  <div class="login">
    <!-- <el-button @click="$store.commit('login')">Login</el-button> -->
    <div class="logo-wrapper">
      <img class="logo-img" src="../../public/assets/images/aspis_logo.png" />
    </div>
    <el-card class="card">
      <el-form>
        <el-form-item label="email">
          <el-input clearable v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input
            clearable
            type="password"
            v-model="formData.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button plain type="success">Login</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
};
</script>

<style lang="scss">
.logo-img {
  width: 200px;
  height: 200px;
}

.card {
  max-width: 400px;
  margin: auto;
}

@media (max-width: 500px) {
  .card {
    margin: 0px 15px;
  }
}
</style>
