import React from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orderReducer.orders);

    return <View>{orders.length > 0 ? <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <View>
            <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.date}
                items={itemData.item.items}
            />
        </View>} /> :
        <View>
            <Text style={styles.emptyContainer}>You have no orders yet!</Text>
        </View>}
    </View>



}
OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        textAlign: 'center',
        fontFamily: 'open-sans',
        color: Colors.priceColor,
        alignContent: 'center',
        marginTop: '50%'
    }
})
export default OrdersScreen;