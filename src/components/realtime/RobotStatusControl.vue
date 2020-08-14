<template>
    <form class="col m6 s12 z-depth-1">
        <h2 class="fonted">Update Robot Status</h2>
        <div class="row">
            <div class="input-field col s12">
                <select v-model="status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                </select>
                <label class="fonted">Status</label>
            </div>

            <div class="input-field col s12">
                <input v-model="comments" id="comment" type="text" class="vaidate">
                <label for="comment">Comments</label>
            </div>

            <div class="input-field col s12">
                <a class="waves-effect waves-light btn blue" @click="tryToUpdateState()">update</a>
            </div>
        </div>
    </form>
</template>

<script>
import Materialize from 'materialize-css';
import Database from './Database';
import ErrorNotifier from '../ErrorNotifier';

const getSelectElement = (root) => root.querySelector("select");

export default {
    mounted() {
        this.initializeScreenComponents();
    },

    data() {
        return {
            status: "active",
            comments: ""
        }
    },

    methods: {
        initializeScreenComponents() {
            Materialize.FormSelect.init( getSelectElement(this.$el));
        },

        tryToUpdateState() {
            Database.updateState({
                state: this.status,
                comments: this.comments
            })
                .then(() => this.resetValues())
                .catch(() => ErrorNotifier.notifyError(
                    "An error has ocurred when attempting to update the state"
                ));
        },

        resetValues() {
            this.status = "active";
            this.comments = "";

            Materialize.FormSelect.getInstance(getSelectElement(this.$el)).input.value = "Active";
        }
    }
}
</script>