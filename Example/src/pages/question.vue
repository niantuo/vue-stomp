<template>
  <div class="answer-container">
    <div class="question-container" v-bind:class="{page2:current===2}">
      <div v-for="(item,itemIndex) of questions" class="question-item"
           v-show="itemIndex>=startIndex&&itemIndex<endIndex"
           :key="`q_${item.id}`">
        <h3>{{item.title}}({{userAnswer(item)}})</h3>
        <div v-for="(answer,index) of item.choice" class="answer-item"
             @click="handleChoice(item,index)"
             :key="`q_a_${item.id}_${index}`">{{answer}}
        </div>
      </div>
      <div style="display: flex;justify-content: center;padding-top: 20px">
        <button class="next-btn" @click="handleNext"></button>
      </div>
    </div>

    <tina-dialog :show-dialog="showErrorDialog" class="error-answer-dialog">
      <div class="content">
        <img @click="handleClose" style="width: 80%;height: auto" alt=""
             src="../assets/notice/again_tomorrow.png">
        <span class="error-hint">您只答对了{{correctCount}}道题！</span>
      </div>
    </tina-dialog>

    <tina-dialog :show-dialog="showDialog" class="error-answer-dialog">
      <img @click="handleToGame" style="width: 80%;height: auto;margin: 0 auto" alt=""
           src="../assets/answer/all_correct_dialog.png">
    </tina-dialog>

  </div>
</template>

<script>
  import {QUESTIONS, USER_AN} from '../data/const'
  import moment from 'moment'
  import {KEYS} from '../const'
  import {putItem} from "../utils/store";
  import TinaDialog from "../components/Dialog/TinaDialog";

  export default {
    name: "answer",
    components: {TinaDialog},
    data() {
      return {
        questions: [].concat(QUESTIONS),
        pageSize: 3,
        current: 1,
        showErrorDialog: false,
        showDialog: false,
        correctCount: 0
      }
    },
    methods: {
      userAnswer(item) {
        return USER_AN[item.userA]
      },
      handleChoice(item, index) {
        item.userA = index + 1;
      },
      handleNext() {
        let isAll = true;
        let maxIndex = this.endIndex;
        if (maxIndex > this.questions.length) {
          maxIndex = this.questions.length;
        }
        for (let index = 0; index < maxIndex; index++) {
          let question = this.questions[index];
          isAll = isAll && question.userA;
        }
        if (!isAll) {
          alert("请完成本页题目！");
          return;
        }
        this.putCurrentDate(); //记录答题时间
        if (this.current === 1) {
          this.current = 2;
        } else if (this.current === 2) {
          let allCorrect = true;
          this.questions.forEach(item => {
            if (item.userA === item.answer) {
              this.correctCount++;
            }
            allCorrect = allCorrect && (item.userA === item.answer)
          });

          if (allCorrect) {
            this.showDialog = true;
          } else {
            this.showErrorDialog = true;
          }
        }
      },
      handleErrorBtn() {
        this.showErrorDialog = false;
        this.showDialog = false;
        this.reset();
      },
      reset() {
        console.log('question page=> reset');
        this.questions.forEach(item => {
          item.userA = 0;
        });
        this.current = 1;
      },
      putCurrentDate() {
        let currentDate = moment().format('YYYY-MM-DD');
        console.log('currentDate: ', currentDate);
        putItem(KEYS.LAST_FILL_QUESTION_DATE, currentDate);
      },
      handleClose() {
        this.showErrorDialog = false;
        this.$router.push('/')
      },
      handleToGame() {
        this.showDialog = false;
        this.$router.push('/game')
      }
    },
    computed: {
      startIndex() {
        return this.pageSize * (this.current - 1)
      },
      endIndex() {
        return this.pageSize * this.current
      }
    }
  }
</script>

<style scoped>
  .answer-container {
    height: 100%;
    background-image: url("../assets/answer/bg.png");
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
  }

  .question-container {
    background-image: url("../assets/answer/question_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 15px;
    left: 15px;
    right: 15px;
    min-height: 450px;
    max-height: 70%;
    box-sizing: border-box;
    padding: 10% 30px 15px;
  }

  .question-container.page2 {
    background-image: url("../assets/answer/bg_2.jpg");
    background-size: 100% auto;
  }

  .question-container .question-item {
    padding-top: 10px;
  }

  .question-item h3 {
    display: block;
    color: white;
    font-size: 90%;
  }

  .question-item .answer-item {
    color: white;
    font-size: 75%;
    padding-top: 1px;
  }

  .next-btn {
    height: 30px;
    width: 110px;
    background-image: url("../assets/answer/next_btn.png");
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .error-answer-dialog {

  }

  .error-answer-dialog .content {
    text-align: center;
    position: relative;
  }

  .error-answer-dialog .content .error-hint {
    color: red;
    font-size: 1rem;
    position: absolute;
    left: 0;
    top: 50%;
    right: 0;
    text-align: center;
  }

  .error-answer-dialog >>> .thank-join .tina-content {
    background: transparent;
    width: auto;
    margin: 0 auto;
    overflow: hidden;
  }


</style>
