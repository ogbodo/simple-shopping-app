import React from 'react'
import { FlatList, StyleSheet, Platform, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { addToCart } from '../../store/actions/cart-action';


const ProductOverviewScreen = (props) => {
    const dispatch = useDispatch()

    const availableProducts = useSelector(state => state.productReducer.availableProducts);
    const onViewDetails = (itemData) => {
        props.navigation.navigate('ProductDetail',
            { productId: itemData.item.id, productTitle: itemData.item.title })
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
    return {
        headerTitle: ' All Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                navData.navigation.navigate('Cart')
            }} />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({

});

export default ProductOverviewScreen;