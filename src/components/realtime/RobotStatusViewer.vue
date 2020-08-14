<template>
    <div class="col m5 s12 z-depth-1">
        <h2 class="fonted">Current Status</h2>
        <div class="state-container">
            <h3 class="fonted">{{ state }}</h3>
            <div :class="'indicator ' + indicatorColor"></div>
        </div>
        <div class="fonted left-align grey-text lighten-2-text">Status updated in: {{ humanDateString }}</div>
        <div class="fonted left-align grey-text lighten-2-text">Comments: {{ comment || "No comments" }}</div>
    </div>
</template>

<style scoped>
    .col { padding: 1em; }

    h3 { 
        font-weight: 300;
        margin: 0;
    }

    .col div:not(.state-container) {
        padding: 0 1em;
    }

    .state-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1em;
        text-transform: capitalize;
    }

    .indicator {
        margin: 0 1em;
        border-radius: 100%;
        width: 20px;
        height: 20px;
    }


</style>

<script>
import Database from './Database';
import ErrorNotifier from '../ErrorNotifier';
import { timeToDate, convertDateToString } from '../TimeUtils';

export default {
    mounted() {
        Database.onNewState(aState => {
            this.state = aState.state;
            this.comment = aState.comments;
            this.timestamp = aState.timestamp;
        });
        Database.getLastState()
            .then(lastState => {
                this.state = lastState.state;
                this.comment = lastState.comments;
                this.timestamp = lastState.timestamp;
            })
            .catch(() => ErrorNotifier.notifyError(
                "Something went wrong when trying to get the last state"
            ));
    },

    data() {
        return {
            state: "unknown",
            comment: "empty",
            timestamp: new Date().getTime()
        };
    },

    computed: {
        humanDateString() {
            return convertDateToString( timeToDate(this.timestamp) );
        },

        indicatorColor() {
            let colorsMap = {
                active: "green",
                inactive: "red",
                suspended: "yellow"
            };
            return colorsMap[this.state];
        }
    }
}
</script>