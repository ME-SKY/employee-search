<script setup>
import imagePlaceholder from '@assets/images/image-placeholder.png';

const props = defineProps({
  profileImgUrl: {
    type: String,
    default: ''
  },
  username: String,
  email: String,
  active: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div class="card" :class="{ active }">
    <img :src="profileImgUrl ? profileImgUrl : imagePlaceholder" :on-error="this.src = imagePlaceholder">
    <div class="delimiter-vertical m-0"></div>
    <div class="details">
      <h3>{{ username }}</h3>
      <h4>{{ email }}</h4>
    </div>
  </div>
</template>

<style>
.card {
  overflow: hidden;
  height: 70px;
  display: flex;
  flex-flow: row nowrap;
  background: #FDFDFD;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000001A;
  min-width: 240px;
  border: 1px solid transparent;

  img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    border-radius: 100 0 0 10px;
    border-right: 1px solid lightgray;
  }

  .details {
    text-overflow: ellipsis;

    /* Required for text-overflow to do anything */
    white-space: normal;
    width: calc(100% - 70px);
    padding: 15px;


    h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h4 {
      font-size: 14px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &.active {
    border: 1px solid lightgray;

    .details {
      background: lightgray;
    }
  }
}
</style>