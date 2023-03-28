var key = new URL(window.location.href).searchParams.get('key');
console.log(key);
var colors = [
    {
      "name": "kem",
      "rgb": "rgb(231, 211, 173)"
    },
    {
      "name": "beige",
      "rgb": "rgb(245, 245, 220)"
    },
    {
      "name": "pineneedle",
      "rgb": "rgb(69, 88, 81)"
    },
    {
      "name": "dark-olive",
      "rgb": "rgb(87, 77, 53)"
    },
    {
      "name": "goat",
      "rgb": "rgb(164, 156, 142)"
    },
    {
      "name": "teal-color",
      "rgb": "rgb(0, 105, 100)"
    },
    {
      "name": "creme",
      "rgb": "rgb(221, 190, 120)"
    },
    {
      "name": "grey",
      "rgb": "rgb(153, 153, 153)"
    },
    {
      "name": "navy",
      "rgb": "rgb(14, 35, 102)"
    },
    {
      "name": "brown",
      "rgb": "rgb(98, 64, 24)"
    },
    {
      "name": "white",
      "rgb": "rgb(244, 244, 244)"
    },
    {
      "name": "green",
      "rgb": "rgb(88, 135, 50)"
    },
    {
      "name": "violet",
      "rgb": "rgb(102, 51, 204)"
    },
    {
      "name": "pink",
      "rgb": "rgb(255, 128, 170)"
    },
    {
      "name": "yellow",
      "rgb": "rgb(255, 204, 0)"
    },
    {
      "name": "orange",
      "rgb": "rgb(254, 103, 2)"
    },
    {
      "name": "red",
      "rgb": "rgb(193, 0, 19)"
    },
    {
      "name": "black",
      "rgb": "rgb(0, 0, 0)"
    }
]

var colorNames = colors.map(x=>x.name);

var product = function(src, name, color, price){
    return `<div class="cell col-3 col-m-4 col-s-6">
                <a href="../html/product-detail.html">
                    <div class="product">
                        <img src="${src}" alt="">
                        <h3>${name}</h3>
                        <p>${color}</p>
                        <h3>${price}</h3>
                    </div>
                </a>
            </div>`;
}

var loadProduct = function(products){
    $('.product-container').html("");
    for(var i =0; i<products.length; i++){
        $('.product-container').append(product(products[i].src, products[i].name, products[i].color, products[i].price));
    }
}

var checkMyColor = function(mycolor, accepts, selected){
  var myColors = mycolor.split(' ');
  myColors = myColors.filter(x=> accepts.includes(x));
  if(myColors.length==0)
    return false;
  var count = 0;
  for(var i = 0; i<myColors.length; i++)
  {
    if(selected.includes(myColors[i])){
      count+=1;
    } 
  }
  return count>0;
}

var search = function(products,condition){
    var result = [];
    for(var i = 0; i<products.length; i++){
        var p = products[i];
        var check = true;
        for(var prop in condition){
          if(condition[prop].length>0){
            if(prop === 'color'){
                check = check && checkMyColor(p[prop].toLowerCase(), colorNames, condition[prop]);
            } else 
            check = check && condition[prop].includes(p[prop].toLowerCase());
          }
        }
        if(check)
          result.push(p);
    }
    return result;
}

var optionClick = function(selector ,activeClass, conditionProp){
  var value = $(selector).text()===""?$(selector).data('color'):$(selector).text().toLowerCase();
  if($(selector).hasClass(activeClass)){
    $(selector).removeClass(activeClass);
    conditionProp.splice(conditionProp.findIndex(x=>x===value),1);
    loadProduct(search(products, condition));
  }else{
    conditionProp.push(value);
    $(selector).addClass(activeClass);
    loadProduct(search(products, condition));
  }
}

a ="";

var products =JSON.parse(localStorage.getItem('product'));
if(key != null)
  products = products.filter(x=>x.type.includes(key)|| x.cate.includes(key) || x.color.includes(key) || x.price.includes(key) || x.style.includes(key))

loadProduct(products);

for(var i = 0; i<colors.length; i++){
    $('.color').append(`<li style="background-color: ${colors[i].rgb}" data-color = "${colors[i].name}"></li>`)
}

$('.type').click(function(e){
  if(e.target !== this)
    return;
  $(this).children('ul').toggleClass('no-display');
});

var condition = {
    style: [],
    color: [],
    cate: [],
    type:[]
};



$($('.options .tool')[0]).children('li').click(function(){
    optionClick(this,'type-selected', condition.type);
})

$('.cate li').click(function(){
  optionClick(this, 'selected', condition.cate);
});

$('.style li').click(function(){
    optionClick(this, 'selected', condition.style);
});

$('.color li').click(function(){
  optionClick(this, 'selected-color', condition.color);
})









