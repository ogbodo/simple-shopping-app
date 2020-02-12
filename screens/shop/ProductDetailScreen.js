
import React from 'react'
import { View, StyleSheet, Text, Image, ScrollView, Button } from 'react-native'
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux'

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const availableProducts = useSelector(state => state.productReducer.availableProducts);
    const selectedProduct = availableProducts.find(product => product.id === productId);

    return <ScrollView>
        <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
        <View style={styles.actions}>
            <Button color={Colors.primaryColor} title='Add to cart' onPress={() => { }} />
        </View>
        <Text style={styles.price} >${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
}

ProductDetailScreen.navigationOptions = (navData) => {
    const productTitle = navData.navigation.getParam('productTitle');

    return { headerTitle: productTitle }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: Colors.priceColor,
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
});


export default ProductDetailScreen;