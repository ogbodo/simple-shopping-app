const extractCartItems = (cartItem) => {
    const transformedCartItems = [];
    for (const key in cartItem) {
        transformedCartItems.push({
            id: key,
            productTitle: cartItem[key].productTitle,
            productPrice: cartItem[key].productPrice,
            quantity: cartItem[key].quantity,
            sum: cartItem[key].sum
        })
    }
    return transformedCartItems.sort((a, b) => a.key > b.key ? 1 : -1);

}

export default extractCartItems