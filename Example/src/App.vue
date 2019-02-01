<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import './styles/index.css'
  import './styles/common.css'

  export default {
    name: 'app',
    data() {
      return {}
    },
    methods: {
      toNext1() {
        axios({method: 'get', url: 'http://127.0.0.1:8081/jcapi2/cs'}).then(function (res) {
          console.log(res.data.name);
        });
        this.page = 1;
        this.$refs.game.handleReset();
      },
      getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
          console.log(arr);
          return unescape(arr[2]);
        }
        return null;
      }

    },
    mounted() {
      //挂载到页面上时会调用，只会调用一次
    }
  }
</script>

<style>

</style>
