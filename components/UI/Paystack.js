import PaystackWebView from 'react-native-paystack-webView'
import React from 'react'
import { View } from 'react-native'
import Colors from '../../constants/Colors';

const PayWithPaystack = (props) => {

    return (
        <View>
            <PaystackWebView
                buttonText='Complete Your Order'
                paystackKey='pk_test_b6ff1e69b9f6983bfa479e67bff6f3f7cad03c94'
                amount={props.amount}
                billingEmail={props.email}
                billingMobile={props.phone}
                billingName={props.userName}
                ActivityIndicatorColor={Colors.primaryColor}
                onSuccess={props.onOrderSucceeded}
                onCancel={props.onCancelOrder}
            />
        </View>
    )

}


export default PayWithPaystack;