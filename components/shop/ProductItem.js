import React from 'react'
import { View, StyleSheet, Text, Image, Button, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'
import Colors from '../../constants/Colors';


const ProductItem = (props) => {
    const TouchableComp = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;

    return <View style={styles.product}>
        <View style={styles.touchable}>
            <TouchableComp onPress={props.onViewDetail} >
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: props.imageUrl }} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        <Button color={Colors.primaryColor} title='View Details' onPress={props.onViewDetail} />
                        <Button color={Colors.primaryColor} title='Add To Cart' onPress={props.onAddToCart} />
                    </View>
                </View>
            </TouchableComp>
        </View>
    </View >
}

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: Colors.priceColor,
        fontFamily: 'open-sans'

    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    }

});

export default ProductItem;