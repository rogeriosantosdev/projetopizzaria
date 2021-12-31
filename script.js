const dQuery = (el) => document.querySelector(el);
const dAll = (el) =>document.querySelectorAll(el);

pizzaJson.map((item, index)=>{
    let pizzaItem = dQuery('.models .pizza-item').cloneNode(true);
    //Preencher as informações em pizzaItem

    dQuery('.pizza-area').append(pizzaItem);
});