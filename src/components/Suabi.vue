<template>
  <div id="Suabi">
    <!-- <div class="loading" v-if="loading">
      Loading...
    </div> -->
    <!-- <img :src="userInput.prodImage.largeImage" v-else id='prodImage'/> -->
    <!-- <h1 class='slide1 fade-out is-paused'>{{ this.userInput.message }}</h1> -->
    <h1 class='flashText'>Shut up and buy it.</h1>
    <!-- <button v-on:click="suabiClick" class='button' v-if="loading === false">Shut up and buy it</button> -->
    <!-- <h1><a :href='this.userInput.prodUrl'>{{ this.userInput }}</a></h1> -->
    <!-- <div class='fb-comments' :data-href="'https://shutupandbuy.it' + this.$route.path" data-numposts='20' :data-width='this.width' id='comments'></div> -->
  </div>
</template>

<script>
  export default {
    name: 'Suabi',

    data () {
      return {
        width: '',
        suabiLink: '',
        userInput: {
          message: '',
          prodUrl: '',
          prodImage: {
            smallImage: '',
            mediumImage: '',
            largeImage: ''
          }
        }
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData()
      this.width = window.innerWidth * 0.85
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.loading = true
        let _this = this
        window.firebaseDB.child(this.$route.params.id).on('value', function (snapshot, prevChildKey) {
          _this.userInput = snapshot.val()
          _this.loading = false
          // setTimeout(function () {
          //   var slide1 = document.querySelector('.slide1')
          //   var slide2 = document.querySelector('.slide2')
          //   slide1.classList.remove('is-paused')
          //   slide2.classList.remove('is-paused')
          // }, 3000)
          // setTimeout(function () {
          //
          // }, 5000)
        })
      },
      suabiClick () {
        let char = ''
        if (this.userInput.prodUrl.indexOf('?') > -1) { char = '&' } else { char = '?' }
        window.location = this.userInput.prodUrl + char + 'tag=shutupandbuyi-20'
      }
    }
  }
</script>

<style>
  #prodImage {
    max-width: 720px;
    max-height: 500px;
    object-fit: contain;
    width: 100%;
  }

  #Suabi {
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
    padding-bottom:50px;
    display: inline-block;
    margin: 0 0 1em;
    width: 100%;
    background-color: #fff;
    padding: 5% 5% 30px 5%;
    box-sizing: border-box;
    font-family: 'Passion One', cursive;
    font-size: 40px;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }

  .fade-in {
    opacity: 0;
    animation: fadeIn 1s ease-in 1 forwards;
  }

  .fade-out {
    opacity: 1;
    animation: fadeOut 1s ease-in 1 forwards;
  }

  .is-paused {
    animation-play-state: paused;
  }

  .flashText {
    animation-name: flashText;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
  }

  @keyframes flashText {
      from {color: white;}
      to {color: black;}
  }

  .flashBackground {
    animation-name: flashBackground;
    animation-duration: .4s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
  }

  @keyframes flashBackground {
      from {background-color: black;}
      to {background-color: white;}
  }
</style>
