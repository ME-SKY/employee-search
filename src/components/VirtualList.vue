<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

const props = defineProps({
    items: Array,
    itemHeight: Number,
    height: Number
});
const state = ref({
    startOffset: 0,
    endOffset: 0,
    visibleItems: [],
    scrollTop: 0
});

const listEl = ref(null);

const visibleCount = computed(() => Math.ceil(props.height / props.itemHeight));
const totalHeight = computed(() => props.items.length * props.itemHeight);

const listStyle = computed(() => ({
    height: `${props.height}px`,
    overflowY: 'auto'
}));

const phantomStyle = computed(() => ({
    height: `${totalHeight.value}px`,
    position: 'relative'
}));

const contentStyle = computed(() => ({
    position: 'absolute',
    top: `${state.value.startOffset}px`
}));

const updateVisibleItems = () => {
    const scroll = listEl.value.scrollTop;
    const startIndex = Math.floor(scroll / props.itemHeight);
    const endIndex = startIndex + visibleCount.value;
    state.value.startOffset = startIndex * props.itemHeight;
    state.value.endOffset = (props.items.length - endIndex) * props.itemHeight;
    state.value.visibleItems = props.items.slice(startIndex, endIndex);
};

const onScroll = () => {
    state.value.scrollTop = listEl.value.scrollTop;
    updateVisibleItems();
};

onMounted(() => {
    listEl.value.addEventListener('scroll', onScroll);
    updateVisibleItems();
});

onUnmounted(() => {
    listEl.value.removeEventListener('scroll', onScroll);
});

watch(() => props.items, updateVisibleItems, { deep: true });
</script>

<template>
    <div class="virtual-list" :style="listStyle">
        <div class="virtual-list-phantom" :style="phantomStyle"></div>
        <div class="virtual-list-content" :style="contentStyle">
            <slot v-for="item in visibleItems" :item="item"></slot>
        </div>
    </div>
</template>




<style scoped>
.virtual-list {
    position: relative;
}

.virtual-list-phantom {
    will-change: transform;
}

.virtual-list-content {
    will-change: transform;
}
</style>
