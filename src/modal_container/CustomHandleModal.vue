<template>
  <div class="overlay-loader" v-if="addListModal">
    <div
      class="lds-dual-ring"
      style="background-color: #fff; width: 50%; margin: auto; padding: 20px"
    >
    
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            <slot name="header"></slot
          ></label>
          <slot name="main"></slot>
        </div>

        <button class="btn btn-danger" @click="closeModal()">
          <slot name="cancel"></slot>
        </button>
        <button  class="btn btn-primary ms-3" @click="submit()">
          <slot name="create"></slot>
        </button>
      
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const emit = defineEmits(['closeModal', 'sendData'])

const addListModal = ref(true);

const closeModal = () => {
  emit("closeCustomModal" , false)
};

const submit = () => {
  emit("sendData")
};


</script>

<style scoped>
.overlay-loader {
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  text-align: center;
}

.overlay-loader > .lds-dual-ring {
  margin: 0;
  position: absolute;
  top: 27%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 27%;
  opacity: 0.9;
}
</style
