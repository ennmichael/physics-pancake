<template>
  <div>
    <label for="length-slider">
      Length
    </label>
    <input
      id="length-slider"
      type="range"
      :value="value"
      min="0.2"
      max="4"
      step="1e-9"
      @input="$emit('input', Number($event.target.value))"
    >
  </div>
</template>

<script lang="js">
export default {
    props: {
        value: Number,
    },
};
</script>
