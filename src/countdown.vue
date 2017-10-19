<template>
    <span class="countdown">
        {{countTime}}
    </span>
</template>
<script>
import Vue from "vue";

export default {
    name:'c-countdown',
    created(){
        this.fStartCountdown();
    },
    destroyed(){
        clearInterval(this.timer);
    },
    props:{
        endtime:{
            type:Number,
            required:true
        },
        starttime:{
            type:Number,
            required:true
        },
        second:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            timer:'',
            countTime:''
        }
    },
    watch:{
        endtime(val){
            this.fStartCountdown();
        },
        starttime(val){
            this.fStartCountdown();
        },
        second(val){
            this.fStartCountdown();
        }
    },
    methods:{
        fStartCountdown(){
            const self = this,
                  endTime = self.endtime;
            let startTime = self.starttime;
            if(isNaN(self.starttime)){
                return;
            }
            if(isNaN(self.endtime)){
                return;
            }
            if(self.timer){
                clearInterval(self.timer);
            }
            self.timer = setInterval(function(){
                self.countTime = self.fCountdown(endTime,startTime) || '0天00时00分00秒';
                startTime += 1000;
            },1000);
        },
        fCountdown(endTime,currentTime){
            let sTime = '';
            let nDiff = endTime - currentTime;
            if(nDiff <= 0){
                this.$emit('onComplete');
                clearInterval(this.timer);
                return;
            }
            const nDays = Math.floor(nDiff/(24*60*60*1000));
            if(nDays >= 0){
                nDiff -= nDays * (24*60*60*1000);
                sTime += nDays + '天';
            }
            const nHour = Math.floor(nDiff/(60*60*1000));
            if(nHour >= 0){
                nDiff -= nHour * (60*60*1000);
                sTime += (nHour < 10 ? ('0' + nHour) : nHour) + '时';
            }
            const nMin = Math.floor(nDiff/(60*1000));
            if(nMin >= 0){
                nDiff -= nMin * (60*1000);
                sTime += (nMin < 10 ? ('0' + nMin) : nMin) + '分';
            }
            if(this.second){
                const nSecond = Math.floor(nDiff/1000);
                if(nSecond >= 0){
                    nDiff -= nSecond * 1000;
                    sTime += (nSecond < 10 ? ('0' + nSecond) : nSecond) + '秒';
                }
            }
            return sTime;
        }
    }
}
</script>
<style lang="sass" scoped>
    
</style>