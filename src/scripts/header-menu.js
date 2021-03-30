import Vue from "vue";

new Vue({
  el: "#headermenu",
  template: "#header-menu",
  components: {},
  data() {
    return {
      menuItems: [
        ["Обо мне", "#about"],
        ["Навыки", "#values"],
        ["Работы", "#works"],
        ["Отзывы", "#reviews"],
      ],
    };
  },
  methods: {},
});
