<template>
  <div class="wheel-bg">
    <div class="prize-list" v-bind:style="wheelRotateStyle">
      <div class="prize-item" v-for="(item,index) of prizeList" :key="`prize_${index}`">
        <span hidden>{{item.name}}</span>
      </div>
      <div class="wheel-pointer-box">
        <div @click="rotate_handle" class="wheel-pointer" v-bind:style="pointerRotateStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {PRIZA_LIST} from '../../data/const'

  export default {
    name: "LuckyWheel",
    data() {
      return {
        index: 0,
        pointerRotateStyle: {
          transform: 'rotate(0deg)',
          transition: 'transform 3s ease-in-out'
        },
        wheelRotateStyle: {
          transform: 'rotate(0deg)',
          transition: 'transform 6s ease-in-out'
        },
        clickFlag: 1,
        hasPrize: 0,
        curPointAngle: 0
      }
    },
    props: {
      baseTimeout: {
        type: Number,
        default: 0.2
      },
      minCycle: {
        type: Number,
        default: 6
      },
      prizeList: {
        type: Array,
        default() {
          return PRIZA_LIST;
        }
      },
      randomIndex: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      rotate_handle() {
        if (this.randomIndex) {
          this.index = Math.floor(Math.random() * 5);
          this.rotating();
        } else {
          this.$emit('start')
        }
      },
      rotating(prizeIndex) {
        if (!this.clickFlag) return;
        this.clickFlag = 0;
        if (!this.randomIndex) {
          this.index = prizeIndex;
        }
        this.curPointAngle = this.index * 60 + 360 * this.minCycle;
        let finalAngle = this.curPointAngle % 360;
        console.log('rotating=>', this.index, finalAngle);
        let timeout = this.baseTimeout * (this.curPointAngle / 360);
        this.pointerRotateStyle = {
          transform: `rotate(${this.curPointAngle}deg)`,
          transition: `transform ${timeout}s ease-in-out`
        };
        setTimeout(() => {
          this.gameOver();
        }, timeout * 1000 + 200)
      },
      gameOver() {
        this.curPointAngle = this.curPointAngle % 360;
        this.pointerRotateStyle = {
          transition: 'transform 0s ease-in-out',
          transform: `rotate(${this.curPointAngle}deg)`,
        };
        let prizeItem = this.prizeList[this.index];
        this.clickFlag = 1;
        this.$emit('over', prizeItem);
      }
    },
    watch:{

    }
  }
</script>

<style scoped>
  .wheel-bg {
    width: 18rem;
    height: 18rem;
    color: #fff;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .wheel-bg .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
    background: url("../../assets/wheel/wheel_bg.png") no-repeat center top;
    background-size: 100%;
    transition: transform 3s ease;
  }

  .prize-list .prize-item {
    position: absolute;
    top: 0;
    left: 6rem;
    z-index: 2;
    width: 6rem;
    height: 9rem;
    text-align: center;
    transform-origin: bottom center;
  }

  .prize-list .prize-item:first-child {
    transform: rotate(0deg);
  }

  .prize-list .prize-item:nth-child(2) {
    transform: rotate(60deg);
  }

  .prize-list .prize-item:nth-child(3) {
    transform: rotate(120deg);
  }

  .prize-list .prize-item:nth-child(4) {
    transform: rotate(180deg);
  }

  .prize-list .prize-item:nth-child(5) {
    transform: rotate(240deg);
  }

  .prize-list .prize-item:nth-child(6) {
    transform: rotate(300deg);
  }

  .wheel-bg .wheel-pointer-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -60%);
    width: 6rem;
    height: 6rem;
  }

  .wheel-pointer-box .wheel-pointer {
    width: 6rem;
    height: 6rem;
    background: url("../../assets/wheel/wheel_pointer.png") no-repeat center top;
    background-size: 100%;
    transform-origin: center 60%;
  }

</style>
