import React, { useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Platform, ScrollView, Alert, KeyboardAvoidingView } from 'react-native'
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import { createProductAction, updateProductAction } from "../../store/actions/product-action";
import showToast from "../../components/UI/toast";
import Input from "../../components/UI/Input";
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedInputValues = {
                ...state.inputValues,
                [action.input]: action.value
            }
            const updatedInputValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            }
            let updatedFormIsValid = true;
            for (const key in updatedInputValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
            }
            return {
                inputValues: updatedInputValues,
                inputValidities: updatedInputValidities,
                formIsValid: updatedFormIsValid
            }
        default:
            return state;
    }
}

const EditProductScreen = (props) => {
    const dispatch = useDispatch();
    const productId = props.navigation.getParam('productId');

    const foundProduct = useSelector(state => state.productReducer.userProducts.find(product => product.id === productId));
    const initialState = {
        inputValues: {
            title: foundProduct ? foundProduct.title : '',
            imageUrl: foundProduct ? foundProduct.imageUrl : '',
            description: foundProduct ? foundProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: foundProduct ? true : false,
            imageUrl: foundProduct ? true : false,
            description: foundProduct ? true : false,
            price: foundProduct ? true : false,
        },
        formIsValid: foundProduct ? true : false
    }
    const [formState, dispatchFormState] = useReducer(formReducer, initialState)
    //We use useCallback in prevent this callback function from executing each time the component re-renders
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check your errors in the form.', [{
                text: 'Ok'
            }]);
            return
        }
        const { title, imageUrl, description, price } = formState.inputValues
        if (productId) {
            //we are editing
            dispatch(updateProductAction(foundProduct.id, title, description, imageUrl))
            props.navigation.goBack()
        } else {
            //we are adding 
            dispatch(createProductAction(title, description, imageUrl, +price));
        }
        showToast();
        props.navigation.goBack()
    }, [productId, dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({ submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback((input, inputText, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputText,
            isValid: inputValidity,
            input
        });
    }, [dispatchFormState]);


    return <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset='100'>
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id='title'
                    label='Title'
                    errorText='Please enter a valid product title!'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    autoCorrect
                    onInputChange={inputChangeHandler}
                    initialValue={productId ? foundProduct.title : ''}
                    initiallyValid={productId ? true : false}
                    required
                    onEndEditing={() => {

                    }}
                    onSubmitEditing={() => {

                    }}

                />
                <Input
                    id='imageUrl'
                    label='Image Url'
                    errorText='Please enter a valid product image url!'
                    returnKeyType='next'
                    required
                    onInputChange={inputChangeHandler}
                    initialValue={productId ? foundProduct.imageUrl : ''}
                    initiallyValid={productId ? true : false}
                    onEndEditing={() => {

                    }}
                    onSubmitEditing={() => {

                    }}

                />
                {!productId && (
                    <Input
                        id='price'
                        label='Price'
                        required
                        errorText='Please enter a valid product price!'
                        returnKeyType='next'
                        keyboardType='decimal-pad'
                        onInputChange={inputChangeHandler}
                        min={0.9}
                        isNumeric
                    />
                )}
                <Input
                    id='description'
                    label='Description'
                    errorText='Please enter a valid product description!'
                    returnKeyType='next'
                    multiline
                    required
                    minLength={5}
                    autoCorrect
                    autoCapitalize='sentences'
                    onInputChange={inputChangeHandler}
                    initialValue={productId ? foundProduct.description : ''}
                    initiallyValid={productId ? true : false}
                    onEndEditing={() => {

                    }}
                    onSubmitEditing={() => {

                    }}

                />
            </View>
        </ScrollView >
    </KeyboardAvoidingView>
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
    }

});

export default EditProductScreen;