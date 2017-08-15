<!-- App.vue
  This component is the root component for our Vue MakeLinklication. It is rendered
  in the project root's index.html file with the <div id="MakeLink"> tag. The Firebase
  instance exists only within this component.
-->

<template>
  <div id="MakeLink">
    <img src="../assets/babyface.png" id="titleImage">
    <!-- Adding a new greeting; pretty much straight from the documentation! -->
    <h1>Tell your friends why to<br/>shut up and buy it.</h1>
    <form id="form" v-on:submit.prevent="addSuabiLink">
      <textarea type="text" v-model="userInput.message" placeholder="Message" id='message' class='center' />
      <input type="text" v-model="userInput.prodUrl" placeholder="Product Url" class='center'>
      <input type="submit" value="Get Link" class='button'>
    </form>
    <!--
      Here we are iterating through a very simply array of suabiLinks in
      different languages. To do this, we use the "v-for" directive. This
      is linked to our demo Firebase instance, which is described below.
    -->
    <h3><a :href='this.suabiLink'>shutupandbuy.it{{ this.suabiLink }}</a></h3>
  </div>
</template>

<script>
  var hash = require('json-hash')

  export default {
    name: 'MakeLink',

    /*
     * This section is added to the original CLI-generated App component. This
     * is where VueFire comes into play, allowing us to link our Vue MakeLink to
     * Firebase data relatively simply. More information is on the GitHub page:
     *
     * https://github.com/vuejs/vuefire/
     */

    // firebase: {
    //   suabiLinks: suabiLinksRef.child(id)
    // },

    data () {
      return {
        suabiLink: '',
        userInput: {
          message: '',
          prodUrl: ''
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
</style>
