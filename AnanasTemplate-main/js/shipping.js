var textSlide = new Slider(".text-slider", 2000);
textSlide.run();
var locals = JSON.parse(localStorage.getItem('local'));
// $.get("../js/local.json",

//     function (data, textStatus, jqXHR) {
//         localStorage.setItem("local", data);
//     },
//     "text"
// );
var orderDetail = function(name, size, price, quantity){
    return `<div class="order-detail">
                <div class="detail">
                    <h3 class="name">${name}</h3>
                    <p class="size">Size:${size}</p>
                    <p class="quantity">x${quantity}</p>
                </div>
                <div class="price">
                    <p>${price*quantity} VND</p>
                </div>
            </div>`;
}
var province = locals.map(x=>`<option data-id = '${x.id}'>${x.name}</option>`);
var orders = JSON.parse(sessionStorage.getItem('order'));
var orderHtml = orders.map(x=>orderDetail(x.name, x.size, x.price, x.quantity));

var totalPrice = orders.map(x=>x.price*x.quantity).reduce((x,y) => x+y);

console.log(totalPrice);
$($('select')[0]).append(province);
$('.order-detail-container').html(orderHtml);
$($('.pre-sumary .item')[0]).children('.value').text(totalPrice+' VND');
$('.sumary .item').children('.value').text(totalPrice+' VND');
$($('select')[0]).change(function(){
    var id = $(this).children('option:selected').data("id")-1;
    if(id<0) return;
    var districts = locals[id].districts.map(x=>`<option data-id = '${x.id}' data-pid='${id}'>${x.name}</option>`);
    $($('select')[1]).html("<option data-id= '0'>Quận/Huyện</option>");
    $($('select')[1]).append(districts);
});

$($('select')[1]).change(function(){
    var id = $(this).children('option:selected').data("id");
    var pid = $(this).children('option:selected').data('pid');
    if(id<0) return;
    console.log(pid);
    console.log(id);
    var wards = locals[pid].districts.find(x=>x.id == id).wards.map(x=>`<option data-id = '${x.id}'>${x.prefix+ ' ' + x.name}</option>`);
    $($('select')[2]).html("<option data-id= '0'>Xã/Phường</option>");
    $($('select')[2]).append(wards);
});


