<template>
  <div class="notice-container">
    <img alt="" src="../assets/img/notice.jpg" @click="handleNext"/>
    <tina-dialog :show-dialog.sync="showInfoDialog">
      <template slot="title">
        <span @click="handleResetInfo" class="dialog-close-btn">x</span>
      </template>
      <div class="info-dialog">
        <h3 style="font-size: 1rem;color: yellow">完善信息后开始答题！</h3>
        <img style="width: 100px;height: auto" alt="" src="../assets/game/prize_img.png">
        <div>
          <input v-model="userInfo.name" class="form-input" placeholder="姓名">
          <input v-model="userInfo.card" class="form-input" placeholder="身份证号" type="number">
          <textarea v-model="userInfo.company" class="form-input form-text" placeholder="单位、联系方式"></textarea>
        </div>
        <button class="submit-btn" @click="handleSubmit">确定</button>
      </div>
    </tina-dialog>

    <tina-dialog :show-dialog="showNoFirstDialog" class="no-first-dialog">
      <img @click="handleClose" style="width: 80%;height: auto" alt=""
           src="../assets/notice/again_tomorrow.png">
    </tina-dialog>

  </div>
</template>

<script>
  import {getItem} from "../utils/store";
  import TinaDialog from "../components/Dialog/TinaDialog";
  import {KEYS} from '../const'
  import moment from 'moment'
  import {getUserInfo, queryHasInfo} from "../api";

  export default {
    name: "notice",
    components: {TinaDialog},
    data() {
      return {
        hasInfo: false, //是否已经录入过信息
        isFirst: true,// 是否已经答过题了
        showInfoDialog: false,
        showNoFirstDialog: false,
        userInfo: {
          name: '',
          card: '',
          company: ''
        }
      }
    },
    methods: {
      handleNext() {
        if (!this.hasInfo) {
          this.showInfoDialog = true;
          // } else if (!this.isFirst) {
          //   this.showNoFirstDialog = true;
        } else {
          this.$router.push('/question') //跳转到答题界面
        }
      },
      updateInfo() {
        let lastDate = getItem(KEYS.LAST_FILL_QUESTION_DATE);
        if (lastDate && lastDate === moment().format('YYYY-MM-DD')) {
          this.isFirst = false;
        }
        queryHasInfo()
          .then(data=>{
            if (data && data.code === 0){
              this.hasInfo = data.data==='1'
            }else {
              this.hasInfo = false;
            }
          })
          .catch(e=>{
            alert(e.message)
          })
      },
      handleResetInfo() {
        this.userInfo = {};
        this.showInfoDialog = false;
      },
      handleSubmit() {
        //提交用户信息，提交成功之后跳转到答题界面
        getUserInfo(this.userInfo)
          .then(data => {
            if (data && data.code === 0){
              this.hasInfo = true;
              alert('提交成功！');
              this.showInfoDialog = false;
              this.handleNext();
            } else {
              this.hasInfo = false;
              alert(data.msg)
            }
          }).catch(e => {
          this.hasInfo = false;
          alert(e.message)
        })
      },
      handleClose() {
        this.showNoFirstDialog = false;
      }
    },
    created() {
      this.updateInfo();

    }
  }
</script>
<style scoped>
  .notice-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .notice-container img {
    height: 100%;
    width: auto;
    margin: 0 auto;
  }

  .notice-container >>> .thank-join .tina-title {
    justify-content: flex-end;
    padding-right: 15px;
  }

  .notice-container >>> .tina-dialog .thank-join .tina-content {
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 15px;
    background: red;
  }

  .notice-container >>> .no-first-dialog .thank-join .tina-content {
    background: transparent;
  }

  .notice-container .dialog-close-btn {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: solid 1px white;
    color: white;
  }


  .info-dialog {
  }

  .info-dialog .form-input {
    margin-top: 5px;
    width: 100%;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    padding: 2px 10px;
    box-sizing: border-box;
    line-height: 28px;
  }

  .info-dialog .form-text {
    height: 40px;
  }

  .info-dialog .submit-btn {
    width: 120px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background-color: orange;
    margin-top: 15px;
    color: white;
  }

  .submit-btn:active {
    background-color: darkorange;
  }

</style>
