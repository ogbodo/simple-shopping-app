import React, { useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Text, Platform, ScrollView, TextInput, Alert } from 'react-native'
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import { createProductAction, updateProductAction } from "../../store/actions/product-action";
import showToast from "../../components/UI/toast";
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
    }, [productId, dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({ submitHandler })
    }, [submitHandler])

    const inputChangeHandler = (input, inputText) => {
        let isValid = false;
        if (inputText.trim().length > 0) {
            if (input === 'price' && isNaN(inputText)) {
                isValid = false
            } else {
                isValid = true;
            }
        }
        dispatchFormState({ type: FORM_INPUT_UPDATE, value: inputText, isValid, input });
    }
    const BottomError = ({ input, inputLabel }) => {
        return <View>
            {!formState.inputValidities[input] && <View><Text>{`Please enter a valid product ${inputLabel}!`}</Text></View>}
        </View>
    }
    return <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={formState.inputValues.title} onChangeText={inputChangeHandler.bind(this, 'title')}
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    autoCorrect />
                <BottomError input='title' inputLabel='title' />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Image Url</Text>
                <TextInput style={styles.input} value={formState.inputValues.imageUrl} onChangeText={inputChangeHandler.bind(this, 'imageUrl')}
                    returnKeyType='next' />
                <BottomError input='imageUrl' inputLabel='image url' />
            </View>
            {!productId && <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput keyboardType='decimal-pad' style={styles.input} value={formState.inputValues.price} onChangeText={inputChangeHandler.bind(this, 'price')}
                    returnKeyType='next'
                />
                <BottomError input='price' inputLabel='price' />
            </View>}
            <View style={styles.formControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} value={formState.inputValues.description} onChangeText={inputChangeHandler.bind(this, 'description')}
                    autoCapitalize='sentences'
                    autoCorrect
                    multiline
                />
                <BottomError input='description' inputLabel='description' />
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