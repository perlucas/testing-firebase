<template>
    <div class="row">
        <div class="col s12 title-container">
            <h1 class="uppercase fonted">Firebase Realtime Database</h1>
            <router-link to="/" class="waves-effect waves-light btn-large blue">
                <i class="material-icons left">keyboard_arrow_left</i>back
            </router-link>
        </div>
        <robot-status></robot-status>
        <div class="col m1"></div>
        <change-robot-status></change-robot-status>
    </div>
</template>

<script>
import RobotViewer from './RobotStatusViewer.vue';
import RobotStatusControl from './RobotStatusControl.vue';

export default {
    data() {
        return {};
    },

    components: {
        "robot-status": RobotViewer,
        "change-robot-status": RobotStatusControl
    }
}
</script>