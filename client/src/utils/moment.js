import moment from 'moment'

export default class FormatDate{
    static dateTime(date){
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }

    static date(date){
        return moment(date).format('MMMM Do YYYY')
    }
}