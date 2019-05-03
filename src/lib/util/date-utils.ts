import * as moment from 'moment';

const DAY_HOURS = 24;

export default class DateUtils{
  static getNow(){
    return moment.utc().toDate();
  }

  static isD1(dateString: string) {
    const d1 = moment.utc().add(1, 'days').format('YYYY-MM-DD');
    return dateString === d1;
  }

  static isLessThanADay(dateString: string) {
    return moment.utc(dateString).diff(moment(), 'hours') <= DAY_HOURS;
  }

  static isSameday(dateString: string) {
    const today = moment.utc().format('YYYY-MM-DD');
    const date = moment.utc(dateString).format('YYYY-MM-DD');
    return today === date;
  }

  static isDateBeforeToday(date: string){
    const today = moment.utc().startOf('day');
    const dateMoment = moment.utc(date);
    return dateMoment.isBefore(today);
  }

  static isDayAheadLimit(dateString: string, limit:number){
    const now = this.getNow();
    const date = moment.utc(dateString);
    return date.diff(now, 'days') >= limit;
  }

  static isAheadDay(outboundString:string , day: string){
    const outboundDate = moment.utc(outboundString);
    const dayDate = moment.utc(outboundString);
    return outboundDate.isAfter(dayDate);
  }

  static endDateBeforeStartDate(start: string, end: string){
    const startDate = moment.utc(start);
    const endDate = moment.utc(end);
    return endDate.isBefore(startDate);
  }
}
