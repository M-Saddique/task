<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

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
                <div v-if="errMsg">
                  {{ errMsg }}
                </div>
                <button
                  class="btn btn-outline-light btn-lg px-5"
                  type="submit"
                  @click="submit()"
                >
                  Login
                </button>
              </div>

              <div>
                <p class="mb-0">
                  Don't have an account?
                  <router-link to="/sign-up">
                    <a href="#!" class="text-white-50 fw-bold"
                      >Sign Up</a
                    ></router-link
                  >
                </p>
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
const toDoList = useToDoList();
const router = useRouter();

const errMsg = ref(null);

const formData = reactive({
  email: "",
  password: "",
});

const submit = () => {
  toDoList.login(formData).then(
    (response) => {
      router.push({ name: "ToDoList" });
    },
    (error) => {
      errMsg.value = error.response.data.message;
    }
  );
};
</script>

<style scoped></style>
