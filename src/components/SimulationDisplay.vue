<template>
  <canvas
    width="500"
    height="500"
    @mousemove="reEmit('mousemove', $event)"
    @mousedown="reEmit('mousedown', $event)"
    @mouseup="reEmit('mouseup', $event)"
    @mouseleave="$emit('mouseleave')"
  />
</template>

<script lang="js">
import { toNormalizedDeviceCoordinates } from '../graphics';
import Vector from '../Vector';

export default {
    props: {
        simulation: Object,
    },
    data() {
        return {
            running: true,
        };
    },
    destroyed() {
        this.running = false;
    },
    mounted() {
        const frameCallback = time => {
            if (!this.running)
                return;

            this.simulation.integrateTime(time);
            this.simulation.redraw();
            requestAnimationFrame(frameCallback);
        };

        requestAnimationFrame(frameCallback);
    },
    methods: {
        reEmit(eventName, event) {
            const { canvas } = this.simulation.drawing.context;
            this.$emit(eventName, toNormalizedDeviceCoordinates(this.clickPosition(event), canvas));
        },
        clickPosition(event) {
            const { canvas } = this.simulation.drawing.context;
            const { left, top } = canvas.getBoundingClientRect();
            return new Vector(event.clientX - left, event.clientY - top);
        },
    },
};
</script>
