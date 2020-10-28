
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
        let htmlSegment = `<div class="user">
                            <img src="${data.image}" >
                            <h2>${data.name}</h2>
                            
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}
$(document).ready(function(){
	renderUsers();
});








