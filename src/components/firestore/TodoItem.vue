<template>
    <li>
        <div class="collapsible-header">
            <span 
                :class="headerCssProperties"
            >{{ todo.content }}</span>
            <a 
                v-if="!todo.isCompleted && !todo.isPermanent && !isExpired" 
                class="waves-effect waves-teal btn-flat" 
                @click.stop="tryToComplete()"
            >complete</a>
            <a 
                class="waves-effect waves-teal btn-flat" 
                @click.stop="tryToDeleteTodo()"
            >delete</a>
        </div>
        <div class="collapsible-body todo-detail left-align">
            <span 
                class="grey-text lighten-2-text fonted"
            >{{ todoStateDescription }}</span>
            <span 
                class="grey-text lighten-2-text fonted" 
                v-if="!todo.isPermanent && !todo.isCompleted"
            >Expires in: {{ expirationDateAsString }}</span>
        </div>
    </li>
</template>

<style>
    .italics { font-style: italic; }
</style>

<style scoped>
    .collapsible-body span { display: block; }

    .collapsible-header span { 
        align-self: center;
        text-align: left;
    }

    .collapsible-header { justify-content: space-between; }

    .collapsible-header a:hover { color: var(--main-color); }
</style>

<script>

import Database from './Database';
import ErrorNotifier from '../ErrorNotifier';
import * as TimeUtils from '../TimeUtils';

export default {
    data() {
        return {};
    },

    computed: {
        headerCssProperties: function () {
            let cssClassesToAdd = ["fonted"];
            
            if (this.todo.isCompleted) {
                cssClassesToAdd.push("green-text text-darken-3");
            } else if (this.todo.isPermanent) {
                cssClassesToAdd.push("blue-text text-darken-1");
            } else {
                cssClassesToAdd.push(
                    this.isExpired ? "grey-text lighten-1-text" : "red-text text-lighten-1"
                );
            }
            
            if (this.todo.isPermanent) {
                cssClassesToAdd.push("italics");
            }
            
            let cssObject = {};
            for (let cssClass of cssClassesToAdd) {
                cssObject[cssClass] = true;
            }
            return cssObject;
        },

        todoStateDescription: function() {
            if (this.todo.isPermanent) return "Permanent todo.";
            if (this.todo.isCompleted) return "Completed.";
            if (this.isExpired) return "Expired.";
            return "Pending todo.";
        },

        expirationDate: function () {
            return new Date(this.todo.expiresIn.seconds * 1000);
        },

        expirationDateAsString: function () {
            return TimeUtils.convertDateToString(this.expirationDate);
        },

        isExpired: function () {
            return TimeUtils.dateIsLowerThan(this.expirationDate, new Date());
        }
    },

    methods: {
        tryToDeleteTodo() {
            Database.deleteTodo(this.todo.id)
                .then(() => this.$emit("deleted", this.todo.id))
                .catch(() => 
                    ErrorNotifier.notifyError("An error has ocurred when attempting to delete the todo!")
                );
        },

        tryToComplete() {
            Database.completeTodo(this.todo.id)
                .then(() => this.todo.isCompleted = true)
                .catch(() => 
                    ErrorNotifier.notifyError("An error has ocurred when attempting to update the todo!")
                );
        }
    },

    props: [ "todo" ]
};

</script>