<template>
  <div :class="['addLine', { blocked: blocked }]">
    <div class="title">
      <app-input class="second-input" placeholder="Новый навык" />
    </div>
    <div class="percent">
      <app-input type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="button">
      <squareBtn type="iconed" class="the-btn" />
    </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";
export default {
  props: {
    blocked: Boolean,
  },
  components: {
    appInput: input,
    squareBtn: button,
  },
};
</script>

<style lang="postcss" src="./skillAddLine.pcss"></style>
