<template>
  <div :class="['addLine', { blocked: blocked }]">
    <div class="title">
      <app-input
        class="second-input"
        v-model="skill.title"
        placeholder="Новый навык"
        :errorMessage="validation.firstError('skill.title')"
      />
    </div>
    <div class="percent">
      <app-input
        type="number"
        v-model="skill.percent"
        min="0"
        max="100"
        maxlength="3"
        :errorMessage="validation.firstError('skill.percent')"
      />
    </div>
    <div class="button">
      <square-btn type="iconed" class="the-btn" @click="handleClick" />
    </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
export default {
  mixins: [ValidatorMixin],
  validators: {
    "skill.title": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "skill.percent": (value) => {
      return Validator.value(value)
        .integer("Должен быть числом")
        .between(0, 100, "Некорректное число")
        .required("Не может быть пустым");
    },
  },
  props: {
    blocked: Boolean,
  },
  components: {
    appInput: input,
    squareBtn: button,
  },
  data() {
    return {
      skill: {
        title: "",
        percent: "",
      },
    };
  },
  methods: {
    async handleClick() {
      if ((await this.$validate()) === false) return;
      this.$emit("approve", this.skill);
    },
  },
};
</script>

<style lang="postcss" src="./skillAddLine.pcss"></style>
