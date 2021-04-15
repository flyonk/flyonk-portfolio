export default {
  namespaced: "true",
  actions: {
    async create({ commit }, skill) {
      try {
        const { data } = await this.$axios.post("/skills", skill);
        commit("categories/ADD_SKILL", data, { root: true });
      } catch (e) {
        throw new Error(e);
      }
    },
    async remove({ commit }, skillToRemove) {
      try {
        await this.$axios.delete(`/skills/${skillToRemove.id}`);
        commit("categories/REMOVE_SKILL", skillToRemove, { root: true });
      } catch (e) {
        throw new Error(e);
      }
    },
    async edit({ commit }, skillToEdit) {
      try {
        console.log("async edit, SkillToEdit: ", skillToEdit);
        const { data } = await this.$axios.post(`/skills/${skillToEdit.id}`, skillToEdit);
        commit("categories/EDIT_SKILL", data.skill, { root: true });
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
