<template>
  <div>
    <admin v-if="com=='admin'"></admin>
    <user v-else-if="com=='user'"></user>
  </div>
</template>

<script>
import admin from "./admin";
import user from "./user";

export default {
  components: { admin, user },
  data() {
    return {
      com: ""
    };
  },
  mounted() {
    if (this.$session.get("user").name == "Genius淼") this.com = "admin";
    else this.com = "user";
    console.log(new Date(Date.now()).toLocaleString());
  }
};
</script>

<style lang="scss" scoped>
</style>
