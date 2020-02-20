import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, ScrollView, Alert, Modal, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../store/actions/cart-action';
import { addOrderAction } from '../../store/actions/order-action';
import extractCartItems from './utils';
import showToast from '../../components/UI/toast';
import Card from '../../components/UI/Card';
import { WebView } from 'react-native-webview';
import paystackMarkup from '../../components/UI/Paystack';


const CartScreen = (props) => {
    const totalAmount = useSelector(state => state.cartReducer.totalAmount);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => extractCartItems(state.cartReducer.items));
    const [state, setState] = useState({ showModal: false, isLoading: true })
    const PAYSTACK_KEY = 'pk_test_b6ff1e69b9f6983bfa479e67bff6f3f7cad03c94'


    const [wasAdded, setWasAdded] = useState(false)
    useEffect(() => {
        if (wasAdded) {
            showToast()
        }
    }, [wasAdded])

    const paymentDetails = {
        totalAmount,
        email: 'matthiasogbodo@gmail.com',
        phone: '08136503501',
        userName: 'Izuking Ogbodo'
    }

    const messageReceived = (data) => {
        console.log("messageReceived", messageReceived);

        const webResponse = JSON.parse(data);
        switch (webResponse.event) {
            case 'cancelled':
                setState(prevState => { return { ...prevState, showModal: false } })
                console.log('TRANSACTION WAS CANCELLED!!!');
                break;

            case 'successful':
                setState(prevState => { return { ...prevState, showModal: false } })
                dispatch(addOrderAction(cartItems, totalAmount))
                setWasAdded(prevState => !prevState)
                console.log('SUCCESS REPORT: ', webResponse.transactionRef);
                break;

            default:
                setState(prevState => { return { ...prevState, showModal: false } })
                break;
        }
    }
    return (
        <View style={styles.screen}>
            <Modal
                visible={state.showModal}
                animationType="slide"
                transparent={false}>
                <WebView
                    javaScriptEnabled={true}
                    javaScriptEnabledAndroid={true}
                    originWhitelist={['*']}
                    ref={(webView) => MyWebView = webView}
                    source={paystackMarkup({ PAYSTACK_KEY, ...paymentDetails })}
                    onMessage={(e) => { messageReceived(e.nativeEvent.data) }}
                    onLoadStart={() => setState(prevState => { return { ...prevState, isLoading: true } })}
                    onLoadEnd={() => setState(prevState => { return { ...prevState, isLoading: false } })}
                />
                {/*Start of Loading modal*/}
                {
                    state.isLoading &&
                    <View>
                        <ActivityIndicator size="large" color={Colors.primaryColor} />
                    </View>
                }
            </Modal>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    title='Order Now'
                    color={Colors.accentColor}
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(addOrderAction(cartItems, totalAmount))
                        setWasAdded(prevState => !prevState)
                        // setState(prevState => { return { ...prevState, showModal: true } })
                    }} />
            </Card>
            {cartItems.length > 0 ?
                < ScrollView >
                    {
                        cartItems.map(cartItem => <CartItem
                            quantity={cartItem.quantity}
                            title={cartItem.productTitle}
                            key={cartItem.id}
                            amount={cartItem.sum}
                            deleteAble
                            onRemove={() => {
                                dispatch(removeFromCart(cartItem.id));
                            }} />)
                    }
                </ScrollView> :
                <View>
                    <Text style={styles.emptyContainer}>Your cart is empty!</Text>
                </View>}

            {/* <FlatList data={cartItems}
            keyExtractor={item => item.id}
            renderItem={(itemData) => {
                <CartItem
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.sum}
                onRemove={() => {
                    dispatch(() => removeFromCart(itemData.item.id));
                }} />
            }} /> */}
        </View>
    )
}


CartScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Cart'
    }
}
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primaryColor
    },
    emptyContainer: {
        textAlign: 'center',
        fontFamily: 'open-sans',
        color: Colors.priceColor
    }
})

export default CartScreen