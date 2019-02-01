<template>
  <div class="game-container">
    <lucky-wheel ref="wheel" :random-index="false"
                 @start="fetchPrizeInfo" class="wheel" @over="gameOver"/>
    <tina-dialog :show-dialog.sync="showDialog" class="prize-dialog">
      <template slot="title">
        <span @click="reset" class="dialog-close-btn">x</span>
      </template>
      <div class="game-dialog-container">
        <img alt="" style="width: 100%;height: auto" src="../assets/game/prize_bg.png">
        <div class="content">
          <span style="flex: 1;font-size: 2rem;color: orange">{{prize.name}}</span>
          <button class="submit-btn" @click="handleSubmit">立即领奖</button>
        </div>
      </div>
    </tina-dialog>

    <tina-dialog :show-dialog.sync="showNoPrizeDialog" class="app-dialog">
      <template slot="title">
        <img alt="" class="title-img" src="../assets/answer/thank_join.png">
      </template>
      <p style="flex: 1">
        活动尚未结束，老铁还需努力，好运！
      </p>
      <div style="padding-right: 20px">
        <button @click="close" class="confirm-btn">确定</button>
      </div>
    </tina-dialog>
  </div>
</template>

<script>
  import LuckyWheel from "../components/LuckyWheel/LuckyWheel";
  import TinaDialog from "../components/Dialog/TinaDialog";
  import {queryPrizeList} from "../api";

  export default {
    name: "game",
    components: {TinaDialog, LuckyWheel},
    data() {
      return {
        showDialog: false,
        showNoPrizeDialog: false,
        prize: {name: ''}
      }
    },
    methods: {
      gameOver(item) {
        console.log('gameOver=>', item);
        if (item.isPrize) {
          this.prize = item;
          this.showDialog = true;
        } else {
          this.showNoPrizeDialog = true;
        }
      },
      handleSubmit() {
        this.showDialog = false;
        let formInfo = this.info;
        console.log('handleSubmit: ', formInfo)
      },
      reset() {
        this.showDialog = false;
        this.info = {};
        this.$emit('reset');
      },
      handleReset() {
        this.showDialog = false;
        this.info = {};
      },
      close() {
        this.showNoPrizeDialog = false;
        window.history.go(-2);
      },
      fetchPrizeInfo() {
        queryPrizeList()
          .then(data => {
            if (data && data.code === 0) {
              this.$refs.wheel.rotating(Number(data.data));
            } else {
              alert(data.msg)
            }
          })
          .catch(e => {
            alert(e.message)
          })
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .game-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-image: url("../assets/game/game_bg.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
  }

  .game-container .wheel {
    margin: 40% auto auto;
  }

  .game-container >>> .thank-join .tina-title {
    justify-content: flex-end;
    padding-right: 15px;
  }

  .prize-dialog > > .thank-join .tina-content {
    background-color: transparent;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 0;
  }


  .game-container .dialog-close-btn {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: solid 1px white;
    color: white;
  }

  .game-dialog-container {
    border-radius: 10px;
    padding: 15px;
    background-color: white;
    position: relative;
  }

  .game-dialog-container img {
    width: 50%;
    display: block;
    margin: 0 auto;
  }

  .game-dialog-container .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
  }

  .game-container .submit-btn {
    background-color: white;
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    width: 150px;
    max-width: 50%;
    font-size: 0.8rem;
    color: orangered;
    margin-bottom: 10px;
  }

  .app-dialog .title-img {
    width: auto;
    height: 60px;
    margin: 0 auto;
  }

  .app-dialog .confirm-btn {
    float: right;
    color: dodgerblue;
    border: none;
  }


</style>
