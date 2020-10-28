

$(document).ready(function(){
	var url = "https://github.com/priya11seth/shopping-cart/blob/main/cart.json"
   fetch(url)
    .then(response => {
        // handle the response
		console.log(response);
    })
    .catch(error => {
        // handle the error
    });
});








