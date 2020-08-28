<template>
    <div class="row">
        <div class="col s12">
          <router-link to="/firestore" class="waves-effect waves-teal btn-flat">Firestore</router-link>
          <router-link to="/realtime" class="waves-effect waves-teal btn-flat">Real Time Database</router-link>
          <router-link to="/storage" class="waves-effect waves-teal btn-flat">File Storage</router-link>
        </div>
    </div>
</template>

<style scoped>
  a:hover { color: var(--main-color); }
</style>

<style>
  :root {
    --main-color: #2196f3;
    --main-font: 'Josefin Sans', sans-serif;
  }

  .fonted { font-family: var(--main-font); }

  .uppercase { text-transform: uppercase; }
</style>

<script>
  export default {}
</script>