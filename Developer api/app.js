

const shop_list = document.querySelector('.shop_list');

fetch('http://localhost:5050/devs').then(data=> data.json()).then(data=>{

    let products = '';
    data.map(product=>{

        products += `
        <div class="col-md-3 my-3">
            <div class="card shadow p-itme">
                <a href="#" onclick="singleProductLoad(${product.id})" data-bs-toggle="modal" data-bs-target="#single_product"><img src=" ${product.photo} " alt=""></a>
                <div class="card-body">
                    <h2> ${product.name} </h2>
                    <p>salary: $${product.salary} </p>
                </div>
            </div>
        </div>
        `;
    });

    shop_list.innerHTML= products;

});

function singleProductLoad(id){

    const single_pro = document.querySelector('.product_single')

    single_pro.innerHTML = '';
    
    fetch('https://fakestoreapi.com/products/' + id).then(data => data.json()).then(data=> {

        single_pro.innerHTML = `

        <div class="row">
            <div class="col-md-6">
                <img class="w-100" src=" ${data.image} " alt="">
            </div>
            <div class="col-md-6">
                <h1>${data.title}</h1>
                <h2>proce : $${data.price}</h2>
                <p>${data.description}</p>
                <a class="btn btn-lg btn-primary" href="#"> Add to Card </a>
            </div>
        </div>

        `;
    });


};
