import Vue from "vue";

new Vue({
  el: "#burger-place",
  template: "#burger-li",
  components: {},
  data() {
    return {};
  },
  methods: {
    showBurgerMenu() {
      const body = document.querySelector("body");
      body.classList.add("menu-opened");

      document.querySelector(".x-close-btn").addEventListener("click", (e) => {
        body.classList.remove("menu-opened");
      });
    },
  },
});
