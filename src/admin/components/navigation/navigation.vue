<template>
  <nav class="navigation-component">
    <div class="container">
      <ul class="list">
        <div v-for="link in links" :key="link.id" :class="['item', { active: link.active }]">
          <a :href="`/${link.alias}`" class="link">{{ link.title }}</a>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
const links = [
  { id: 0, title: "Обо мне", alias: "about", active: false },
  { id: 0, title: "Работы", alias: "works", active: true },
  { id: 0, title: "Отзывы", alias: "reviews", active: false },
];

export default {
  data() {
    return {
      links,
    };
  },
};
</script>

<style lang="postcss" src="./navigation.pcss"></style>
