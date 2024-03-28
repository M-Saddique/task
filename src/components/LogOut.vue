<template>
  <custom-modal @closeCustomModal="closeCustomModal" @sendData="sendData">
    <template v-slot:header> Logout </template>
    <template v-slot:main>
      <h4>Are You Sure You Want to Logout</h4>
    </template>
    <template v-slot:cancel> Cancel </template>
    <template v-slot:create> LogOut </template>
  </custom-modal>
</template>

<script setup>
import customModal from "../modal_container/CustomHandleModal.vue";
import { reactive, defineProps, ref, watch } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["closeLogOutModal"]);

const router = useRouter();

const closeCustomModal = () => {
  emit("closeLogOutModal");
};

const sendData = () => {
  localStorage.removeItem("auth_token");
  router.push({ name: "login" });
};
</script>
