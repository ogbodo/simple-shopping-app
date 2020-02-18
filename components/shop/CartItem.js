import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform, TouchableNativeFeedback, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors';

const CartItem = (props) => {
    const TouchableComp = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;
    return <View style={styles.cartItem}>
        <View style={styles.itemData}>
            <Text style={styles.quantity}>{props.quantity}</Text>
            <Text style={styles.mainText}>{props.title}</Text>
            {/* <View style={{ width: "60%", alignItems: 'center' }}><Text style={styles.mainText}>{props.title}</Text></View> */}
        </View>
        <View style={styles.itemData}>
            <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
            {props.deleteAble && <TouchableComp onPress={props.onRemove} style={styles.deleteButton}>
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    size={23}
                    color='red' />
            </TouchableComp>}
        </View>
    </View>
}

const styles = StyleSheet.create({
    deleteButton: {
        marginLeft: 20
    },
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 12
    },
    quantity: {
        fontFamily: 'open-sans',
        color: Colors.priceColor,
        fontSize: 16,
        paddingRight: 5
    }
});

export default CartItem;

