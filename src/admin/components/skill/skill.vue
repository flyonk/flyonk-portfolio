<template>
  <div class="skill-component" v-if="editMode === false">
    <div class="title">{{ skill.title }}</div>
    <div class="percent">{{ skill.percent }}</div>
    <div class="buttons">
      <icon symbol="pencil" class="btn" @click="editMode = true" grayscale />
      <icon symbol="trash" class="btn" @click="$emit('remove', skill.id)" grayscale />
    </div>
  </div>
  <div class="skill-component" v-else>
    <div class="title">
      <app-input v-model="currentSkill.title" noSidePaddings />
    </div>
    <div class="percent">
      <app-input v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="buttons">
      <icon symbol="tick" class="btn" @click="$emit('approve', currentSkill)" />
      <icon symbol="cross" class="btn" @click="editMode = false" />
    </div>
  </div>
</template>

<script>
import icon from "../icon";
import input from "../input";
export default {
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
      currentSkill: {
        id: 0,
        title: this.skill.title,
        percent: this.skill.percent,
      },
    };
  },
  components: {
    icon,
    appInput: input,
  },
};
</script>

<style lang="postcss" src="./skill.pcss"></style>
