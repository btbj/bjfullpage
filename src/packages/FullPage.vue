<template>
  <div class="fullpage-root" ref="fullpageRef" @wheel.stop="onMousewheel">
    <div class="section-container" ref="sectionContainerRef" v-show="isShow">
      <slot name="sections" ref="sectionsRef"></slot>
    </div>
    <div class="indicator-wrapper">
      <slot name="indicator">
        <div class="indicator-list">
          <div
            :class="['item', index === current + 1 ? 'current' : '']"
            v-for="index in total"
            :key="index"
            @click="moveTo(index - 1)"
          ></div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, useSlots } from "vue";

const slots = useSlots();
// const props = defineProps(['direction'])
const emits = defineEmits(["changeSection"]);
const current = defineModel("current");
const total = defineModel("total");
const isShow = ref(false);
const fullpageRef = ref(null);
const sectionContainerRef = ref(null);
const isScrolling = ref(false);
const initFullpage = () => {
  isShow.value = false;
  const height = fullpageRef.value.clientHeight;
  const width = fullpageRef.value.clientWidth;
  const sections = slots.sections();
  total.value = sections.length;
  sections.forEach((dom) => {
    dom.el.style.height = height + "px";
    dom.el.style.width = width + "px";
  });

  isShow.value = true;
};
const onMousewheel = (event) => {
  let e = event.originalEvent || event;
  let dY = e.deltaY;
  scrollDebounce(
    () => {
      if (isScrolling.value) return;
      if (dY > 0) {
        nextPage();
      } else if (dY < 0) {
        prevPage();
      }
    },
    Math.abs(dY),
    50
  )();
};
const nextPage = () => {
  if (current.value + 1 < total.value) {
    moveTo(current.value + 1);
  }
};
const prevPage = () => {
  if (current.value > 0) {
    moveTo(current.value - 1);
  }
};
const moveTo = (index) => {
  isScrolling.value = true;
  directionMove(index);

  emits("changeSection", { newIndex: index });
  setTimeout(() => {
    isScrolling.value = false;
  }, 600);
};
defineExpose({
  nextPage,
  prevPage,
  moveTo,
});

const directionMove = (index) => {
  const height = fullpageRef.value.clientHeight;
  // const width = fullpageRef.value.clientWidth
  const distance = -index * height + "px";
  sectionContainerRef.value.style = `transform: translateY(${distance})`;
  current.value = index;
};

const onResize = () => {
  throttle(initFullpage, 100)();
};

onMounted(() => {
  initFullpage();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.addEventListener("resize", onResize, false);
});

// ====== 后防抖函数 开始 =======
// 默认delay时间50ms内触发的重复函数无效化
// amount值为变化量，limit为变化量记录值（作为阈值），timerCount为后续取消的函数触发次数
// timerCountLimit为触发阈值（滚动开始时有部分的数值是递增的，需要排除）
// 当处于后防抖时间内，持续时间超过timerCountLimit，并且变化量amount大于先前的阈值limit时，重新触发函数
// 注：本函数专为优化mac触摸板滚动惯性产生的连续滚动现象，连续滚动有可能收isScrolling影响而不触发
let timer = null;
let timerCount = 0;
const timerCountLimit = 15;
let limit = 0;
const scrollDebounce = (fn, amount, delay = 50) => {
  return (...args) => {
    if (timer) {
      if (timerCount > timerCountLimit && amount > limit) {
        fn(...args);
        limit = amount;
        timerCount = 0;
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          timerCount = 0;
        }, delay);
      }
      // console.log('cancel')
      clearTimeout(timer);
      timerCount++;
      limit = amount;
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        timerCount = 0;
      }, delay);
      return;
    }
    // console.log('do')
    fn(...args);
    limit = amount;
    timerCount++;
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      timerCount = 0;
    }, delay);
  };
};

// ====== 后防抖函数 结束 =======

const throttle = (fn, delay = 500) => {
  let timer = null;

  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};
// const debounce = (fn, delay = 500) => {
//   let timer
//   return (...args) => {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn(...args)
//     }, delay)
//   }
// }
</script>

<script>
export default {
  name: "FullPage",
};
</script>

<style>
html,
body,
#app {
  overscroll-behavior: none;
}
</style>

<style scoped>
.fullpage-root {
  position: relative;
}
.fullpage-root .section-container {
  height: 100%;
  /* overflow: auto; */
  -webkit-overflow-scrolling: auto;
  transition: all 0.6s ease;
}
.fullpage-root .indicator-wrapper {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fullpage-root .indicator-wrapper .indicator-list .item {
  height: 10px;
  width: 10px;
  margin: 15px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #ffffff80;
}
.fullpage-root .indicator-wrapper .indicator-list .item.current {
  background-color: #fff;
}
</style>
