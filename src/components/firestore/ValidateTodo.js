export default {
    validateAndGetWrongFields: (todo) => {
        let wrongFields = [];

        const notEmptyPattern = /([a-zA-Z])+/;
        if (todo.description.trim().length < 5 || ! notEmptyPattern.test(todo.description)) {
            wrongFields.push("description");
        }

        if (! todo.isPermanent) {
            if (todo.date === undefined) { wrongFields.push("date"); }
    
            if (todo.time === undefined) { wrongFields.push("time"); }
        }
        
        return wrongFields;
    }
}