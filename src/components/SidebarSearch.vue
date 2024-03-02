<script setup>
import { ref, watch, computed, nextTick, watchEffect } from 'vue';
import store from '../store';
//@ts-ignore
import PreviewCard from './pure/PreviewCard.vue';
import VirtualList from './VirtualList.vue';

const searchQuery = ref('');
const loadingText = ref('');
const loadingTextOptions = ['.загрузка', '..загрузка', '...загрузка'];

const scrollbarContainer = ref(null);
const scrollbarThumb = ref(null);
const thumbPosition = ref(0);
const scrollableElement = ref(null);
const loadingCounter = ref(0);

const ulCalculateClientdHeight = ref(0);

let loadingInterval;

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


const width = computed(() => {
    return resultContainer?.value?.clientWidth + 12;
});

const ulHeight = computed(() => {
    return resultContainer?.value?.clientHeight - 34;
});


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

function smoothScroll(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeInOut(progress);
        window.scrollTo(0, startPosition + distance * easedProgress);

        if (elapsedTime < duration) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    requestAnimationFrame(scrollAnimation);
}

function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}



const scrollImitaion = (e) => {
    console.log('wheeeeel', e);

    // Determine the direction of the scroll


    // Calculate the target position based on the current scroll position
    const currentPosition = thumbPosition.value;
    const targetPosition = currentPosition + e.deltaY;

    // Smoothly scroll to the target position


    thumbPosition.value = targetPosition;

    // smoothScroll(targetPosition, 0.2 * 1000);
}

watch(() => store.state.allEmployee, async (newEmps, oldEmps) => {
    console.log('newEmps, ', newEmps);

    await nextTick(() => {



        if (scrollableElement.value && scrollbarContainer.value && scrollbarThumb.value) {

            ulCalculateClientdHeight.value = (((70 + 18) * newEmps.length) - 18) + 22; //70 - preview card height, 18 - margin-bottom, -18 - remove margin of last item, +22 - add paddings
            console.log('ulCalculateClientdHeight, ', ulCalculateClientdHeight);
            console.log('actual scrollHeight, ', scrollableElement.value.scrollHeight);
            // console.log()
            //one Percent in pixels on scrollable element
            const onePercentInPixels = (scrollableElement.value.scrollHeight) / 100;

            const clientViewZone = scrollableElement.value.clientHeight / scrollableElement.value.scrollHeight;

            console.log('clientViewZone, ' + clientViewZone);


            // how much in percents we have a viewable area in scrollable element
            const zoneOnScrollableElement = (scrollableElement.value.clientHeight) / onePercentInPixels;

            console.log('scrollableElement.value.clientHeight - 22', scrollableElement.value.clientHeight)

            console.log('zoneOnScrollableElement, ', zoneOnScrollableElement);

            //how much 1 percents takes in pixels on scrollbarContainer
            const onePercentOnSCrollbar = scrollbarContainer.value.clientHeight / 100;


            console.log('onePercentOnSCrollbar, ', onePercentOnSCrollbar);

            //result value = how much in pixels thumb should takes
            const thumbShouldTakesInPx = onePercentOnSCrollbar * zoneOnScrollableElement;

            // console.log("thumbShouldTakesInPx", thumbShouldTakesInPx);


            const thumbHeightInPercents = scrollableElement.value.clientHeight / scrollableElement.value.scrollHeight;


            const scrollbarThumbHeight = (+(scrollbarContainer.value.clientHeight * thumbHeightInPercents).toPrecision(3)) - 1;

            const newThumbHeight = scrollbarContainer.value.clientHeight * clientViewZone;


            console.log('newThumbHeight', newThumbHeight);

            if (newThumbHeight >= scrollbarContainer.value.clientHeight) {
                scrollbarContainer.value.style.opacity = '0';
            } else {
                scrollbarThumb.value.style.height = `${newThumbHeight}px`;


                if (scrollbarContainer.value.style.opacity === '0') {
                    scrollbarContainer.value.style.opacity = '1';
                }

            }
            ; // checking
            // scrollbarThumb.value.style.height = `${onePercentOnSCrollbar}px`; //checking, it should always be ~ 3.9px
            // scrollbarThumb.value.style.height = `${thumbShouldTakesInPx}px`; // TODO: something wrong here?
        }
    });

});

const resultContainer = ref(null);

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

// const ulScrollHeight = computed(() => {
//     return scrollableElement?.value?.scrollHeight;
// });

// watchEffect(() => console.log('ulScrollHeight', ulScrollHeight.value));

const showScrollPosition = (e) => {
    // console.log('ulScrollHeight, ', ulScrollHeight.value);
    // console.log('onscroll e, ', e)

    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    const zone = clientHeight / scrollHeight; // how much percents space  thrumb should takes

    const onePercentPx = scrollHeight / 100;

    const percent = scrollTop / onePercentPx;

    const position = (scrollTop) / scrollHeight;



    // console.log('scrollTop, ', scrollTop);
    // console.log('scrollHeight, ', scrollHeight);
    // console.log('clientHeight, ', clientHeight);



    // if(scrollbarThumb.value) {
    // 
    // scrollbarThumb.value.style.height = `${zone * 100}%`;
    // }


    if (scrollbarContainer.value && scrollbarThumb.value) {
        const percentOnThumb = clientHeight / 100;

        // const newPercent = scrollTop / scrollHeight;
        // console.log('newPercent: ', newPercent);
        // console.log('new top: ', percentOnThumb * newPercent)

        if (scrollbarThumb.value.clientHeight !== scrollbarContainer.value.clientHeight) {
            console.log("zone, ", zone);
            console.log('position, ', position);
            console.log('onePercentPx, ', onePercentPx);
            console.log('percent, ', percent);

            console.log('scrollbarContainer.value.clientHeight * percent', scrollbarContainer.value.clientHeight * percent);
            console.log('scrollbarContainer.value.clientHeight * position', scrollbarContainer.value.clientHeight * position);
            console.log('scrollbarContainer.value.clientHeight, ', scrollbarContainer.value.clientHeight);
            scrollbarThumb.value.style.top = `${(scrollbarContainer.value.clientHeight / 100) * percent}px`;
        }

        // scrollbarThumb.value.style.height = `${scrollbarContainer.value.clientHeight * zone}px`;
    }


    // scrollHeight
    // : 
    // 884
    // scrollLeft
    // : 
    // 0
    // scrollTop
    // : 
    // 27
    // scrollWidth
    // : 
    // 368
}
</script>

<template>
    <div class="sidebar">
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

            <!-- disalbe old code: -->
            <template v-if="false">

                <ul :style="{ height: ulHeight + 'px' }" @wheel="scrollImitaion" ref="scrollableElement">
                    <div class="scrollable-area-mock">
                        <!-- <VirtualList :allItems="store.state.allEmployee" >
                        
                        </VirtualList>> -->
                        <!-- <li v-for="empoyee in store.state.allEmployee" :key="empoyee.id"> -->
                        <!-- <PreviewCard :username="empoyee.username" :email="empoyee.email" @click="() => setEmployee(empoyee)" -->
                        <!-- :active="store.state.selectedEmployee?.id === empoyee.id" /> -->
                        <!-- </li> -->
                    </div>
                    <div class="scrollbar" ref="scrollbarContainer">
                        <div class="scrollbar-thumb" ref="scrollbarThumb">

                        </div>
                    </div>
                    <li v-for="empoyee in store.state.allEmployee" :key="empoyee.id">
                        <PreviewCard :username="empoyee.username" :email="empoyee.email" @click="() => setEmployee(empoyee)"
                            :active="store.state.selectedEmployee?.id === empoyee.id" />
                    </li>
                </ul>
            </template>
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
    // min-height: 300px;
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