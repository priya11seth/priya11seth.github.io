 
async function getData() {
    let url = 'https://priya11seth.github.io/cart.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let jsonData;
async function renderUsers() {
    jsonData = await getData();
	console.log(jsonData);
    let html = '';
    jsonData.items.forEach((data,index) => {
		let per = Math.floor((data.price.display-data.price.actual)*100/data.price.display);
        let htmlSegment = `<li class="cards_item">
							  <div class="card">
								<div class="discount">${per}% off</div>
								<div class="card_image"><img src="${data.image}"></div>
								<div class="card_content">
								 <p class="card_text">${data.name}</p>
								 <div class="btn-div"> 
									<h2 class="card_title"><i class="fa fa-inr" aria-hidden="true"></i>${data.price.actual}<br><span class="display-price"><i class="fa fa-inr" aria-hidden="true"></i>${data.price.display}</span></h2>
									<button class="btn card_btn" onclick="addItem('${index}')">Add to Cart</button>
								 </div>
								  
								</div>
							  </div>
							</li>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.cards');
    container.innerHTML = html;
}
$(document).ready(function(){
	renderUsers();
});

let arr = [];
function addItem(index){
	
	document.getElementById("msgdiv").innerHTML = `<span class="msgSpan">${jsonData.items[index].name} added to cart</span>`;
	console.log("hello",jsonData.items[index]);
	jsonData.items[index]['quantity'] = 1;
	arr.push(jsonData.items[index]);
	createElementByArr();
	
}

function createElementByArr(){
	
	let html = '';
	arr.forEach((data,index) => {
		
        let htmlSegment = `<div class="layout-inline row-table">
        
						<div class="col col-pro layout-inline">
						  <img src="${data.image}" alt="kitten" />
						  <p>${data.name}</p>
						</div>
						
						<div class="col col-price col-numeric align-center ">
						  <p>${data.price.display}</p>
						</div>

						<div class="quantity">
						  <button class="plus-btn" type="button" name="button" onclick="plus('${index}')">
							
						  </button>
						  <input type="text" name="name" value="${data.quantity}">
						  <button class="minus-btn" type="button" name="button" onclick="minus('${index}')">
							
						  </button>
						</div>
        			</div>`;

        html += htmlSegment;
    });
	
	var total = 0;
	var discount = 0;
	var totalItems = 0;
	arr.forEach(data=>{
		total += ( data.price.display * data.quantity );
		discount += ( data.discount * data.quantity );
		totalItems += data.quantity ;
	})
	
	let tfSegment = `<div class="tf">
						<div class="row-table layout-inline">
						   <div class="col">
							 <p>Total</p>
						   </div>
						   <div class="col"></div>
						 </div>
						 <div class="row-table layout-inline">
						   <div class="col">
							 <p>Items(${totalItems}):</p>
						   </div>
						   <div class="col">${total}</div>
						 </div>
						  <div class="row-table layout-inline">
							   <div class="col">
								 <p>Discount:</p>
							   </div>
								<div class="col">-${discount}</div>
						</div>		
						   <div class="row-table layout-inline orderTotal">
							   <div class="col">
								 <p>Order Total:</p>
							   </div>
								<div class="col">${total - discount}</div>
						   
						 
						 </div></div>`;
	 	
		html += tfSegment;		
						 
	let container = document.querySelector('.tbl');
    container.innerHTML = html;
	
	
	
}

function minus(index) {
    //e.preventDefault();
   
	console.log()
	if(arr[index].quantity <= 1){
		arr[index].quantity =  1;
	}
	else{
		arr[index].quantity -=  1;
	}
    
	//arr = [];
	createElementByArr();
	
    
 
 
};
 
function plus(index) {
	
    arr[index].quantity +=  1;
	//arr = [];
	createElementByArr();
	
};




   








