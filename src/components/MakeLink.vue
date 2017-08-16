<template>
  <div id="MakeLink">
    <img src="../assets/babyface.png" id="titleImage">
    <h1>Tell your friends to<br/>shut up and buy it.</h1>
    <form id="form" v-on:submit.prevent="addSuabiLink">
      <input type="text" v-model="userInput.prodUrl" placeholder="Product Url" class='center' @change="getProductImage">
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <img :src="userInput.prodImage.mediumImage" v-else/>
      <textarea type="text" v-model="userInput.message" placeholder="Because..." id='message' class='center' />
      <input type="submit" value="Get Link" class='button'>
    </form>
    <h3><a :href='this.suabiLink'>shutupandbuy.it{{ this.suabiLink }}</a></h3>
    <div class='masonry'>
      <div class="item" v-for="sl in this.suabiLinks">
        <a :href='sl.suabiId'>
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

  export default {
    name: 'MakeLink',
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
        // this.userInput.id = Math.random().toString(36).substr(2, 9)
        var id = hash.digest(this.userInput).substr(2, 10)
        this.suabiLink = '/' + id
        window.firebaseDB.child(id).set(this.userInput)
        // this.userInput.fromName = ''
        // this.userInput.prodUrl = ''
      },
      fetchSuabis: function () {
        let _this = this
        window.firebaseDB.limitToLast(15).on('child_added', function (snapshot) {
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
        var asin = this.userInput.prodUrl.match('/([a-zA-Z0-9]{10})(?:[/?]|$)')
        console.log(asin[1])
        var saUrl = 'https://suabi-amazon.herokuapp.com/pId/' + asin[1]
        axios.get(saUrl)
          .then(function (response) {
            console.log(response)
            _this.loading = false
            var ref
            _this.userInput.prodImage = {
              smallImage: (ref = response.data.SmallImage) != null ? ref.URL : void 0,
              mediumImage: (ref = response.data.MediumImage) != null ? ref.URL : void 0,
              largeImage: (ref = response.data.LargeImage) != null ? ref.URL : void 0
            }
          })
          .catch(function (error) {
            console.log(error.message)
            _this.loading = false
          })
      }
    }
  }
</script>

<style>
  .center {
    display: block;
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 3px solid rgba(0,0,0,.2);
    line-height: 31px;
    font-size: 20px;
    padding: 10px;
  }

  a {
    color: rgba(0,0,0,.4);
  }

  a:hover {
    color: black;
  }

  .button {
    -moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
  	-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
  	box-shadow:inset 0px 1px 0px 0px #ffffff;
  	background-color:transparent;
  	-moz-border-radius:6px;
  	-webkit-border-radius:6px;
  	border-radius:6px;
  	border:1px solid #dcdcdc;
  	display:inline-block;
  	cursor:pointer;
  	color:black;
  	font-family:Arial;
  	font-size:20px;
  	font-weight:bold;
  	padding:10px 24px;
  	text-decoration:none;
  	text-shadow:0px 1px 0px #ffffff;
  }

  .button:hover {
  	background-color:#ddd;
  }

  .button:active {
  	position:relative;
  	top:1px;
  }

  #MakeLink {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 50px;
    font-size: 20px;
  }

  #titleImage{
    height: 200px;
    border-radius: 200px;
    top: 4px;
    position: relative;
  }

  .masonry { /* Masonry container */
    column-count: 4;
    column-gap: 1em;
  }

  .item { /* Masonry bricks or child elements */
    background-color: #eee;
    display: inline-block;
    margin: 0 0 1em;
    width: 100%;
  }
</style>
