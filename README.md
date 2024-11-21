# BJFullpage for vue3

basic vertical slider for vue3

## install

```
npm i bjfullpage
```

## use

```
<template>
  <FullPage>
    <template #sections>
      <div>slide 1</div>
      <div>slide 2</div>
      <div>slide 3</div>
    </template>
  </FullPage>
</template>

<script>
import FullPage from 'bjfullpage'
import 'bjfullpage/dist/style.css'
</script>
```

## Otptions

### models

| name    | detail                         |
| ------- | ------------------------------ |
| current | current slide index            |
| total   | total slide count(init itself) |

### slots

| name      | detail                     |
| --------- | -------------------------- |
| sections  | main slot for sliders      |
| indicator | slot for custom indicators |

### events

| name          | detail                                           |
| ------------- | ------------------------------------------------ |
| changeSection | emits when slide changes, provides current index |

## exposed methods

| name     | detail                          |
| -------- | ------------------------------- |
| nextPage | change to next page             |
| prevPage | change to prev page             |
| moveTo   | move to the page of given index |

## example

```
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
import FullPage from 'bjfullpage'
import 'bjfullpage/dist/style.css'

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

```
