<template>
  <card slim>
    <edit-line slot="title" v-model="categoryTitle" editModeByDefault="empty" @remove="$emit('remove', $event)" />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li class="item" v-for="skill in skills" :key="skill.id">
          <skill :skill="skill" @remove="$emit('remove-skill', $event)" @approve="$emit('edit-skill', $event)"/>
        </li>
      </ul>
      <div class="bottom-line">
        <skill-add-line :blocked="empty" />
      </div>
    </template>
  </card>
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAddLine from "../skillAddLine";

const skills = [];
export default {
  components: {
    card,
    editLine,
    skill,
    skillAddLine,
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
    },
    skills: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      categoryTitle: this.title,
    };
  },
};
</script>

<style lang="postcss">
.bottom-line {
  padding-top: 70px;
  margin-top: auto;
  padding-left: 25%;
}

.item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
