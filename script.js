const dQuery = (el) => document.querySelector(el);
const dAll = (el) =>document.querySelectorAll(el);

pizzaJson.map((item, index)=>{
    let pizzaItem = dQuery('.models .pizza-item').cloneNode(true);
    //Preencher as informações em pizzaItem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        dQuery('.pizzaWindowArea').style.opacity = 0;

        setTimeout(()=>{
            dQuery('.pizzaWindowArea').style.opacity = 1;
        },200)

        dQuery('.pizzaWindowArea').style.display = 'flex';
    })

    dQuery('.pizza-area').append(pizzaItem);
});