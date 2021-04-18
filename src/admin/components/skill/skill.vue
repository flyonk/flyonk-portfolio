<template>
  <div class="skill-component" v-if="currentSkill.editMode === false">
    <div class="title">{{ skill.title }}</div>
    <div class="percent">{{ skill.percent }}</div>
    <div class="buttons">
      <icon symbol="pencil" class="btn" @click="currentSkill.editMode = true" grayscale />
      <icon symbol="trash" class="btn" @click="removeHandler" grayscale />
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
      <icon symbol="tick" class="btn" @click="editHandler" />
      <icon symbol="cross" class="btn" @click="resetHandler" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import icon from "../icon";
import input from "../input";
export default {
  props: {
    skill: {
      type: Object,
    },
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editMode: false,
      },
    };
  },
  methods: {
    ...mapActions({
      remove: "skills/remove",
      edit: "skills/edit",
    }),
    resetHandler() {
      this.currentSkill.title = this.skill.title;
      this.currentSkill.percent = this.skill.percent;
      this.currentSkill.editMode = false;
    },
    removeHandler() {
      this.remove(this.skill);
      console.log("removeHandler");
    },
    editHandler() {
      this.edit(this.currentSkill);
      this.currentSkill.editMode = false;
    },
  },
  components: {
    icon,
    appInput: input,
  },
};
</script>

<style lang="postcss" src="./skill.pcss"></style>
