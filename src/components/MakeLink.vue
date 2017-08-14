<!-- App.vue
  This component is the root component for our Vue MakeLinklication. It is rendered
  in the project root's index.html file with the <div id="MakeLink"> tag. The Firebase
  instance exists only within this component.
-->

<template>
  <div id="MakeLink">
    <img src="../assets/babyface.png" id="titleImage">
    <!-- Adding a new greeting; pretty much straight from the documentation! -->
    <form id="form" v-on:submit.prevent="addSuabiLink">
      <input type="text" v-model="userInput.fromName" placeholder="Your name">
      <input type="text" v-model="userInput.prodUrl" placeholder="Product Url">
      <input type="submit" value="Get Link">
    </form>
    <!--
      Here we are iterating through a very simply array of suabiLinks in
      different languages. To do this, we use the "v-for" directive. This
      is linked to our demo Firebase instance, which is described below.
    -->
    <h1><a :href='this.suabiLink'>{{ this.suabiLink }}</a></h1>
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
          fromName: '',
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
  #MakeLink {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  #titleImage{
    height: 150px;
    border-radius: 150px;
  }
</style>
