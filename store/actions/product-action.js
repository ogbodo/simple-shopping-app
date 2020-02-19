import Product from "../../models/product";

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';


export const fetchProductsAction = () => {
    return async (dispatch) => {
        //Here now we can perform any async task
        const response = await fetch('https://shopping-app-fc2b8.firebaseio.com/productsd.json');
        const responseData = await response.json();
        const loadedProducts = [];
        for (const key in responseData) {
            loadedProducts.push(new Product(key, 'u1', responseData[key].title,
                responseData[key].imageUrl, responseData[key].description, responseData[key].price
            ))
        }

        dispatch({ type: FETCH_PRODUCT, products: loadedProducts });



    };
}

export const createProductAction = (title, description, imageUrl, price) => {
    return async (dispatch) => {
        //Here now we can perform any async task
        const response = await fetch('https://shopping-app-fc2b8.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, imageUrl, price })
        });

        const responseData = await response.json();
        console.log(responseData);

        dispatch({
            type: CREATE_PRODUCT,
            newProductData: { id: responseData.name, title, description, imageUrl, price }
        })
    };
}

export const updateProductAction = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        productId: id,
        updateProductData: { title, description, imageUrl }
    };
}

export const removeProductAction = (productId) => {
    return { type: REMOVE_PRODUCT, productId };
}