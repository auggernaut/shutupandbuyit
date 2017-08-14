<!-- App.vue
  This component is the root component for our Vue MakeLinklication. It is rendered
  in the project root's index.html file with the <div id="MakeLink"> tag. The Firebase
  instance exists only within this component.
-->

<template>
  <div id="GetLink">
    {{ this.userInput.fromName }} says shut up and buy it.
    <!-- <h1><a :href='this.userInput.prodUrl'>{{ this.userInput }}</a></h1> -->
  </div>
</template>

<script>
  export default {
    name: 'GetLink',

    data () {
      return {
        suabiLink: '',
        userInput: {
          fromName: '',
          prodUrl: ''
        }
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        let _this = this
        window.firebaseDB.child(this.$route.params.id).on('value', function (snapshot, prevChildKey) {
          _this.userInput = snapshot.val()
          setTimeout(function () {
            window.location = _this.userInput.prodUrl + '&tag=shutupandbuyi-20'
          }, 3000)
        })
      }
    }
  }
</script>

<style>
  #GetLink {
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
