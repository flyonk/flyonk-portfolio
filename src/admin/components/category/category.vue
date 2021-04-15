<template>
  <card slim>
    <edit-line
      slot="title"
      v-model="categoryTitle"
      :editModeByDefault="editMode"
      :errorMessage="validation.firstError('categoryTitle')"
      @remove="removeHandler"
      @approve="approveHandler"
    />
    <template slot="content">
      <ul class="skills" v-if="category.skills && category.skills.length">
        <li class="item" v-for="skill in category.skills" :key="skill.id">
          <skill
            :skill="skill"
            @remove="$emit('remove-skill', $event)"
            @approve="$emit('edit-skill', $event)"
          />
        </li>
      </ul>
      <div class="bottom-line">
        <skill-add-line :blocked="editMode" @approve="createSkillHandler" />
      </div>
    </template>
  </card>
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAddLine from "../skillAddLine";
import { mapActions } from "vuex";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

const skills = [];
export default {
  mixins: [ValidatorMixin],
  validators: {
    categoryTitle: (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
  },
  components: {
    card,
    editLine,
    skill,
    skillAddLine,
  },
  props: {
    empty: Boolean,
    category: {
      type: Object,
      default: () => {},
    },
    // title: {
    //   type: String,
    //   default: "",
    // },
    // skills: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {
      editMode: !this.category.id,
      categoryTitle: this.category.category,
    };
  },
  methods: {
    ...mapActions({
      remove: "categories/remove",
      create: "categories/create",
      update: "categories/update",
      createSkill: "skills/create",
    }),
    removeHandler() {
      this.remove(this.category);
    },
    async approveHandler() {
      if (!(await this.$validate())) return;

      if (this.category.id) {
        this.update(this.category);
      } else {
        this.create(this.categoryTitle);
      }
      this.editMode = true;
    },
    createSkillHandler(skill) {
      skill.category = this.category.id;
      this.createSkill(skill);
    },
  },
};
</script>

<style lang="postcss">
.bottom-line {
  margin-top: auto;
  padding-left: 10%;
}

.item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 30px;
  }
}
</style>
