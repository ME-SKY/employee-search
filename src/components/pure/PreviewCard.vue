<script setup>
import imagePlaceholder from '@assets/images/image-placeholder.png';

const props = defineProps({
  profileImgUrl: {
    type: String,
    default: ''
  },
  username: String,
  email: String
})

</script>

<template>
  <div class="card">
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
  height: 70px;
  display: flex;
  flex-flow: row nowrap;
  background: #FDFDFD;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000001A;
  min-width: 245px;

  img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    border-radius: 0 0 10px 10px;
  }

  .details {
    padding: 15px;

    h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    h4 {
      font-size: 14px;
      font-weight: 400;
    }
  }
}

/* .delimiter-vertical {
  width: 1px;
  margin: 0 10px;
  height: inherit;
  background: lightgray;
} */
</style>