<template>
  <div>
    <label for="angle-slider">
      Angle
    </label>
    <input
      id="angle-slider"
      type="range"
      min="-1.57"
      max="1.57"
      step="1e-9"
      :value="value"
      @input="$emit('input', Number($event.target.value))"
    >
  </div>
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
    props: {
        value: Number,
    },
});
</script>
