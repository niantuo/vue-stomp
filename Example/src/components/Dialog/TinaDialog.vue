<template>
  <div v-show="showDialog" class="tina-dialog">
    <div class="wrapper">
      <div v-show="showDialog" class="thank-join">
        <div class="tina-title">
          <slot name="title"></slot>
        </div>
        <div class="tina-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TinaDialog",
    props: {
      showDialog: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleHidden() {
        this.$emit('update:showDialog', false)
      }
    }
  }
</script>

<style scoped>
  .tina-dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(113, 106, 97, 0.4);
    z-index: 9999;
  }

  .tina-dialog .wrapper {
    height: 100%;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .tina-dialog .thank-join {
    position: relative;
    margin: 0 20px;
    overflow: hidden;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: 30px 15px 15px;
  }

  .thank-join .tina-title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .thank-join .tina-content {
    background: white;
    border-radius: 5px;
    min-height: 150px;
    box-sizing: border-box;
    padding: 60px 15px 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

</style>
