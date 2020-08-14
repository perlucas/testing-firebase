function addZeroToNumber(aNumber) {
    let numberAsString = aNumber + "";
    return numberAsString.length > 1 ? numberAsString : ("0" + numberAsString);
}

function convertDateToString(date) {
    let dateValues = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
        .map(value => addZeroToNumber(value));
    let timeValues = [date.getHours(), date.getMinutes(), date.getSeconds()]
        .map(value => addZeroToNumber(value));
    return dateValues.join("/") + " " + timeValues.join(":");
}

function dateIsLowerThan(target, compareWith) {
    let timeDifference =  target.getTime() - compareWith.getTime();
    return timeDifference < 0;
}

function timeToDate(time) {
    return new Date(time);
}

export {convertDateToString, dateIsLowerThan, timeToDate};