import React, { useState } from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import Colors from '../../constants/Colors';
import Moment from 'moment'
import CartItem from './CartItem';
import { removeFromCart } from '../../store/actions/cart-action';
import { useDispatch } from 'react-redux'
import Card from '../UI/Card';
const OrderItem = (props) => {

    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();
    Moment.locale('en')
    const formatedDate = Moment(props.date).format("MMM Do YY, h:mm");
    return <Card style={styles.orderItem}>
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{formatedDate}</Text>
        </View>
        <Button color={Colors.primaryColor} title={showDetails ? 'Hide Details' : 'Show Details'} onPress={() => {
            setShowDetails(prevState => !prevState);
        }} />
        {showDetails &&
            <View style={styles.detailItems}>
                {props.items.map((cartItem) => {
                    return <CartItem
                        quantity={cartItem.quantity}
                        title={cartItem.productTitle}
                        key={cartItem.id}
                        amount={cartItem.sum}
                        onRemove={() => {
                            dispatch(removeFromCart(cartItem.id));
                        }} />
                })}
            </View>}
    </Card>
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: Colors.priceColor
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;

