<template>
    <div class="row">
        <div class="col s12 title-container">
            <h1 class="uppercase fonted">Firebase Firestore</h1>
            <router-link to="/" class="waves-effect waves-light btn-large blue">
                <i class="material-icons left">keyboard_arrow_left</i>back
            </router-link>
        </div>
        <todos-list></todos-list>
        <div class="col m1"></div>
        <add-todo></add-todo>
    </div>
</template>

<style>
    .title-container { 
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 3em 1em;
    }

    h1 { margin: 0; }

    h2.fonted { font-weight: 300; }

    div.fonted, span.fonted, p.fonted { font-weight: 400; }
</style>

<script>
import TodosList from './TodosList.vue';
import AddTodo from './AddTodo.vue';

export default {
    data() {
        return {};
    },

    components: {
        "todos-list": TodosList,
        "add-todo": AddTodo
    }
}
</script>