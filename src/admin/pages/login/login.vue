<template>
  <div class="login-page-component">
    <div class="login-content">
      <form class="form" @submit="handleSubmit">
        <p class="close-login" @click="closeModal">X</p>
        <h3 class="form-title">Авторизация</h3>
        <div class="row row--login">
          <app-input
            title="Логин"
            icon="user"
            v-model="user.name"
            :errorMessage="validation.firstError('user.name')"
          />
        </div>
        <div class="row">
          <app-input
            title="Пароль"
            icon="key"
            type="password"
            v-model="user.password"
            :errorMessage="validation.firstError('user.password')"
          />
        </div>
        <div class="btn">
          <app-button :disabled="isSubmitDisabled" title="Отправить" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import $axios from "../../requests";
import { mapActions } from "vuex";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": (value) => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": (value) => {
      return Validator.value(value).required("Введите пароль");
    },
  },
  data() {
    return {
      user: {
        name: "flyonk",
        password: "robagoba100500",
      },
      isSubmitDisabled: false,
    };
  },
  components: {
    appInput,
    appButton,
  },
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      login: "user/login"
    }),
    async handleSubmit() {
      if ((await this.$validate()) === false) return;

      this.isSubmitDisabled = true;

      try {
        const response = await $axios.post("/login", this.user);

        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        const response = await $axios.get("/user")
        this.login(user.response.data.user)

        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          text: error.response.data.error,
          type: "error",
        });
        console.log(error.response.data.error);
      } finally {
        this.isSubmitDisabled = false;
      }
    },
    closeModal() {
      document.querySelector(".login-content").style.display = "none";
      document.querySelector(".login-page-component").style.background = "transparent";
    },
  },
};
</script>

<style lang="postcss" src="./login.pcss"></style>
