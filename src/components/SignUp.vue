<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">SignUp</h2>

                <div class="form-outline form-white mb-4">
                  <input
                    type="email"
                    v-model="formData.email"
                    id="typeEmailX"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input
                    type="password"
                    v-model="formData.password"
                    id="typePasswordX"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input
                    type="password"
                    v-model="formData.password_confirmation"
                    id="typePasswordX"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>
                {{ resMessage }}
                <button
                  class="btn btn-outline-light btn-lg px-5"
                  type="submit"
                  @click="submit()"
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useToDoList } from "../stores/todolist";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
const router = useRouter();
const toDoList = useToDoList();

const resMessage = ref();

const formData = reactive({
  email: "",
  password: "",
  password_confirmation: "",
});

const submit = () => {
  toDoList.register(formData).then(
    (response) => {
      resMessage.value = response.data.message;
      router.push({ name: "login" });
    },
    (error) => {
      resMessage.value = error.response.data.error;
    }
  );
};
</script>

<style scoped></style>
