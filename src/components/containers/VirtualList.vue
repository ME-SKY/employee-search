<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const props = defineProps({
    items: Array,
    itemHeight: Number,
    height: Number,
    gap: {
        type: Number,
        default: 18
    }
});
const state = ref({
    startOffset: 0,
    endOffset: 0,
    visibleItems: [],
    scrollTop: 0
});

const listEl = ref(null);

const visibleCount = computed(() => Math.ceil(props.height / (props.gap + props.itemHeight)));
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
    if (listEl.value) {
        const scroll = listEl.value.scrollTop;
        const startIndex = Math.floor((scroll + 10) / (props.itemHeight));
        const endIndex = startIndex + visibleCount.value;
        state.value.startOffset = startIndex * props.itemHeight;
        state.value.endOffset = (props.items.length - endIndex) * props.itemHeight;
        state.value.visibleItems = props.items.slice(startIndex, endIndex);
    }

};

const onScroll = () => {
    state.value.scrollTop = listEl.value?.scrollTop;
    updateVisibleItems();
};

onMounted(() => {
    updateVisibleItems();
});

watch(() => props.items, updateVisibleItems, { deep: true });

</script>

<template>
    <div class="virtual-list" :style="listStyle" ref="listEl" @scroll="onScroll">
        <div class="virtual-list-phantom" :style="phantomStyle"></div>
        <div class="virtual-list-content" :style="{ ...contentStyle, width: `${(listEl?.clientWidth) - 44}px` }">
            <slot v-for="item in state.visibleItems" :item="item" :key="item.id" />
        </div>
    </div>
</template>

<style lang='scss' scoped>
.virtual-list {
    position: relative;
    padding: 10px 22px 12px 22px;
    width: calc(100% + 44px);
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: -22px;
    margin-left: -22px;
}

.virtual-list-phantom {
    will-change: transform;
}

.virtual-list-content {
    margin-top: 10px;
    will-change: transform;
}
</style>
