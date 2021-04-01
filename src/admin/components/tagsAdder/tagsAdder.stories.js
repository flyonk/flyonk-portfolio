import tagsAdder from "./tagsAdder.vue";

export default {
  title: "tagsAdder",
  components: { tagsAdder },
};

export const defaultView = () => ({
  components: {
    tagsAdder,
  },
  data() {
    return {
      tags: "One, Two, Three",
    };
  },
  template: `<tags-adder v-model="tags"/>`,
});

defaultView.story = {
  name: "Стандартный вид",
  parameters: {
    background: [{ name: "grey", value: "#8395a7", default: true }],
  },
};
