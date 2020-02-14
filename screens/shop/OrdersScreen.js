import React from 'react'
import { FlatList, Text, View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orderReducer.orders);
    return <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <View>
            <Text>{itemData.item.totalAmount}</Text>
        </View>} />
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


export default OrdersScreen;