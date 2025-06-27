<template>
  <nav class="amazing-tabs">
    <div class="filters-container">
      <div class="filters-wrapper">
        <ul class="filter-tabs">
          <li>
            <button class="filter-button filter-active" data-translate-value="0">
              全网分红排行榜
            </button>
          </li>
          <li>
            <button class="filter-button" data-translate-value="100%">全网手续费分红榜</button>
          </li>
          <!--          <li>-->
          <!--            <button class="filter-button" data-translate-value="200%">Following</button>-->
          <!--          </li>-->
        </ul>
        <div class="filter-slider" aria-hidden="true">
          <div class="filter-slider-rect">&nbsp;</div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
// resources in description
import { onMounted } from 'vue'

const emits = defineEmits(['change'])

onMounted(() => {
  const handleActiveTab = (tabs, event, className) => {
    tabs.forEach((tab) => {
      tab.classList.remove(className)
    })

    if (!event.target.classList.contains(className)) {
      event.target.classList.add(className)
    }
  }

  const filterTabs = document.querySelector('.filter-tabs')
  const filterButtons = document.querySelectorAll('.filter-button')

  filterTabs.addEventListener('click', (event) => {
    const root = document.documentElement
    const targetTranslateValue = event.target.dataset.translateValue
    if (targetTranslateValue == 0) {
      emits('change', 0)
    } else {
      emits('change', 1)
    }
    if (event.target.classList.contains('filter-button')) {
      root.style.setProperty('--translate-filters-slider', targetTranslateValue)
      handleActiveTab(filterButtons, event, 'filter-active')
    }
  })
})
</script>

<style>
:root {
  --background-color: #bbdefb;
  --blue-50: #e3f2fd;
  --blue-100: #bbdefb;
  --blue-A700: #2962ff;
  --green-50: #e8f5e9;
  --green-100: #c8e6c9;
  --green-A700: #00c853;
  --purple-50: #f3e5f5;
  --purple-100: #e1bee7;
  --purple-A700: #aa00ff;
  --orange-50: #fff3e0;
  --orange-100: #ffe0b2;
  --orange-A700: #ff6d00;
  --orange-700: #f57c00;
  --grey-900: #212121;
  --white: #ffffff;
  --round-button-active-color: #212121;
  --translate-main-slider: 100%;
  --main-slider-color: #e3f2fd;
  --translate-filters-slider: 0;
  --filters-container-height: 38px;
  --filters-wrapper-opacity: 1;
}
</style>
<style scoped lang="less">
button {
  border: none;
  cursor: pointer;
  background-color: transparent;
  outline: none;
}

nav.amazing-tabs {
  border-radius: 25px;
  user-select: none;
  padding-top: 10px;
}

ul.filter-tabs {
  list-style-type: none;
  display: flex;
}

.animate-jello {
  animation: jello-horizontal 0.9s both;
}

@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

.filters-container {
  overflow: hidden;
  padding: 0 30px;
  transition: max-height 0.4s ease-in-out;
  max-height: var(--filters-container-height);
}

.filters-wrapper {
  position: relative;
  transition: opacity 0.2s ease-in-out;
  opacity: var(--filters-wrapper-opacity);
}

.filter-tabs {
  border-radius: 10px;
  padding: 3px;
  overflow: hidden;
  background-color: var(--orange-50);
}

.filter-tabs li {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1 0 50%;
}

.filter-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-grow: 1;
  height: 30px;
  padding: 0 15px;
  color: var(--orange-700);
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
}

.filter-button.filter-active {
  transition: color 0.4s ease-in-out;
  color: var(--grey-900);
}

.filter-slider {
  pointer-events: none;
  position: absolute;
  padding: 3px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.filter-slider-rect {
  height: 30px;
  width: 50%;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: 0 1px 10px -4px rgba(0, 0, 0, 0.12);
  transition: transform 0.4s ease-in-out;
  transform: translateX(var(--translate-filters-slider));
}
</style>
