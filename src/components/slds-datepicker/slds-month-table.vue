<template>
    <table aria-labelledby="month" aria-multiselectable="true" class="slds-datepicker__month" role="grid">
        <thead>
            <tr id="weekdays">
                <th v-for="(dayOfWeek, i) in daysOfWeekInitials" :key="i" scope="col">
                    <abbr :title="dayOfWeek">{{dayOfWeek}}</abbr>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(week,index) in dateMatrix" :key="index">
                <td v-for="day in week" :key="day.getTime()" role="gridcell" 
                :class="{'slds-disabled-text': !isDayOfThisMonth(day), 'slds-is-selected': isSelected(day)}"  
                @click="isDayOfThisMonth(day)? selectDate(day) : undefined">
                    <span class="slds-day">{{day.getUTCDate()}}</span>
                </td>
            </tr>
        </tbody>
        </table>
</template>
<script>
import moment from "moment";
export default {
  props: {
    options: {
      type: Object,
      default: () => {return undefined}
    },
    value: {
       type: [Date,String],
       default: () => {return new Date()}
    },
    month:{
        type: Number,
        default: new Date().getUTCMonth()
    },
    year:{
        type: Number,
        default: new Date().getUTCFullYear()
    }
  },
  computed: {
    daysOfWeekInitials: function() {
      let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      if (this.options !== undefined)
        return this.options.daysOfWeekInitials !== undefined ||
          this.options.daysOfWeekInitials.length !== 7
          ? this.options.daysOfWeekInitials
          : daysOfWeek;
      else return daysOfWeek;
    },
    firstDayOfMonth(){
        let firstDay = new Date();
        firstDay.setUTCDate(1);
        firstDay.setUTCMonth(this.month);
        firstDay.setUTCFullYear(this.year)
        return firstDay.getDay();
    },
    dateMatrix: function(){
        let matrix = [];
        let index = 1 - this.firstDayOfMonth;
        for(let i = 0; i < 6; i++){
            matrix.push([])
            for(let j = 0; j < 7; j++){
                let date = new Date()
                date.setUTCDate(index);
                if(index < 1){
                    date.setUTCMonth(this.month-1 < 0 ? 11 : this.month-1);
                }else{
                   if(index > this.daysInMonth(this.month, this.year)){
                       date.setUTCMonth(this.month+1 > 11? 0: this.month+1);
                   } 
                   else{
                       date.setUTCMonth(this.month);
                   }
                }
                
                date.setUTCFullYear(this.year);
                matrix[i].push(date);
                index++
            }
        }
        return matrix;
    }  
  },
  watch:{
      value: function(newVal,oldVal){
          if(newVal !== undefined){
            this.day = newVal.getUTCDate()
            this.month = newVal.getUTCMonth()
            this.year = newVal.getUTCFullYear()
          }
          this.$emit('input',this.value)
      }
  },
  methods:{
    isDayOfThisMonth: function (day) {
        let month = day.getUTCMonth();
        return month === this.month ? true : false
    },
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    },
    selectDate: function (date){
        this.value = date;
        this.$emit('input', this.value)
    },
    isSelected: function (date){
        if(this.value === undefined || this.value === '' || this.value === null) return false
        if(this.value.getUTCDate() === date.getUTCDate() && 
        this.value.getUTCMonth() === date.getUTCMonth() &&
        this.value.getUTCFullYear() === date.getUTCFullYear())
            return true
        return false
    }
  }
};
</script>
