<template>
    <form class="col m6 s12 z-depth-1">
      <h2 class="fonted">Add Todo</h2>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">edit_mode</i>
          <input 
            type="text" 
            id="todo_content" 
            :class="'validate' + getCssValidationClass('description')" 
            minlength="5"
            required>
          <label for="todo_content" class="fonted">Description</label>
          <span
            v-if="validationState.description.showHint"
            class="helper-text fonted" 
            data-error="Description must be at least 5 characters long" 
            data-success="Sounds good!"></span>
        </div>

        <div class="input-field col s6" v-show="showDateTimeValues">
            <i class="material-icons prefix">calendar_today</i>
            <input 
              type="text" 
              :class="'datepicker validate' + getCssValidationClass('date')" 
              id="expiration_date">
            <label for="expiration_date" class="fonted">Expiration Date</label>
            <span
              class="helper-text fonted" 
              data-error="Pick an expiration date!" 
              data-success="Excellent date!"></span>
        </div>
        
        <div class="input-field col s6" v-show="showDateTimeValues">
            <i class="material-icons prefix">alarm</i>
            <input 
              type="text" 
              :class="'timepicker validate' + getCssValidationClass('time')" 
              id="expiration_time">
            <label for="expiration_time" class="fonted">Expiration Time</label>
            <span
              class="helper-text fonted" 
              data-error="Pick an expiration time!" 
              data-success="Excellent time!"></span>
        </div>
        
        <div class="input-field col s6 left-align">
          <p class="add-todo-is-permanent">
            <label>
              <input 
                type="checkbox" 
                id="is_permanent" 
                @change="updateDateTimeVisibility()"/>
              <span class="fonted">Permanent</span>
            </label>
          </p>
        </div>

        <div class="input-field col s6">
            <a 
              class="waves-effect waves-light btn blue" 
              @click="tryToAddTodo()"
            >add</a>
        </div>

      </div>
    </form>
</template>

<style scoped>
  form { margin-left: 2rem; }

  .add-todo-is-permanent {
    margin: 0;
    padding: 0;
    padding-left: 0.75rem;
  }
</style>

<script>
import Materialize from 'materialize-css';
import Validator from './ValidateTodo';
import Database from './Database';
import ErrorNotifier from '../ErrorNotifier';

const DATE_FORMAT = "dd/mm/yyyy";

const selectDatepicker = (root) => root.querySelector("#expiration_date");
const selectTimepicker = (root) => root.querySelector("#expiration_time");
const selectDescriptionInput = (root) => root.querySelector("#todo_content");
const selectIsPermanentCheck = (root) => root.querySelector("#is_permanent");

export default {
  mounted() { this.initializeScreenComponents(); },

  data() {
    return {
      showDateTimeValues: true,
      validationState: {
        description: { showHint: false, isValid: true },
        date: { showHint: false, isValid: true },
        time: { showHint: false, isValid: true }
      }
    }
  },

  methods: {
    initializeScreenComponents() {
      Materialize.Datepicker.init(selectDatepicker(this.$el), { format: DATE_FORMAT });
      Materialize.Timepicker.init(selectTimepicker(this.$el), { twelveHour: false });
    },

    tryToAddTodo() {
      let todo = this.getTodoValues();
      this.updateValidationState(todo);
      if (this.isTodoValid) {
        Database.saveTodo(todo)
          .then(() => this.clearFormValues())
          .catch(() => 
            ErrorNotifier.notifyError("An error has ocurred when attempting to save the new todo!")
          );
      }
    },

    getTodoValues() {
      const descriptionInput = selectDescriptionInput(this.$el);
      const dateInput = selectDatepicker(this.$el);
      const timeInput = selectTimepicker(this.$el);
      const isPermanentInput = selectIsPermanentCheck(this.$el);

      return {
        description: descriptionInput.value,
        date: Materialize.Datepicker.getInstance(dateInput).date,
        time: Materialize.Timepicker.getInstance(timeInput).time,
        isPermanent: isPermanentInput.checked
      };
    },

    updateValidationState(todo) {
      const fieldsToValidate = ["description", "date", "time"];
      const wrongFields = Validator.validateAndGetWrongFields(todo);
      for (let field of fieldsToValidate) {
        this.validationState[field].showHint = true;
        this.validationState[field].isValid = !wrongFields.includes(field);
      }
    },

    clearFormValues() {
      selectDescriptionInput(this.$el).value = "";
      selectDatepicker(this.$el).value = "";
      selectTimepicker(this.$el).value = "";
      selectIsPermanentCheck(this.$el).checked = false;
      this.updateDateTimeVisibility();
      for (let field in this.validationState) {
        this.validationState[field].showHint = false;
      }
    },

    getCssValidationClass(field) {
      if (this.validationState[field].showHint) {
        return this.validationState[field].isValid ? " valid" : " invalid";
      }
      return "";
    },

    updateDateTimeVisibility () {
      this.showDateTimeValues = ! selectIsPermanentCheck(this.$el).checked;
    }
  },

  computed: {
    isTodoValid: function () {
      if (! this.validationState.description.isValid) return false;
      if (! this.showDateTimeValues) return true;
      return this.validationState.date.isValid && this.validationState.time.isValid;
    }
  }
}
</script>