let modalQt = 1;

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