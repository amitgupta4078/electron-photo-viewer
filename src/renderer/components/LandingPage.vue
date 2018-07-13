<template>
  <div class="row el-center">
    <div class="col-4 text-center">
      <img src="../assets/box.png" style="height: 100px;"/>
      <h4 v-if="!imagesCount">No photos found</h4>
      <p><button type="button" class="btn btn-primary btn-sm" @click="openImage()">
        <span v-if="!imagesCount">Open a photo</span>
        <span v-else>Open other photos</span>
        </button></p>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'landing-page',
    computed: {
      imagesCount () {
        return this.$store.getters.imagesCount
      }
    },
    methods: {
      openImage () {
        console.log('Inside openImage function')
        this.$store.dispatch('showFileBrowserDialog').then((response) => {
          this.$router.push({'name': 'image-viewer'})
        }, (error) => {
          console.log('error: ', error)
        })
      }
    }
  }
</script>

<style lang="css">
  .el-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgb(222, 222, 222);
  }
</style>