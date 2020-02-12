import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductOverviewScreen = (props) => {

    const availableProducts = useSelector(state => state.productReducer.availableProducts);
    const onViewDetails = (itemData) => {
        props.navigation.navigate('productDetail',
            { productId: itemData.item.id, productTitle: itemData.item.title })
    }
    return <FlatList data={availableProducts} renderItem={(itemData) => <ProductItem
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={onViewDetails.bind(this, itemData)}
        onAddToCart={() => { }}
    />} />;
}

ProductOverviewScreen.navigationOptions = {
    headerTitle: ' All Products'
}
const styles = StyleSheet.create({

});

export default ProductOverviewScreen;