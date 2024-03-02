<script setup>
import { ref, watch, computed } from 'vue';
import store from '@store';
//@ts-ignore
import PreviewCard from '@components/pure/PreviewCard.vue';
import VirtualList from '@components/containers/VirtualList.vue';

const searchQuery = ref('');
const loadingText = ref('');
const loadingTextOptions = ['.загрузка', '..загрузка', '...загрузка'];
const loadingCounter = ref(0);
const showBadge = ref(false);

const resultContainer = ref(null);

let loadingInterval;

const width = computed(() => {
    return resultContainer?.value?.clientWidth + 12;
});

const ulHeight = computed(() => {
    return resultContainer?.value?.clientHeight - 34;
});

const setEmployee = (employee) => {
    if (!store.state.selectedEmployee) {
        store.commit('setSelectedEmployee', employee);
    } else {
        if (store.state.selectedEmployee.id === employee.id) {
            store.commit('setSelectedEmployee', null);
        } else {
            store.commit('setSelectedEmployee', employee);
        }
    }
}

watch(searchQuery, async (newSearchValue) => {
    store.commit('setSearchQuery', newSearchValue);
});

watch(() => store.getters.paramsFromQuery, async (newParams, oldParams) => {
    if ((!newParams.every(param => oldParams.includes(param)) || !oldParams.every(param => newParams.includes(param))) && newParams.length > 0) {
        await store.dispatch('getEmployeeByUserNames')
    } else {
        if (newParams.length === 0) {
            store.commit('setAllEmployee', []);
        }
    }
});

watch(() => store.state.isLoading, (loading) => {
    clearInterval(loadingInterval);

    if (loading) {
        let counter = 0;

        loadingInterval = setInterval(() => {
            loadingText.value = loadingTextOptions[counter % loadingTextOptions.length];
            counter++;
        }, 600);
    } else {
        loadingText.value = '';
        loadingCounter.value = 0;
    }
});

watch(() => store.state.error, (error) => {
    if (error.length > 0) {
        showBadge.value = true;

        setTimeout(() => {
            showBadge.value = false;
            store.commit('setError', '');
        }, 3000)
    }
})

</script>

<template>
    <div class="sidebar">
        <div v-if="showBadge" class="badge">
            {{ store.state.error }}
        </div>

        <div class="search-section">
            <h5>Поиск сотрудников</h5>
            <input v-model="searchQuery" placeholder="Введите id или имя" />
        </div>

        <div class="results-section" ref="resultContainer">
            <h5 :style="{ width: width + 'px' }">Результаты{{ store.state.allEmployee.length ?
                `(${store.state.allEmployee.length})` : ' ' }} {{ loadingText }}</h5>

            <VirtualList :items="store.state.allEmployee" :itemHeight="88" :height="ulHeight">
                <template v-slot="{ item }">
                    <PreviewCard :username="item.username" :email="item.email" @click="() => setEmployee(item)"
                        :active="store.state.selectedEmployee?.id === item.id" :key="item.id" />
                </template>
            </VirtualList>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.scrollbar {
    opacity: 0;
    float: right;
    position: sticky;
    top: 0;
    margin-right: -16px;
    width: 8px;
    min-height: 100%;
    max-height: 100%;
    background: #dcdcdc;
    overflow: hidden;
    border-radius: 4px;

    .scrollbar-thumb {
        position: relative;
        right: 0;
        top: 0;
        width: 8px;
        border-radius: 4px;
        background: #b0b0b0;
    }
}

.scrollable-area-mock {
    padding: 10px 22px 12px 22px;
    opacity: 1;
    background: rgba(76, 170, 164, 0.397);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    border: 1px solid lightblue;
}

.sidebar {
    display: flex;
    flex-flow: column;
    justify-content: left;
    gap: 24px;
    width: 23%;
    padding: 26px 22px 18px 22px;
}

.badge {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 18px;
    background: #FDFDFD;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #0000001A;
    font-size: 12px;
    color: red;
}

.search-section {
    height: 18%;

    h5 {
        margin-bottom: 22px;
    }

    input {
        min-width: 100%;
        // min-width: 240px;
        height: 59px;
        padding: 16px 24px 16px 24px;
        border-radius: 8px;
        border: 1.5px solid lightgray;
        box-sizing: border-box;
        outline: none;
        background: #FDFDFD;
        font-size: 14px;
        font-weight: 400;
        color: #76787D;
    }
}

.results-section {
    // width: fit-content;
    // defined width for container
    position: relative;
    // overflow-y: ;
    // overflow-x: hidden;
    margin: 0 -22px;
    padding: 0 22px;
    min-height: calc(82% - 23px);
    // overflow-y: hidden;
    // position: relative;

    // .scroll-content {
    //     padding-right: 6px;
    //     overflow-y: scroll;
    //     height: 100%;

    //    &::-webkit-scrollbar {
    //         width: 3px;
    //     }

    //     &::-webkit-scrollbar-thumb {
    //         background-color: #888;
    //         border-radius: 50%;
    //     }

    // }

    h5 {
        margin-bottom: 20px;
        // margin: 0 -22px;
        // min-width: 240px;
        background: #FDFDFD;
        // position: fixed;
        // padding-left: 22px;
        // padding-bottom: 16px;
    }

    .loading {
        position: absolute;
        padding: 20px;
        font-size: 24px;
        font-weight: 600;
        // height: 100%;
        top: 50%;
        left: 50%;
        background-color: rgba(255, 255, 255, 0.697);
        border-radius: 4px;
        backdrop-filter: blur(4px);
        transform: translate(-50%, -50%);
    }

    ul {
        position: relative;
        padding: 10px 22px 12px 22px;
        width: calc(100% + 44px);
        overflow-y: scroll;
        overflow-x: hidden;
        margin-top: 26px;
        margin-right: -22px;
        margin-left: -22px;
        list-style-type: none;

        li {
            cursor: pointer;
            margin-bottom: 18px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }


}

.search-section,
.results-section {
    h5 {
        font-size: 16px;
        font-weight: 600;
    }
}
</style>