
const paystackMarkup = (data) => {
    // console.log("DATA", data);

    return {
        html: `  
      <!DOCTYPE html>
      <html lang="en">
              <head>
                      <meta charset="UTF-8">
                      <meta http-equiv="X-UA-Compatible" content="ie=edge">
                      <!-- Latest compiled and minified CSS -->
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
                      <!-- Fonts -->
                      <link rel="dns-prefetch" href="//fonts.gstatic.com">
                      <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
                      <title>SUBSCRIPTION</title>
              </head>
              <body  onload="payWithPaystack()" style="background-color:#fff;height:100vh ">
                      <script src="https://js.paystack.co/v1/inline.js"></script>
                      <script type="text/javascript">
                              window.onload = payWithPaystack;
                              function payWithPaystack(){
                              var handler = PaystackPop.setup({ 
                                key: '${data.PAYSTACK_KEY}',
                                email: '${data.email}',
                                amount: ${data.totalAmount}00,
                                currency: "NGN",
                                ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                                metadata: {
                                custom_fields: [
                                        {
                                        display_name:  '${data.email}',
                                        variable_name:  '${data.userName}',
                                        value:''
                                        }
                                ]
                                },
                                callback: function(response){
                                      var resp = {event:'successful', transactionRef:response.reference};
                                      postMessage(JSON.stringify(resp))
                                },
                                onClose: function(){
                                   var resp = {event:'cancelled'};
                                   postMessage(JSON.stringify(resp))
                                }
                                });
                                handler.openIframe();
                                }
                      </script> 
              </body>
      </html> 
      `}
}


export default paystackMarkup;
