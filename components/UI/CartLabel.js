import React from "react";
import Colors from '../../constants/Colors';
import { Platform, StyleSheet, View, Text } from 'react-native'

const CartLabel = (props) => {
    return <View style={styles.labelContainer}>
        <Text style={styles.label} {...props}>{props.cartItemCount}</Text>
    </View>
}
const styles = StyleSheet.create({
    labelContainer: {
        backgroundColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        marginRight: 20,
        marginLeft: - 16,
        height: '70%',
        alignSelf: 'baseline',
        borderRadius: 40

    },
    label: {
        color: Platform.OS === 'ios' ? 'white' : Colors.primaryColor,
        fontFamily: 'open-sans-bold'

    }
})
export default CartLabel;