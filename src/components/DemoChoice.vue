<template>
    <div id="root">
        <div id="choice">
            <select id="selection" v-model="currentDemo">
                <option
                    v-for="demo in demos"
                    :key="demo.title"
                    :value="demo.component"
                >
                    {{ demo.title }}
                </option>
            </select>
        </div>

        <transition name="demo" mode="out-in">
            <component :is="currentDemo" />
        </transition>
    </div>
</template>

<style>
div#root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.demo-enter-active {
    transition: all ease-in-out .5s;
}

.demo-enter, .demo-leave-to {
    opacity: 0;
}

.demo-enter-to, .demo-leave {
    opacity: 100%;
}
</style>

<script lang="js">
import ParticleDemo from './mass-aggregate/ParticleDemo';
import SpringDemo from './mass-aggregate/SpringDemo';
import TerrainDemo from './mass-aggregate/TerrainDemo';
import ParticleCollisionDemo from './mass-aggregate/ParticleCollisionDemo';
import RodDemo from './mass-aggregate/RodDemo';
import ShapesDemo from './mass-aggregate/ShapesDemo';

export default {
    data() {
        return {
            demos: [
                {
                    title: 'Particle Demo',
                    component: ParticleDemo,
                },
                {
                    title: 'Spring Demo',
                    component: SpringDemo,
                },
                {
                    title: 'Terrain Demo',
                    component: TerrainDemo,
                },
                {
                    title: 'Particle Collision Demo',
                    component: ParticleCollisionDemo,
                },
                {
                    title: 'Rod Demo',
                    component: RodDemo,
                },
                {
                    title: 'Shapes Demo',
                    component: ShapesDemo,
                },
            ],
            currentDemo: undefined,
        };
    },
};
</script>
