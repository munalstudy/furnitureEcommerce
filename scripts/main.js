let carts = document.querySelectorAll('.buy-btn');
let setFromDelete = false;
let setFromlowQ = false;

let products = [
    {
        name: 'Green Shirt',
        tag: 'grs',
        price: 20,
        inCart: 0
    },
    {
        name: 'Red Hoodie',
        tag: 'rh',
        price: 38,
        inCart: 0
    },
    {
        name: 'Blue Jumper',
        tag: 'bj',
        price: 45,
        inCart: 0
    },
    {
        name: 'Aqua Tshirt',
        tag: 'at',
        price: 10,
        inCart: 0
    },
    {
        name: 'Orange Top',
        tag: 'd5',
        price: 70,
        inCart: 0
    },
    {
        name: 'Blue Top',
        tag: 'd6',
        price: 80,
        inCart: 0
    },
    {
        name: 'Pink Top',
        tag: 'd7',
        price: 30,
        inCart: 0
    },
    {
        name: 'Pink Top',
        tag: 'd7',
        price: 30,
        inCart: 0
    },
    {
        name: 'Blue Trans',
        tag: 'btr',
        price: 30,
        inCart: 0
    }, 
    {
        name: 'Threaded Top',
        tag: 'thr',
        price: 30,
        inCart: 0
    },
    {
        name: 'Red Trans',
        tag: 'rtr',
        price: 30,
        inCart: 0
    },
    {
        name: 'Green Trans',
        tag: 'gtr',
        price: 30,
        inCart: 0
    },
    {
        name: 'Green Tank',
        tag: 'grl',
        price: 30,
        inCart: 0
    },
    {
        name: 'Jean Full',
        tag: 'jf',
        price: 30,
        inCart: 0
    },
    {
        name: 'Jean Bottom',
        tag: 'jb',
        price: 30,
        inCart: 0
    },
    {
        name: 'Green Flora',
        tag: 'fla',
        price: 30,
        inCart: 0
    }
];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
};


function updateQuantity(){
    var span = document.getElementById("cartVal");
    span.textContent = "X";
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.nav-item span').textContent = productNumbers;
    }
}

function checkCart(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    //console.log(productNumbers);
    if(productNumbers){

    }
    else{
        let ele = document.getElementById('addhere');
        ele.innerHTML += '<h5 style="color:#343A40">Your Cart is Empty</h5>';
        ele.innerHTML += '<h4><a href="shop.html" style="color:coral">Add Items</a></h4>';
        let elem = document.getElementById('addherere');
        elem.innerHTML = ''
    }
}

function cartNumbers(product){
    if(setFromlowQ || setFromDelete){
        let productNumbers = localStorage.getItem('cartNumbers');

        productNumbers = parseInt(productNumbers);

        if(productNumbers){
            localStorage.setItem('cartNumbers', productNumbers + product.inCart);
            document.querySelector('.nav-item span').textContent = productNumbers + product.inCart;
        }else{
            localStorage.setItem('cartNumbers',product.inCart);
            document.querySelector('.nav-item span').textContent = product.inCart;
        }
    }
    else{
        //console.log("The product is ", product);
        let productNumbers = localStorage.getItem('cartNumbers');

        productNumbers = parseInt(productNumbers);

        if(productNumbers){
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.nav-item span').textContent = productNumbers + 1;
        }else{
            localStorage.setItem('cartNumbers',1);
            document.querySelector('.nav-item span').textContent = 1;
        }

        setItems(product);
    }
}

function highQ(product){
    setFromlowQ = true;
    //console.log("here");  
    nameThis = "";    
    for (var i = 0; i < product.childNodes.length; i++) {
        if(product.childNodes[i].className == "nameHere"){
          
            //console.log(product.childNodes[i].textContent);
            nameThis = product.childNodes[i].textContent;
        }
    }        
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    count = Object.keys(cartItems).length;
    for(var x=0; x < count; x++){
        if(Object.values(cartItems)[x].name == nameThis){
            //console.log(Object.values(cartItems)[x]);
            Object.values(cartItems)[x].inCart = Object.values(cartItems)[x].inCart + 1;
            //console.log(Object.values(cartItems)[x]);
        }
        allClear();
        for(var i=0; i<count; i++){
            cartNumbers(Object.values(cartItems)[i]);
            setItems(Object.values(cartItems)[i]);
            totalCost(Object.values(cartItems)[i]);
        }
    }
    setFromlowQ = false;
}

function lowQ(product){
    let currVal = 0;
    setFromlowQ = true;
    //console.log("here");  
    nameThis = "";    
    for (var i = 0; i < product.childNodes.length; i++) {
        if(product.childNodes[i].className == "nameHere"){
          
            //console.log(product.childNodes[i].textContent);
            nameThis = product.childNodes[i].textContent;
        }
    }        
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    count = Object.keys(cartItems).length;

    Object.values(cartItems).map(e=>{
        if(e.name == nameThis){
            currVal = e.inCart;
        }
    })

    //console.log(currVal);
    if(currVal<=1){}
    else{
    for(var x=0; x < count; x++){
        if(Object.values(cartItems)[x].name == nameThis){
            //console.log(Object.values(cartItems)[x]);
            if(Object.values(cartItems)[x].inCart==1){
                return
            }
            Object.values(cartItems)[x].inCart = Object.values(cartItems)[x].inCart -1;
            //console.log(Object.values(cartItems)[x]);
        }
        allClear();
        for(var i=0; i<count; i++){
            cartNumbers(Object.values(cartItems)[i]);
            setItems(Object.values(cartItems)[i]);
            totalCost(Object.values(cartItems)[i]);
        }
    }
    }
    setFromlowQ = false;
}


function deleteItem(product){
    let distag = ""
    setFromDelete = true;
    deleteThis = "";
    console.log(product);
    for (var i = 0; i < product.childNodes.length; i++) {
        //console.log(product.childNodes);
        if(product.childNodes[i].className == "nameHere"){
          
            console.log(product.childNodes[i]);
            deleteThis = product.childNodes[i].textContent;
        }
    }        
    //console.log(deleteThis);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    Object.values(cartItems).map(e=>{
        if(e.name == deleteThis){
            distag = e.tag;
        }
    })

    console.log(distag)
    delete cartItems[distag];
    console.log(cartItems);
    //console.log(Object.keys(cartItems).length);
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
    localStorage.setItem('cartNumbers', parseInt(Object.keys(cartItems).length));

    location.reload();
 
}


function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag]==undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        if(!setFromDelete && !setFromlowQ){
            cartItems[product.tag].inCart += 1;
        }
    }else{
        if(!setFromlowQ){ 
        product.inCart = 1;
        }
        cartItems={
            [product.tag]:product
        };
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}


function totalCost(product){
    let cartCost =  localStorage.getItem('totalCost');

    if(cartCost != null){
        if(setFromlowQ){
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalCost', cartCost + (product.price * product.inCart));
        }else{
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
        }
    }else{
        localStorage.setItem("totalCost",product.price * product.inCart);
    }
    //console.log("my cartcost", cartCost);
}

function setCheckout(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers > 0){
    let cartCost =  localStorage.getItem('totalCost');
    document.getElementById('final').innerHTML = '$' + cartCost;
    document.getElementById('check-amt').innerHTML =  '$' + Number((parseInt(cartCost) + 2.99).toFixed(2));
    document.getElementById('finalT').innerHTML = '$' +Number((parseInt(cartCost) + 2.99).toFixed(2));
    }
}

function successfulCheckout(){
    localStorage.clear();
    window.localStorage.clear();
    alert('Thank you for buying with RuAin Furniture!');
    var users = JSON.parse(localStorage.getItem('users')) || [];
    debugger;
    generateInvoice(users.name, document.getElementById('checkout_Email'))
    // window.location.href='index.html';
}


function allClear(){
    localStorage.clear();
    window.localStorage.clear();
    location.reload();

}

function displayCart(){

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);


    if(productNumbers){
        let totalll =0;
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        //console.log(cartItems)
    
        let productContainer = document.querySelector(".products");
        Object.values(cartItems).map(item => {
            totalll += (item.price * item.inCart)
        })
        
        localStorage.setItem('totalCost', parseInt(totalll));

        let cartCost = localStorage.getItem('totalCost');


        if(cartItems && productContainer){
            productContainer.innerHTML = '';
            Object.values(cartItems).map(item =>{
                productContainer.innerHTML += `
                <div class="product">
                    <i class="fas fa-window-close" onClick="deleteItem(this.parentElement)"></i>
                    <img class="w-25 h-100 m-2" src="../images/product/${item.image}.jpg">
                    <span class="nameHere">${item.name}</span>
                

                <div class="price">
                    $${item.price}
                </div>

                <div class="quantity">
                    <i class="fas fa-chevron-circle-left" onClick="lowQ(this.parentElement.parentElement)"></i>
                    <span class="cartVal">${item.inCart}</span>
                    <i class="fas fa-chevron-circle-right" onClick="highQ(this.parentElement.parentElement)"></i>
                </div>

                <div class="total">
                    $${item.inCart * item.price}.00
                </div>

                </div>
                `
            });
            if(productNumbers !=0){
            productContainer.innerHTML += `
                <div class="basketTotalContainer">
                    <h4 class="basketTotalTitle">
                        Basket Total:
                    </h4>
                    <h4 class="basketTotal">
                        $${cartCost}.00
                    </h4>
                </div>
            `;
            
            productContainer.innerHTML += `
            <div class="AC">
                <button type="submit" onclick="allClear()">Clear</button>
            </div>
            `
            }
        }
    }   
}

function generateInvoice(name, email) {
    debugger;
    // Retrieve cart items and total cost from localStorage
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || [];
    let totalCost = localStorage.getItem('totalCost') || 0;

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title and customer details
    doc.setFontSize(20);
    doc.text('Invoice', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 10, 40);
    doc.text(`Email: ${email}`, 10, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 60);

    // Add a line break
    doc.text('-------------------------------------------------------------------', 10, 70);

    // Table header
    doc.setFontSize(14);
    doc.text('Product', 10, 80);
    doc.text('Quantity', 80, 80);
    doc.text('Price', 120, 80);
    doc.text('Total', 160, 80);

    // Add a line break
    doc.setFontSize(12);
    doc.text('-------------------------------------------------------------------', 10, 90);

    // Table rows for each product
    let yPosition = 100;
    cartItems.forEach(item => {
        doc.text(item.name, 10, yPosition);
        doc.text(String(item.inCart), 80, yPosition);
        doc.text(`$${item.price}`, 120, yPosition);
        doc.text(`$${(item.price * item.inCart).toFixed(2)}`, 160, yPosition);
        yPosition += 10;
    });

    // Add a line break
    doc.text('-------------------------------------------------------------------', 10, yPosition);
    yPosition += 10;

    // Total amount
    doc.setFontSize(14);
    doc.text('Total:', 120, yPosition);
    doc.text(`$${parseFloat(totalCost).toFixed(2)}`, 160, yPosition);

    // Save the PDF
    doc.save('invoice.pdf');
}

onLoadCartNumbers();
displayCart();
checkCart();
setCheckout();