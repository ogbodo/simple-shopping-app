import React, { useState, useEffect } from 'react'
import { FlatList, Platform, View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { addToCart } from '../../store/actions/cart-action';
import Colors from '../../constants/Colors';


const ProductOverviewScreen = (props) => {
    const dispatch = useDispatch();

    const availableProducts = useSelector(state => state.productReducer.availableProducts);
    const count = useSelector(state => {
        let counter = 0;
        for (const key in state.cartReducer.items) {
            counter += state.cartReducer.items[key].quantity;
        }
        return counter;
    });
    useEffect(() => {
        props.navigation.setParams({ cartItemCount: count })
    }, [count]);

    const onViewDetails = (itemData) => {
        props.navigation.navigate('ProductDetail',
            {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
                cartItemCount: count
            })
    }
    return <FlatList data={availableProducts} renderItem={(itemData) => <ProductItem
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={onViewDetails.bind(this, itemData)}
        onAddToCart={() => {
            dispatch(addToCart(itemData.item))
        }}
    />} />;
}

ProductOverviewScreen.navigationOptions = (navData) => {
    const cartItemCount = navData.navigation.getParam('cartItemCount')
    return {
        headerTitle: ' All Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>,
        headerRight: <View style={styles.headerLeft}>
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                    navData.navigation.navigate('Cart')
                }} />
            </HeaderButtons>
            <Text style={styles.label}>{cartItemCount}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    headerLeft: {
        flexDirection: 'row'
    },
    label: {
        color: Colors.accentColor,
        fontFamily: 'open-sans-bold',
        marginRight: 20,
        marginLeft: - 16,
        alignSelf: 'baseline'
    }
})

export default ProductOverviewScreen;