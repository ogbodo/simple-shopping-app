import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, ScrollView, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../store/actions/cart-action';
import { addOrderAction } from '../../store/actions/order-action';
import extractCartItems from './utils';
import showToast from '../../components/UI/toast';
import Card from '../../components/UI/Card';

const CartScreen = () => {
    const totalAmount = useSelector(state => state.cartReducer.totalAmount);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => extractCartItems(state.cartReducer.items));
    const [wasAdded, setWasAdded] = useState(false)
    useEffect(() => {
        if (wasAdded) {
            showToast()
        }
    }, [wasAdded])

    const onOrderSucceeded = () => {

    }
    const onCancelOrder = () => {

    }
    const onPlaceOrder = () => {
        dispatch(addOrderAction(cartItems, totalAmount))
        setWasAdded(prevState => !prevState)
    }
    return (<View style={styles.screen}>
        <Card style={styles.summary}>
            <Text style={styles.summaryText}>
                Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
            </Text>
            <Button title='Order Now' color={Colors.accentColor} disabled={cartItems.length === 0} onPress={onPlaceOrder} />
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
    </View>)
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