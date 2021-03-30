<template>
  <div class="user-component">
    <avatar size="2.7" :src="getLocalImage" />
    <div class="username">Пётр Щепетин</div>
  </div>
</template>

<script>
import avatar from "../avatar";

export default {
  components: {
    avatar,
  },
  computed: {
    getLocalImage() {
      return require("../../../images/content/usergoba.png").default;
    },
  },
};
</script>

<style lang="postcss">
.user-component {
  display: flex;
  font-size: 18px;
  font-weight: 600;
  align-items: center;
  color: #fff;
}

.username {
  margin-left: 10px;
}
</style>
