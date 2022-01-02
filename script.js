let cart = [];
let modalQt = 1;
let modalKey = 0;

const dQuery = (el) => document.querySelector(el);
const dAll = (el) =>document.querySelectorAll(el);

//LISTAGEM DAS PIZZAS

pizzaJson.map((item, index)=>{
    let pizzaItem = dQuery('.models .pizza-item').cloneNode(true);
    //Preencher as informações em pizzaItem
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        let key = event.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        dQuery('.pizzaBig img').src = pizzaJson[key].img;
        dQuery('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        dQuery('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        dQuery('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
        dQuery('.pizzaInfo--size.selected').classList.remove('selected');
        dAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex == 2){
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]

        });

        dQuery('.pizzaInfo--qt').innerHTML = modalQt;

        dQuery('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=>{
            dQuery('.pizzaWindowArea').style.opacity = 1;
        },200);

        dQuery('.pizzaWindowArea').style.display = 'flex';
    })

    dQuery('.pizza-area').append(pizzaItem);
});


// EVENTOS DO MODAL
function closeModal(){
    dQuery('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        dQuery('.pizzaWindowArea').style.display = 'none';
    },200);
}

dAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
})

dQuery('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        dQuery('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

dQuery('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    dQuery('.pizzaInfo--qt').innerHTML = modalQt;
});

dAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (event)=>{
        dQuery('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

//Adicionando ao carrinho

dQuery('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //Qual a pizza, tamanho e quantas pizzas serão adicionadas.
    let size = parseInt(dQuery('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id+ '@' +size;

    let key = cart.findIndex((item)=> item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

    updateCart();
    closeModal();
});

dQuery('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        dQuery('aside').style.left = '0';
    }
});

dQuery('.menu-closer').addEventListener('click', ()=>{
    dQuery('aside').style.left = '100vw';
});


function updateCart(){
    dQuery('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        dQuery('aside').classList.add('show');
        dQuery('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id
            );
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = dQuery('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0: 
                    pizzaSizeName = 'P';
                    break;

                case 1:
                    pizzaSizeName = 'M';
                    break;

                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () =>{
                cart[i].qt++;
                updateCart();
            });

            dQuery('.cart').append(cartItem);
            
            desconto = subtotal * 0.1;
            total = subtotal - desconto;

            dQuery('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
            dQuery('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
            dQuery('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

        }
    } else {
        dQuery('aside').classList.remove('show');
        dQuery('aside').style.left = '100vw';
    }
}