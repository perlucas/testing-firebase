<template>
    <div class="col m5 s12 z-depth-1">
        <div class="list-header">
            <h2 class="fonted">Todos list</h2>
            <a 
                class="btn-floating waves-effect waves-light light-blue" 
                @click="fetchTodos()"
            >
                <i class="material-icons left">autorenew</i>refresh
            </a>
        </div>
        <ul 
            id="todosContainer" 
            class="collapsible z-depth-0" 
            v-show="todos.length > 0"
        >
            <todo-item 
                v-for="todo in todos" 
                :key="todo.id" 
                :todo="todo" 
                @deleted="removeTodo($event)"
            ></todo-item>
        </ul>
    </div>
</template>

<style scoped>
    .list-header { 
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2em;
    }

    .list-header h2 { margin: 0; }
</style>

<script>
import Materialize from 'materialize-css';
import Database from './Database';
import ErrorNotifier from '../ErrorNotifier';
import TodoItem from './TodoItem.vue';

const selectListOfTodos = (root) => root.querySelectorAll("#todosContainer");

export default {
    components: {
        "todo-item": TodoItem
    },

    mounted() {
        this.fetchTodos();
        this.initializeScreenComponents();
    },

    data() {
        return {
            todos: []
        };
    },

    methods: {
        fetchTodos() {
            Database.getTodos()
                .then(fetchedTodos => this.todos = fetchedTodos)
                .catch(err => {
                    ErrorNotifier.notifyError(err);
                    this.todos = [];
                });
        },

        initializeScreenComponents() {
            Materialize.Collapsible.init(selectListOfTodos(this.$el));
        },

        removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id);
        }
    }
};
</script>