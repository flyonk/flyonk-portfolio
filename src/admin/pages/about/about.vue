<template>
  <div class="about-page-component">
    <div class="page-content">
      <div class="container">
        <div class="header">
          <div class="title">Блок "Обо мне"</div>
          <iconed-button
            type="iconed"
            v-if="emptyCatIsShown === false"
            @click="addHandler"
            title="Добавить группу"
          />
        </div>
        <ul class="skills">
          <!-- <li class="item" v-if="emptyCatIsShown">
            <category @remove="emptyCatIsShown = false" @approve="createCategory" />
          </li> -->
          <li class="item" v-for="category in categories" :key="category.id">
            <category :category="category" />
          </li>
        </ul>
      </div>
      <!-- <div class="container" v-else>Loading...</div> -->
    </div>
  </div>
</template>

<script>
import button from "../../components/button";
import category from "../../components/category";
import { mapActions, mapState } from "vuex";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {},
  components: {
    iconedButton: button,
    category,
  },
  data() {
    return {
      emptyCatIsShown: false,
    };
  },
  computed: {
    ...mapState("categories", {
      categories: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoryAction: "categories/fetch",
      addEmpty: "categories/addEmpty",
      updateCategoryAction: "categories/update",
      createSkillAction: "skills/add",
      removeSkillAction: "skills/remove",
      editSkillAction: "skills/edit",
    }),
    async createCategory(categoryTitle) {
      console.log("createCategory: ", this.category, categoryTitle);
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCatIsShown = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    updateCategory(payload) {
      console.log("updateCategory", payload);
      this.updateCategoryAction(payload);
    },
    addHandler() {
      // this.emptyCatIsShown = true;
      this.addEmpty();
    },
  },
  created() {
    this.fetchCategoryAction(category);
  },
  createSkill(skill, categoryId) {
    const newSkill = {
      ...skill,
      category: categoryId,
    };
    this.createSkillAction(newSkill);

    skill.title = "";
    skill.percent = "";
  },
  removeSkill(skill) {
    this.removeSkillAction(skill);
  },
  async editSkill(skill) {
    await this.editSkillAction(skill);
    skill.editMode = false;
  },
};
</script>

<style lang="pcss" scoped src="./about.pcss"></style>
