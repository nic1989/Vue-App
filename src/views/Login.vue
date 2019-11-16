<template>
  <div class="container mt-3">
    <div class="mt-3" v-if="authenticationError">
      <b-alert 
        :variant="authenticationErrorCode" show>
        {{authenticationError}}
      </b-alert>
    </div>
    
    <b-card class="mt-3" header="Sign in">
      <b-form @submit.prevent="onSubmit">
        <b-form-group  label="Email address:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:" label-for="password">
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-2">Login</b-button>
        <b-button variant="primary" disabled v-if="authenticating">
          <b-spinner small type="grow"></b-spinner>
          verifying your details...
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import loginData from '../json/login'

export default {
    name: "login",
    data() {
      return {
        form: {
            email: loginData.email,
            password: loginData.password,
        }
      }
    },
    computed: {
        ...mapGetters('auth', [
            'authenticating',
            'authenticationError',
            'authenticationErrorCode',
            'authenticationSuccess'
        ])
    },
    methods: {
        ...mapActions('auth', ['login']),
        onSubmit() {
            // Perform a simple validation that email and password have been typed in
            if (this.form.email != '' && this.form.password != '') {
                this.login({email: this.form.email, password: this.form.password})
            }
        }
    }
}
</script>