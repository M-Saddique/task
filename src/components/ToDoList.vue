<template>
  <div class="main-body">
    <div class="text-end">
      <button type="button" class="btn btn-primary" @click="showModal()">
        Add Item
      </button>
    </div>
    <div style="width: 30%">
      <div class="input-group rounded">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          style="border: 1px solid"
        />
        <span class="input-group-text border-0" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
    <div style="height: 450px; overflow: scroll">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="getToDoList.length > 0"
            v-for="(item, index) in getToDoList"
            :key="index"
          >
            <td>{{ item?.id }}</td>
            <td>{{ item?.title }}</td>
            <td>{{ item?.description }}</td>
            <td>
              <button class="btn btn-danger" @click="update(item)">edit</button>
              <button class="btn btn-primary ms-3" @click="deleted(item.id)">
                Delete
              </button>
            </td>
          </tr>
          <div style="text-align: center" v-else>
            <td>NO Record Found</td>
          </div>
        </tbody>
      </table>
    </div>
  </div>
  <button class="btn btn-primary ms-3" @click="logout()">Logout</button>

  <custom-modal
    v-if="addItem"
    @closeCustomModal="closeCustomModal"
    @sendData="sendData"
  >
    <template v-slot:header> Add Item </template>
    <template v-slot:main>
      <div>
        <form>
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label"
              >Title</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                v-model="formData.title"
                class="form-control"
                id="inputEmail3"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label"
              >Description</label
            >
            <div class="col-sm-10">
              <textarea
                v-model="formData.description"
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </template>
    <template v-slot:cancel> Cancel </template>
    <template v-slot:create> {{ updateItems ? `Update` : `Submit` }} </template>
  </custom-modal>

  <custom-modal
    v-if="deleteItemModal"
    @closeCustomModal="closeCustomModal"
    @sendData="deleteItem"
  >
    <template v-slot:main> Are You Sure You Want To Delete? </template>
    <template v-slot:cancel> Cancel </template>
    <template v-slot:create> Delete </template>
  </custom-modal>

  <log-out @closeLogOutModal="closeLogOutModal" v-if="logoutModal"></log-out>
</template>

<script setup>
import customModal from "../modal_container/CustomHandleModal.vue";
import { useToDoList } from "../stores/todolist";
import LogOut from "./LogOut.vue";
//PINIA STORE
import { storeToRefs } from "pinia";
const toDoList = useToDoList();
const { toDoListItem } = storeToRefs(toDoList);

import { reactive, ref, computed, onMounted } from "vue";

const addItem = ref(false);
const logoutModal = ref(false);
const deleteItemModal = ref(false);
const deleteItemId = ref(null);

const updateItems = ref(null);

const searchQuery = ref("");

const formData = reactive({
  title: "",
  description: "",
});

// List With Search

const getToDoList = computed(() => {
  if (searchQuery.value) {
    return toDoList.toDoListItem.filter((item) => {
      return searchQuery.value
        ?.toLowerCase()
        .split(" ")
        .every((v) => item.title?.toLowerCase().includes(v));
    });
  } else {
    return toDoList.toDoListItem;
  }
});

const logout = () => {
  logoutModal.value = true;
};

const closeLogOutModal = () => {
  logoutModal.value = false;
};

// add and update Fun

const sendData = () => {
  if (updateItems.value) {
    let data = {
      id: updateItems.value.id,
      title: formData.title,
      description: formData.description,
    };
    toDoList.update(data).then((response) => {
      if (response.status == 200) {
        addItem.value = false;
        allListItem();
      }
    });
  } else {
    toDoList.addItem(formData).then((response) => {
      if (response.status == 200) {
        addItem.value = false;
        allListItem();
      }
    });
  }
};

// delete Item Id Pass

const deleted = (id) => {
  deleteItemId.value = id;
  deleteItemModal.value = true;
};

// delete Fun

const deleteItem = () => {
  toDoList.DeleteListItem(deleteItemId.value).then((response) => {
    if (response.status == 200) {
      deleteItemModal.value = false;
      allListItem();
    }
  });
};

// Update Fun

const update = (item) => {
  addItem.value = true;
  updateItems.value = item;
  formData.title = item.title;
  formData.description = item.description;
};

const showModal = () => {
  formData.description = "";
  formData.title = "";
  addItem.value = true;
};
const closeCustomModal = () => {
  addItem.value = false;
  deleteItemModal.value = false;
};

// List Fun

const allListItem = () => {
  toDoList.gettodoList();
};

onMounted(() => {
  allListItem();
});
</script>

<style>
.main-body {
  padding: 20px;
}
</style>
