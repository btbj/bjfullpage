<template>
  <FullPage
    class="fullpage-container"
    v-model:current="current"
    v-model:total="totalPage"
  >
    <template #sections>
      <div class="section rrr">aa</div>
      <div class="section bbb">bb</div>
      <div class="section ggg">cc</div>
    </template>
  </FullPage>
</template>

<script setup>
import { ref } from "vue";
import FullPage from "./package";

const current = ref(0);
const totalPage = ref(0);
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
<style scoped>
.fullpage-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.section {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  font-weight: bold;
}
.rrr {
  background-color: #e74c3c;
}
.bbb {
  background-color: #3498db;
}
.ggg {
  background-color: #2ecc71;
}
</style>
