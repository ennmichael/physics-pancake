<template>
  <div>
    <label for="gravity-slider">
      Gravity
    </label>
    <input
      id="gravity-slider"
      v-model.number="engine.gravity"
      type="range"
      min="0"
      max="1e-5"
      step="1e-9"
    >
  </div>
</template>

<script lang="js">
export default {
    props: {
        engine: Object,
    },
};
</script>
