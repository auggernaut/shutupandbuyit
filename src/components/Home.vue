<template>
  <div id="Home">
    <img src="../assets/suabi.png" id="titleImage">
    <h1 id='headline'>Tell your friends to shut up and buy it.</h1>
    <form id="form" v-on:submit.prevent="addSuabiLink">
      <input type="text" v-model="userInput.prodUrl" placeholder="Amazon Product Url" class='center' v-bind:class="{ error: error }" @change="getProductImage">
      <div class="loading" v-if="loading">
        Loading image...
      </div>
      <img :src="userInput.prodImage.mediumImage" v-else/>
      <textarea type="text" v-model="userInput.message" placeholder="Because..." id='message' class='center' />
      <input type="submit" value="Get Link" class='button' :disabled="error">
    </form>
    <h3 id='suabiLink'><a :href='this.suabiLink'>shutupandbuy.it{{ this.suabiLink }}</a></h3>
    <div class='masonry'>
      <div class="item" v-for="sl in this.suabiLinks">
        <a :href="'/s/' + sl.suabiId">
          <img :src="sl.prodImage.mediumImage"/>
          <h4>{{ sl.message }}</h4>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  var hash = require('json-hash')
  var axios = require('axios')
  var _ = require('lodash')

  export default {
    name: 'Home',
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchSuabis()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchSuabis'
    },
    data () {
      return {
        loading: false,
        error: false,
        suabiLinks: [],
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

    // We have added a simple method to add new suabiLinks to our Firebase.
    methods: {
      addSuabiLink: function () {
        if (this.userInput.prodUrl !== '' && this.userInput.message !== '') {
          var id = hash.digest(this.userInput).substr(2, 10)
          this.suabiLink = '/p/' + id
          let _this = this
          window.firebaseDB.child(id).set(this.userInput, function (error) {
            if (error) {
              console.log('Data could not be saved.' + error)
            } else {
              _this.userInput.message = ''
              _this.userInput.prodUrl = ''
              _this.userInput.prodImage = {
                smallImage: '',
                mediumImage: '',
                largeImage: ''
              }
            }
          })
        }
      },
      fetchSuabis: function () {
        let _this = this
        window.firebaseDB.limitToLast(35).on('child_added', function (snapshot) {
          let item = snapshot.val()
          let char = ''
          if (item.prodUrl.indexOf('?') > -1) { char = '&' } else { char = '?' }
          item.prodUrl += char + 'tag=shutupandbuyi-20'
          item.suabiId = snapshot.key
          _this.suabiLinks.push(item)
        })
      },
      getProductImage: function () {
        this.loading = true
        var _this = this
        this.userInput.prodUrl = this.userInput.prodUrl.match('https?:\/\/[^*]+')[0]
        var asin = this.userInput.prodUrl.match('/([a-zA-Z0-9]{10})(?:[/?]|$)')
        if (asin === null) {
          // product id not found.
          this.error = true
          this.loading = false
          return
        }
        var saUrl = 'https://suabi-amazon.herokuapp.com/pId/' + asin[1]
        axios.get(saUrl)
          .then(function (response) {
            _this.loading = false
            console.log(response)
            var largeImage, smallImage, mediumImage
            if (response.data !== '') {
              if (_.findKey(response, (k) => k.LargeImage) !== undefined) {
                largeImage = response.data.LargeImage.URL
              } else if (_.findKey(response.data.ImageSets, (k) => k.LargeImage) !== undefined) {
                largeImage = response.data.ImageSets.ImageSet.LargeImage.URL
              }
              if (_.findKey(response, (k) => k.MediumImage) !== undefined) {
                mediumImage = response.data.MediumImage.URL
              } else if (_.findKey(response.data.ImageSets, (k) => k.MediumImage) !== undefined) {
                mediumImage = response.data.ImageSets.ImageSet.MediumImage.URL
              }
              if (_.findKey(response, (k) => k.SmallImage) !== undefined) {
                smallImage = response.data.SmallImage.URL
              } else if (_.findKey(response.data.ImageSets, (k) => k.SmallImage) !== undefined) {
                smallImage = response.data.ImageSets.ImageSet.SmallImage.URL
              }
            }
            if (smallImage !== undefined && mediumImage !== undefined && largeImage !== undefined) {
              _this.error = false
              _this.userInput.prodImage = {
                smallImage: smallImage,
                mediumImage: mediumImage,
                largeImage: largeImage
              }
            } else {
              // didnt find all images.
              _this.error = true
            }
          })
          .catch(function (error) {
            console.log(error.message)
            _this.loading = false
            _this.error = true
          })
      }
    }
  }
</script>

<style>
  body {
    margin: 0 auto;
    background-color: rgba(244,244,244,.8);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .loading {
    padding: 10px;
  }

  #headline {
    max-width: 420px;
    margin: 0 auto;
    padding: 30px 0px;
  }

  .center {
    display: block;
    margin: 0 auto;
    max-width: 600px;
    width: 90%;
    margin-bottom: 20px;
    border-color: #c7c7c7;
    border-style: solid;
    border-width: 1px 1px 3px 1px;
    border-radius: 5px;
    line-height: 31px;
    font-size: 20px;
    padding: 10px;
  }

  #suabiLink{
    padding: 15px 0px;
  }

  .error {
    border: 1px solid red;
  }

  a {
    color: rgba(0,0,0,.4);
  }

  a:hover {
    color: black;
  }

  .button {
    /*-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
  	-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
  	box-shadow:inset 0px 1px 0px 0px #ffffff;*/
  	background-color: rgba(46,204,64, .7);
  	-moz-border-radius:6px;
  	-webkit-border-radius:6px;
  	border-radius:6px;
  	border:1px solid #dcdcdc;
  	display:inline-block;
  	cursor:pointer;
  	color:black;
  	font-family:Arial;
  	font-size:22px;
  	font-weight:bold;
  	padding:14px 44px;
  	text-decoration:none;
  	/*text-shadow:0px 1px 0px #ffffff;*/
    margin: 0 auto;
  }

  .button:hover {
  	background-color: rgb(46,204,64);
  }

  .button:active {
  	position:relative;
  	top:1px;
  }

  .button.red {
    background-color: #FF4136;
  }

  #Home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 50px;
    font-size: 20px;
    padding: 50px 20px 0 20px;
  }

  #titleImage{
    height: 220px;
    width: 220px;
    border-radius: 220px;
    top: 4px;
    position: relative;
  }

  #suabiImage {
    height: 220px;
    width: 220px;
    border-radius: 220px;
    top: 4px;
    position: relative;
  }

  #landingTitle {
    font-size: 4em;
  }

  @media (max-width: 480px) {
    .masonry { /* Masonry container */
      column-count: 2;
      column-gap: 1em;
    }
    #Home {
      padding: 30px 4px 0 4px;
    }
  }

  @media (min-width: 481px) {
    .masonry { /* Masonry container */
      column-count: 4;
      column-gap: 1em;
    }
  }
  .item { /* Masonry bricks or child elements */
    display: inline-block;
    margin: 0 0 1em;
    width: 100%;
    border-color: #c7c7c7;
    border-style: solid;
    border-width: 1px 1px 3px 1px;
    border-radius: 5px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 5%;
  }
</style>
