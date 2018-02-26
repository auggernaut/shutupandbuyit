<template>
  <div id="Home">
    <!-- <img src="../assets/suabi.png" id="titleImage"> -->
    <header id="header">
      <h1 id='headline'>Shut up and buy it.</h1>
      <h3>Enter an Amazon product link.<br/>Get a short link. Share the joy.</h3>
      <form id="form" v-on:submit.prevent="addSuabiLink">
        <input type="text" v-model="userInput" placeholder="Paste an Amazon Product Url" class='center' v-bind:class="{ error: error }"> <!--  @change="getProductDetails" -->
        <div class="errorMessage" v-if="error">
          {{this.errorMessage}}
        </div>
        <!-- <img :src="productDetails.images.mediumImage" v-else/> -->
        <!-- <textarea type="text" v-model="userInput.message" placeholder="Because..." id='message' class='center' /> -->
        <input type="submit" value="Loading" class='button' v-if="loading" disabled="true">
        <input type="submit" value="Get Link" class='button' v-else>
      </form>
      <h3 id='suabiLink' class="copy-btn" data-clipboard-target="#foo">
          <span id="foo">suab.it{{ this.suabiLink }}</span>
          <span><img src="../assets/clippy.svg" alt="Copy to clipboard"></span>
          <div><transition name="fade"><span v-if="copied">Copied!</span></transition>&nbsp;</div>
      </h3>
      
    </header>

    <div id="intro">
      <!-- <p>You need to buy that 3rd Amazon Echo, maybe some smart lights, and what the hell some of those bouncy balls too.<br/>Why? Because just shut up and buy it, that's why. You know you'll feel better.</p> -->
      <!-- <p>Enter an Amazon product url. We'll give you a short link that flashes "Shut up and buy it" before redirecting to the product.</p> -->
      <p>Don't let people miss out on the joy of one-click buying.</p>
      <p>Tell them to shut up and buy it.</p>
      <!-- Amazon doesn't have a tagline.<br/>But if they did it would definitely be "Shut up and buy it."</h3> -->
    </div>
        
    <div id="content">
      <div class="features">
        <div class="feature">
          <img src='../assets/trophy.svg' class='feature-icon' />
          <h3 class="short">Compete</h3>
          <p class="flush-bottom">
            Join the world's smallest community of shameless product pushers. See if you can make the Top 10!
          </p>
        </div>
        <div class="feature">
          <img src='../assets/networking.svg' class='feature-icon' />          
          <h3 class="short">Nudge</h3>
          <p class="flush-bottom">
            Don't be just another annoying voice on social media. Let us tell people to shut up and buy it for you.
          </p>
        </div>
        <div class="feature">
          <img src='../assets/support.svg' class='feature-icon' />          
          <h3 class="short">Get Reviewed</h3>
          <p class="flush-bottom">
            Coming soon: We write reviews of the Top 10 most clicked SUABIs. Our writers are great at amplifying the awesome.
          </p>
        </div>
      </div>

      <div id='topTen'>
        <h2 id='topTenTitle'>Top 10 SUABIs</h2>
        <div id="items">
          <div class="item" v-for="(sl, i) in this.suabiLinks" :class="{'even': i % 2 === 0, 'odd': i % 2 !== 0 }" v-bind:key="i">
            <a :href="'/p/' + sl.suabiId">
              <div class='ranking'>{{ i + 1 }}</div>
              <img class='prodImage' :src="sl.images.mediumImage"/>
              <div class='visits'>{{ sl.visits }} clicks</div>
            </a>
          </div>
        </div>
      </div>

      <div class="faqIntro">
        <h2 id="faqTitle">FAQ</h2>
        <div class="faqQuestion">You probably have some questions.</div>
        <div class="faqAnswer" style="font-size: 18px; line-height: 30px;">So we thought of a few for you. If these don't satisfy, feel free to ask us on Twitter @ShutUpNBuyIt</div>
        <div><a class="button" href="https://twitter.com/intent/tweet?text=@ShutUpNBuyIt">Tweet Us</a></div>
      </div>
      <div class='masonry'>
        <div class='faqItem'>
          <div class="leftCol"><div class="faqIcon">?</div></div>
          <div class="rightCol">
            <h3 class='faqQuestion'>Is this serious?</h3>
            <p class='faqAnswer'>Sure! No? I mean, who can tell these days anyway.</p>
          </div>
        </div>
        <div class='faqItem'>   
          <div class="leftCol"><div class="faqIcon">?</div></div>
          <div class="rightCol">   
            <h3 class='faqQuestion'>How does this make money?</h3>
            <p class='faqAnswer'>It doesn’t. Got any ideas? Server costs are encroaching on my Amazon trinkets budget.</p>
          </div>
        </div>
        <div class='faqItem'>
          <div class="leftCol"><div class="faqIcon">?</div></div>
          <div class="rightCol">
            <h3 class='faqQuestion'>Why did you make this?</h3>
            <p class='faqAnswer'>Because the world NEEDS more stuff. We’re like Girl Scouts peddling cookies. But not cute and not cookies.</p>
          </div>
        </div>
        <div class='faqItem'>
          <div class="leftCol"><div class="faqIcon">?</div></div>          
          <div class="rightCol">
            <h3 class='faqQuestion'>Why just Amazon links?</h3>
            <p class='faqAnswer'>Where else do you get stuff? Also, because of pretty pictures we get from their api.</p>
          </div>
        </div>
        <div class='faqItem'>
          <div class="leftCol"><div class="faqIcon">?</div></div>          
          <div class="rightCol">
            <h3 class='faqQuestion'>Who can I be angry at about this horrible website?</h3>
            <p class='faqAnswer'>Um… Twitter is a great place for that sort of thing. Just <a href="https://twitter.com/intent/tweet?text=@ShutUpNBuyIt">@ShutUpNBuyIt</a> and we’ll hear you.</p>
          </div>
        </div>
        <div class='faqItem'>        
          <div class="leftCol"><div class="faqIcon">?</div></div>
          <div class="rightCol">
            <h3 class='faqQuestion'>You’re brilliant! How can I say that to you?</h3>
            <p class='faqAnswer'>Thanks! Twitter again. Yep just <a href="https://twitter.com/intent/tweet?text=@ShutUpNBuyIt">throw it out there</a>.</p>
          </div>
        </div>
      </div>
    </div>
    <div class='testimonial'>"If Amazon had a tagline it would definitely be: Shut up and buy it."
    <div class='credit'><strong>- Carl Silverthrone,</strong> Suab.it user and pencil collector.</div></div>

    <div id="footer">Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> and <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
  </div>
</template>

<script>
  var hash = require('json-hash')
  var axios = require('axios')
  var _ = require('lodash')
  var Clipboard = require('clipboard')
  var clipboard = new Clipboard('.copy-btn')

  export default {
    name: 'Home',
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchSuabis()
      // setup copy handlers
      var _this = this
      clipboard.on('success', function (e) {
        console.info('Action:', e.action)
        console.info('Text:', e.text)
        console.info('Trigger:', e.trigger)
        _this.copied = true
        setTimeout(function () {
          _this.copied = false
        }, 3000)
        e.clearSelection()
      })
      clipboard.on('error', function (e) {
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
      })
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchSuabis'
    },
    data () {
      return {
        loading: false,
        copied: false,
        error: false,
        errorMessage: '',
        suabiLinks: [],
        suabiLink: '',
        userInput: '',
        asin: '',
        productDetails: {
          title: '',
          prodUrl: '',
          images: {
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
        this.loading = true
        this.error = false
        var _this = this
        this.productDetails.prodUrl = this.userInput
        var httpsRegEx = 'https?:\/\/.[^\/]*amazon.*[^*]+'
        if (this.productDetails.prodUrl.match(httpsRegEx)) {
          this.productDetails.prodUrl = this.productDetails.prodUrl.match(httpsRegEx)[0]
          var asin = this.productDetails.prodUrl.match('/([a-zA-Z0-9]{10})(?:[/?]|$)')
          if (asin === null) {
            this.errorMessage = 'Url does not contain a product id.'
            this.error = true
            this.loading = false
            return
          }
        } else {
          this.errorMessage = 'Not an amazon url.'
          this.error = true
          this.loading = false
          return
        }
        var saUrl = 'https://suabi-amazon.herokuapp.com/pId/' + asin[1]
        this.asin = asin[1]
        axios.get(saUrl)
        .then(function (response) {
          _this.loading = false
          console.log(response)
          var largeImage, smallImage, mediumImage, title
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
            if (_.findKey(response, (k) => k.ItemAttributes) !== undefined) {
              title = response.data.ItemAttributes.Title
            }
          }
          if (smallImage !== undefined && mediumImage !== undefined && largeImage !== undefined && title !== undefined) {
            _this.error = false
            _this.productDetails.title = title
            _this.productDetails.images = {
              smallImage: smallImage,
              mediumImage: mediumImage,
              largeImage: largeImage
            }
            // data checks out... push to firebase
            var id = hash.digest(_this.asin).substr(2, 7)
            _this.suabiLink = '/p/' + id
            window.firebaseDB.child(id).update(_this.productDetails, function (error) {
              if (error) {
                console.log('Data could not be saved.' + error)
                _this.error = true
                _this.errorMessage = error
              } else {
                // reset data model
                _this.userInput = ''
                _this.productDetails.title = ''
                _this.productDetails.images = {
                  smallImage: '',
                  mediumImage: '',
                  largeImage: ''
                }
              }
            })
          } else {
            // didnt find all product details.
            _this.error = true
            _this.errorMessage = 'Product data not returned successfully from API.'
            return
          }
        })
        .catch(function (error) {
          // some other failure...
          console.log(error.message)
          _this.loading = false
          _this.error = true
          _this.errorMessage = error.message
          return
        })
      },
      fetchSuabis: function () {
        let _this = this
        window.firebaseDB.orderByChild('visits').limitToLast(10).on('child_added', function (snapshot) {
          let item = snapshot.val()
          // let char = ''
          // if (item.prodUrl.indexOf('?') > -1) { char = '&' } else { char = '?' }
          // item.prodUrl += char + 'tag=shutupandbuyi-20'
          item.suabiId = snapshot.key
          _this.suabiLinks.unshift(item)
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
    margin: 0 auto;
    font-size: 4em;
    font-family: 'Passion One', cursive;
  }

  #intro {
    padding: 20px;
    background-color: #c7c7c71c;
  }

  .copy-btn img {
    width: 20px;
    height: 20px;
    /* float: left; */
  }

  .center {
    display: block;
    margin: 0 auto;
    max-width: 600px;
    width: 90%;
    margin-bottom: 20px;
    border: 0;
    border-radius: 5px;
    line-height: 31px;
    font-size: 20px;
    padding: 10px;
  }

  #suabiLink{
    padding: 15px 0px;
    color: white;
    cursor: pointer;
    width: 300px;
    margin: 0 auto;
  }

  .error {
    border: 1px solid red;
  }

  .errorMessage {
    color: red;
    top: -8px;
    position: relative;
  }

  a {
    color: black;
  }

  a:hover {
    color: black;
  }

  .button {
    text-decoration: none;
    color: #ffffff!important;
    border-width: 10px!important;
    border-color: #7272ff;
    border-radius: 100px;
    letter-spacing: 1px;
    font-size: 18px;
    font-weight: 700!important;
    text-transform: uppercase!important;
    padding: 0.7em 1.4em;
    background-color: #7272ff;
  }

  .button:hover {
  	background-color: #09e1c0;
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
    /* padding-top: 50px; */
    font-size: 20px;
  }

  #content div {
    padding: 20px;
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

  .testimonial {
    margin-top: 50px;
    padding: 50px !important;
    height: 100%;
    font-weight: 700;
    font-size: 36px;
    line-height: 1.5em;
    color: white;
    background-blend-mode: overlay;
    background-color: initial!important;
    background-image: url(../assets/coding-background-texture.jpg),linear-gradient(180deg,#474ab6 0%,#9271f6 100%)!important;
  }

  #topTen {
    margin-bottom: 50px;
    background-size: cover;    
    background-blend-mode: overlay;
    background-color: initial!important;
    background-image: url(../assets/coding-background-texture.jpg),linear-gradient(180deg,#474ab6 0%,#9271f6 100%)!important;
  }

  #footer {
    font-size: 12px;
    padding: 10px;
    background-color: rgba(0,0,0,.8);
    color: white;
  }

  #footer a {
    color: gray;
  }

  .credit {
    font-weight: normal;
    color: #d4ccff!important;
    font-size: 18px;
    line-height: 1.2em;
  }

  @media (min-width: 480px) {
    .masonry { /* Masonry container */
      column-count: 2;
      column-gap: 1em;
    }
    .faqIntro {
      width: 33%;
      float:left;
      text-align: left;
    }

    .item.even {
      left: -120px;
    }

    .item.odd {
      left: 120px;
    }
  }

  @media (max-width: 481px) {
    .masonry { /* Masonry container */
      column-count: 1;
      column-gap: 1em;
    }
    .faqIntro {
      width: 100%;
      float:left;
      text-align: left;
    }
    .item.even {
      left: -90px;
    }
    .item.odd {
      left: 90px;
    }
  }

  h2 {
    font-weight: 700;
    font-size: 42px;
    line-height: 1.5em;
    margin-bottom: 0;
  }

  #topTenTitle {
    color: white!important;
  }

  #faqTitle{
    padding-left: 20px;
    color: #7272ff!important;
    margin: 0;
  }

  .faqItem { /* Masonry bricks or child elements */
    display: inline-block;
    width: 100%;
    text-align: left;
  }

  .faqIcon {
    color: white;
    background-color: #09e1c0;
    width: 30px;
    height: 30px;
    display: block;
    border-radius: 16px;
    line-height: 30px;
    font-size: 24pt;
    padding: 0 !important;
    text-align: center;
    font-weight: bold;
  }

  .faqItem .leftCol {
    display: table-cell;
    width: 32px;
    line-height: 0;
    padding: 0px 15px !important;
  }

  .faqItem .rightCol {
    padding: 0 !important;
    display: table-cell;
    vertical-align: top;
    text-align: left;
  }

  .faqQuestion {
    font-weight: 700;
    color: #2e2545!important;
    line-height: 1.5em;
    font-size: 18px;
    margin: 0;
  }
  
  .faqAnswer {
    color: #8585bd!important;
    font-size: 16px;
  }

  #items {
    width: 240px;
    margin: 0 auto;
    padding-bottom: 170px !important;
  }

  .item { 
    width: 100%;
    height: 120px;
    display: block;
    position: relative;
  }

  .item a {
    text-decoration: none;
  }

  .ranking {
    width: 40px;
    height: 40px;
    background-color: #7272ff;
    color: white;
    display: block;
    border-radius: 25px;
    line-height: 40px;
    font-size: 24pt;
    top: 35px;
    left: 0px;
    position: relative;
    padding: 0 !important;
  }

  .visits {
    height: 50px;
    padding: 0 !important;
    display: inline-block;
    color: white;
  }

  .prodImage {
    border-radius: 80px;
  }

  .feature-icon {
    width: 60px;  
  }

  #header{
    color: white;
    width: 100%;
    background: url(../assets/laptop-background.jpg) top center no-repeat;
    background-color: rgba(0,0,0,.6);
    background-blend-mode: multiply;
    background-size: cover;
    padding: 60px 0px;
  }

  @media (max-width: 480px) {
    .feature {
      width: 100%;
      padding-top: 0;
    }
  }

  .features {
    display: inline-block;
    width: 100%;
  }

  @media (min-width: 481px) {
    .feature {
      width: 33.3%;
      float: left;
      padding: 10px 20px;
      text-align: center;
      box-sizing: border-box;
    }
  }

  * {
      box-sizing: border-box;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
