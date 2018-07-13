<template>
  <div>
    <br>
      <img id="image" class="img-fluid" :src="imgSrc">
      <!-- <img id="image" class="img-fluid" src="static/1.jpg"> -->

      <footer class="footer row" id="footer">
        <div class="col-12">
          <button class="btn btn-sm btn-primary" @click="handlePrevious" :disabled="fileCounter === 0">Previous</button>  
          <button class="btn btn-sm btn-primary" @click="handleNext" :disabled="fileCounter === (fileNames.length - 1)">Next</button>
        </div>
      </footer>
      <br>
      <button class="btn btn-primary" @click="goToWelcomeScreen()">Open Welcome Screen</button>

  </div>
</template>

<script>
  import * as path from 'path'

  export default {
    name: 'image-viewer',
    data () {
      return {
        fileCounter: -1,
        fileNames: []
      }
    },
    computed: {
      imgSrc () {
        return path.join('static/', `${this.fileNames[this.fileCounter]}`)
      }
    },
    methods: {
      handlePrevious () {
        if (this.fileCounter !== 0) { (this.fileCounter)-- }
      },
      handleNext () {
        if (this.fileCounter !== (this.fileNames.length - 1)) { (this.fileCounter)++ }
      },
      goToWelcomeScreen () {
        this.$router.push({'name': 'landing-page'})
      }
    },
    created () {
      this.fileNames = this.$store.getters.fileNames
      this.fileCounter = 0
      console.log('fileNames: ', this.fileNames)
    }
  }
</script>

<style type="text/css">
  .hide {
  display: none;
}

.container-fluid {
  margin: auto;
  height: 100vh;
  vertical-align: middle;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 15px 50px 15px; 
}

#image {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: #fbf9f9;
   text-align: center;
   opacity: 0.7;
   height: 50px;
}
</style>