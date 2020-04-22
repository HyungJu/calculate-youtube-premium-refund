var app = new Vue({
    el: '#app',
    data: {
        timestamp: null,
        isEarly: false,
        amount: null,
        earlyUserDaily: 17,
        normalUserDaily: 24,
        isRefundable: false
    },
    computed: {
        finalAmount: function(){
            let final = 0
            if( this.timestamp == null || this.amount == null)
                return false

            let translatedTimestamp = this.timestamp.replace("오전", "AM");
            translatedTimestamp = translatedTimestamp.replace("오후", "PM");

            const date = moment(translatedTimestamp+" +09:00", "YYYY. MM. DD A hh:mm:ss Z").add(3, 'days');
            const refundBase = moment("2020. 3. 6 AM 00:00:00 +09:00", "YYYY. MM. DD A hh:mm:ss Z")

            if(date.isValid() === false)
                return false

            if(this.isEarly){
                const isDurationOverSix =  refundBase.diff(date, 'months', true) > 6
                if(isDurationOverSix){
                    const sixthAmount = this.earlyUserDaily * 30 * 6
                    const restAmount = Math.ceil(refundBase.diff(date.add(6, 'months'), 'days', true) * this.normalUserDaily)

                    final =  sixthAmount + restAmount
                }else {
                    final =  Math.ceil(this.refundBase.diff(date, 'days', true) * this.earlyUserDaily)
                }
            }else{
                final =  Math.ceil(refundBase.diff(date, 'days', true) * this.normalUserDaily)
            }

            if(final-this.amount < 0){
                this.isRefundable = true
                return -(final-this.amount)
            }else{
                this.isRefundable = false
                return (final-this.amount)
            }

        },
        smsMessage: function(){
            
        }
    }
})
