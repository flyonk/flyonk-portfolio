import iconedBtn from "../../button.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onClick: action("onClick"),
};

export default {
  title: "button/iconed",
  component: iconedBtn,
};

export const defaultView = () => ({
  components: { iconedBtn },
  template: `
    <iconed-btn type="iconed" @click="onClick" title="Заголовок" />
  `,
  methods,
});

defaultView.story = {
  name: "Стандартный вид",
};

export const noTitleView = () => ({
  components: { iconedBtn },
  template: `
    <iconed-btn type="iconed-notitle" @click="onClick" />
  `,
  methods,
});

noTitleView.story = {
  name: "Без заголовка",
};
