<template>
    <table aria-labelledby="month" aria-multiselectable="true" class="slds-datepicker__month" role="grid">
        <thead>
            <tr id="weekdays">
            <th id="Sunday" scope="col">
                <abbr title="Sunday">{{daysOfWeekInitials[0]}}</abbr>
            </th>
            <th id="Monday" scope="col">
                <abbr title="Monday">{{daysOfWeekInitials[1]}}</abbr>
            </th>
            <th id="Tuesday" scope="col">
                <abbr title="Tuesday">{{daysOfWeekInitials[2]}}</abbr>
            </th>
            <th id="Wednesday" scope="col">
                <abbr title="Wednesday">{{daysOfWeekInitials[3]}}</abbr>
            </th>
            <th id="Thursday" scope="col">
                <abbr title="Thursday">{{daysOfWeekInitials[4]}}</abbr>
            </th>
            <th id="Friday" scope="col">
                <abbr title="Friday">{{daysOfWeekInitials[5]}}</abbr>
            </th>
            <th id="Saturday" scope="col">
                <abbr title="Saturday">{{daysOfWeekInitials[6]}}</abbr>
            </th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td aria-disabled="true" aria-selected="false" class="slds-disabled-text" role="gridcell">
                <span class="slds-day">31</span>
            </td>
            <td aria-selected="false" role="gridcell" tabindex="0">
                <span class="slds-day">1</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">2</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">3</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">4</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">5</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">6</span>
            </td>
            </tr>
            <tr>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">7</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">8</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">9</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">10</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">11</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">12</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">13</span>
            </td>
            </tr>
            <tr>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">14</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">15</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">16</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">17</span>
            </td>
            <td aria-selected="false" aria-current="date" class="slds-is-today" role="gridcell">
                <span class="slds-day">18</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">19</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">20</span>
            </td>
            </tr>
            <tr class="">
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">21</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">22</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">23</span>
            </td>
            <td aria-selected="false" class="" role="gridcell">
                <span class="slds-day">24</span>
            </td>
            <td aria-selected="false" class="" role="gridcell">
                <span class="slds-day">25</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">26</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">27</span>
            </td>
            </tr>
            <tr class="">
            <td aria-selected="false" class="" role="gridcell">
                <span class="slds-day">28</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">29</span>
            </td>
            <td aria-selected="false" role="gridcell">
                <span class="slds-day">30</span>
            </td>
            <td aria-disabled="true" aria-selected="false" class="slds-disabled-text" role="gridcell">
                <span class="slds-day">1</span>
            </td>
            <td aria-disabled="true" aria-selected="false" class="slds-disabled-text" role="gridcell">
                <span class="slds-day">2</span>
            </td>
            <td aria-disabled="true" aria-selected="false" class="slds-disabled-text" role="gridcell">
                <span class="slds-day">3</span>
            </td>
            <td aria-disabled="true" aria-selected="false" class="slds-disabled-text" role="gridcell">
                <span class="slds-day">4</span>
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
    }
  },
  data: function() {
    return {
      month: moment().month(),
      year: moment().year(),
      day: moment().day()
    };
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
    }
  }
};
</script>
