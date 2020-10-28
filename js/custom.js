
async function getData() {
    let url = 'https://priya11seth.github.io/cart.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function renderUsers() {
    let jsonData = await getData();
	console.log(jsonData);
    let html = '';
    jsonData.items.forEach(data => {
        let htmlSegment = `<li class="cards_item">
							  <div class="card">
								<div class="card_image"><img src="${data.image}"></div>
								<div class="card_content">
								 <p class="card_text">${data.name}</p>
								 <div class="btn-div"> 
									<h2 class="card_title">${data.price.actual}</h2>
									<button class="btn card_btn">Add to Cart</button>
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








