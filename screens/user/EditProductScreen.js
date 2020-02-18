import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, FlatList, Text, Button, Platform, ScrollView, TextInput } from 'react-native'
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import { createProductAction, updateProductAction } from "../../store/actions/product-action";
import showToast from "../../components/UI/toast";

const EditProductScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const foundProduct = useSelector(state => state.productReducer.userProducts.find(product => product.id === productId));
    const [title, setTitle] = useState(foundProduct ? foundProduct.title : '')
    const [imageUrl, setImageUrl] = useState(foundProduct ? foundProduct.imageUrl : '')
    const [price, setPrice] = useState(foundProduct ? foundProduct.price : '')
    const [description, setDescription] = useState(foundProduct ? foundProduct.description : '')

    const dispatch = useDispatch();
    //We use useCallback in prevent this callback function from executing each time the component re-renders
    const submitHandler = useCallback(() => {
        if (productId) {
            //we are editing
            dispatch(updateProductAction(foundProduct.id, title, description, imageUrl))
            props.navigation.goBack()
        } else {
            //we are adding 
            dispatch(createProductAction(title, description, imageUrl, +price));
            //clear the fields
            setTitle('')
            setImageUrl('')
            setPrice('')
            setDescription('')
        }
        showToast();
    }, [productId, dispatch, title, description, imageUrl]);

    useEffect(() => {
        props.navigation.setParams({ submitHandler })
    }, [submitHandler])

    return <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={(input) => {
                    setTitle(input)
                }} />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Image Url</Text>
                <TextInput style={styles.input} value={imageUrl} onChangeText={(input) => {
                    setImageUrl(input)
                }} />
            </View>
            {!productId && <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput keyboardType='decimal-pad' style={styles.input} value={price.toString()} onChangeText={(input) => {
                    setPrice(input)
                }} />
            </View>}
            <View style={styles.formControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} value={description} onChangeText={(input) => {
                    setDescription(input)
                }} />
            </View>
        </View>
    </ScrollView>

}

EditProductScreen.navigationOptions = (navData) => {
    const submitHandler = navData.navigation.getParam('submitHandler');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submitHandler} buttonStyle={{ color: Platform.OS === 'android' ? 'white' : Colors.primaryColor }} />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: Colors.priceColor,
        borderBottomWidth: 1
    }

});

export default EditProductScreen;