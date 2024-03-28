import { defineStore } from "pinia";
import Api from "../confiq/axios_instance.js";

export const useToDoList = defineStore("todolist", {
  state: () => ({
    toDoListItem: [],
  }),
  actions: {
    login(payload) {
      return new Promise((resolve, reject) => {
        Api.post("http://3.232.244.22/api/login", payload).then(
          (response) => {
            console.log("token", response.data.user.token);
            localStorage.setItem("auth_token", response.data.user.token);
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    register(payload) {
      return new Promise((resolve, reject) => {
        Api.post("http://3.232.244.22/api/register", payload).then(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },

    addItem(payload) {
      return new Promise((resolve, reject) => {
        Api.post("http://3.232.244.22/api/item", payload).then(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },

    gettodoList() {
      return new Promise((resolve, reject) => {
        Api.get("http://3.232.244.22/api/items").then(
          (response) => {
            this.toDoListItem = response.data.items.data;
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },

    DeleteListItem(payload) {
      return new Promise((resolve, reject) => {
        Api.delete("http://3.232.244.22/api/item/" + payload).then(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },

    update(payload) {
      return new Promise((resolve, reject) => {
        Api.put("http://3.232.244.22/api/item/" + payload.id, {
          title: payload.title,
          description: payload.description,
        }).then(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
  },
});
