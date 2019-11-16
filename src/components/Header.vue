<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <div class="container">
                <b-navbar-brand to="/">Vue App</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item v-if="!loggedIn" to="login">Login</b-nav-item>
                        <b-nav-item-dropdown v-if="loggedIn" right>
                            <template v-slot:button-content>
                                <em>My Account</em>
                            </template>
                            <b-dropdown-item to="notes">Notes</b-dropdown-item>
                            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters('auth', ['loggedIn'])
    },
    methods: {
        ...mapActions('auth', ['logout'])
    }
}
</script>