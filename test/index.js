const {countdown} = VueCountdown;
console.log(countdown);
new Vue({
  name:'c-app',
  el: '#container',
  created() {
      
  },
  data() {
    return {
      startTime:+new Date(),
      endTime:+new Date() + 10000 * 1000
    }
  },
  components: {
    'c-countdown': countdown
  }
});