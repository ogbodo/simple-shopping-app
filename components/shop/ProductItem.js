import React from 'react'
import { View, StyleSheet, Text, Image, Button, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'
import Colors from '../../constants/Colors';
import Card from '../UI/Card';


const ProductItem = (props) => {
    const TouchableComp = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;

    return <Card style={styles.product}>
        <View style={styles.touchable}>
            <TouchableComp onPress={props.onSelect} >
                <View testID={props.id}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: props.imageUrl }} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableComp>
        </View>
    </Card >
}

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    product: {
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
        height: '23%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    }

});

export default ProductItem;