import skills from "./skills";

export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      // state.data = state.data.splice(0, 1, categories).flat();
      state.data = categories;
    },
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    REMOVE_CATEGORY: (state, id) => {
      if (id) {
        state.data = state.data.filter((category) => category.id !== id);
      } else {
        state.data.shift();
      }
    },
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map((category) => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      });
    },
    REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map((category) => {
        if (category.id === skillToRemove.category) {
          category.skills = category.skills.filter((skill) => skill.id !== skillToRemove.id);
        }
      });
    },
    EDIT_SKILL: (state, skillToEdit) => {
      const editSkillOnCategory = (category) => {
        category.skills = category.skills.map((skill) => {
          return skill.id === skill.skillToEdit.id ? skillToEdit : skill;
        });
      };
      const findCategory = (category) => {
        if (category.id === skillToEdit.category) {
          editSkillOnCategory(category);
        }

        return category;
      };
      state.data = state.data.map(findCategory);
    },
  },
  actions: {
    async create({ commit }, title) {
      try {
        const { data } = await this.$axios.post("/categories", { title });
        commit("ADD_CATEGORY", data);
      } catch (error) {
        console.log(error);
      }
    },
    async update({ commit }, payload) {
      try {
        const { data } = await this.$axios.put(`/categories/${payload.id}`, {
          title: payload.category,
        });
        commit("UPDATE_CATEGORY", data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get("/categories/449");
        commit("SET_CATEGORIES", data);
      } catch (error) {
        throw new Error("ошибка: ");
      }
    },
    addEmpty({ commit }) {
      commit("ADD_CATEGORY", { category: "" });
    },
    async remove({ commit }, categoryId) {
      if (!categoryId) {
        return commit("REMOVE_CATEGORY");
      }
      try {
        await this.$axios.delete(`/categories/${categoryId}`);
        commit("REMOVE_CATEGORY", categoryId);
      } catch (error) {
        throw new Error("ошибка: ");
      }
    },
  },
};
