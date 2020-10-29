 
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
	document.getElementById('tableDiv').style.display = 'none'; 
});

let arr = [];
function addItem(index){
	
	var x = document.getElementById("snackbar");
	 x.innerHTML = `${jsonData.items[index].name} added to cart`;
	 x.className = "show";
	 setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	 
	document.getElementById('noItem').style.display = 'none';
	document.getElementById('tableDiv').style.display = 'block'; 
	
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
						  
						</div>
						<div class="col col-price col-numeric align-center ">
						  <button class="plus-btn" type="button" name="button" onclick="plus('${index}')">
							<img src="plus.svg" class="imgplus"/>
						  </button>
						  <input type="text" name="name" value="${data.quantity}" style="width:20px">
						  <button class="minus-btn" type="button" name="button" onclick="minus('${index}')">
							<img src="minus.svg" class="imgplus"/>
						  </button>
						</div>
						<div class="col col-price col-numeric align-center ">
						  <p>${data.price.display}</p>
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
	
	let tfSegment = `<hr/><div class="tf">
						<div class="row-table layout-inline">
						   <div >
							 <p>Total</p>
						   </div>
						   <div ></div>
						 </div>
						 <div class="row-table layout-inline">
						   <div >
							 Items(${totalItems})  :
						   </div>
						   <div ><i class="fa fa-inr" aria-hidden="true"></i>${total}</div>
						 </div>
						  <div class="row-table layout-inline">
							   <div>
								 Discount  :
							   </div>
								<div >-<i class="fa fa-inr" aria-hidden="true"></i>${discount}</div>
							</div>	
							<div class="row-table layout-inline">
										   <div>
											 Type Discount  :
										   </div>
											<div><i class="fa fa-inr" aria-hidden="true"></i>0</div>
										</div>							
						   <div class="row-table layout-inline orderTotal">
							   <div >
								 Order Total  :
							   </div>
								<div ><i class="fa fa-inr" aria-hidden="true"></i>${total - discount}</div>
						   
						 
						 </div></div>`;
	 	
		html += tfSegment;		
						 
	let container = document.querySelector('.tbl');
    container.innerHTML = html;
	
	let container1 = document.querySelector('.dropdown-content');
	
	let drop ='';
	drop = `<div class="closeDiv">
				<h1>Items</h1>
				<span class="close" onclick="hideDrop()">x</span></li>
	
			</div><hr/>`;
	drop += html;
    container1.innerHTML = drop;
	
	
	
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

function showDrop() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function hideDrop(){
	
	var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
}





   








