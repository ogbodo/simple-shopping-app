import Product from "../../models/product";

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';


export const fetchProductsAction = () => {
    return async (dispatch) => {
        //Here now we can perform any async task
        try {
            const response = await fetch('https://shopping-app-fc2b8.firebaseio.com/products.json');

            if (!response.ok) {
                // console.log(response);

                throw new Error('Something went wrong')
            }
            const responseData = await response.json();
            const loadedProducts = [];
            for (const key in responseData) {
                loadedProducts.push(new Product(key, 'u1', responseData[key].title,
                    responseData[key].imageUrl, responseData[key].description, responseData[key].price
                ))
            }

            dispatch({ type: FETCH_PRODUCT, products: loadedProducts });


        } catch (error) {
            //send error to our custom analytic server
            throw error;
        }

    };
}

export const createProductAction = (title, description, imageUrl, price) => {
    return async (dispatch) => {
        //Here now we can perform any async task
        try {
            const response = await fetch('https://shopping-app-fc2b8.firebaseio.com/products.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, imageUrl, price })
            });

            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const responseData = await response.json();

            dispatch({
                type: CREATE_PRODUCT,
                newProductData: { id: responseData.name, title, description, imageUrl, price }
            })
        } catch (error) {
            //send error to our custom analytic server
            throw error;
        }
    };
}

export const updateProductAction = (id, title, description, imageUrl) => {
    return async (dispatch) => {
        //Here now we can perform any async task
        await fetch(`https://shopping-app-fc2b8.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, imageUrl })
        });

        dispatch({
            type: UPDATE_PRODUCT,
            productId: id,
            updateProductData: { title, description, imageUrl }
        });

    };
}

export const removeProductAction = (productId) => {
    return async (dispatch) => {
        await fetch(`https://shopping-app-fc2b8.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE'
        })

        return dispatch({ type: REMOVE_PRODUCT, productId });
    }
}