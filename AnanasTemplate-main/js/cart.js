var textSlide = new Slider(".text-slider", 2000);
textSlide.run();

var orderContainer = $("#list-orders");
var order = JSON.parse(sessionStorage.getItem("order"));
var likes = JSON.parse(sessionStorage.getItem("likes"));
var content = `<div class="title">
                    <h3>Giỏ hàng</h3>
                </div>`;
var getTotalPrice = function(order){
    var result = 0;
    for(var i = 0; i<order.length; i++){
        result+= order[i].price*order[i].quantity;
    }
    return result;
}

var sumprice = 0;

if(order !=null){
    for(var i = 0; i<order.length; i++){
        content+= `<div class="order-detail row">
                        <div class="img-container col-3 col-m-3 col-s-6">
                            <img src="${order[i].img}" alt="" srcset="">
                        </div>
                        <div class="detail col-6 col-m-6 col-s-6">
                            <h3>${order[i].name}</h3>
                            <label>Giá: ${order[i].price} VND</label>
                            <br>
                            <div class="size-quan-selector">
                                <div>
                                    <h3>Size</h3>
                                    <input type="text" id="size" value = '${order[i].size}'>
                                    <i class="fas fa-chevron-left"></i>
                                    <ul class="picker">
                                        <li>35</li>
                                        <li>36</li>
                                        <li>37</li>
                                        <li style="border-right: solid black thin;">38</li>
                                        <li>39</li>
                                        <li>40</li>
                                        <li>41</li>
                                        <li style="border-right: solid black thin;">42</li>
                                        <li>43</li>
                                        <li>44</li>
                                        <li>45</li>
                                        <li style="border-right: solid black thin;">46</li>
                                    </ul>
                                </div>
                                <div class="quan-container">
                                    <h3>Số lượng</h3>
                                    <input type="text" id="quantity" value = '${order[i].quantity}'>
                                    <i class="fas fa-chevron-left"></i>
                                    <ul class="picker">
                                        <li>1</li>
                                        <li>2</li>
                                        <li>3</li>
                                        <li style="border-right: solid black thin;">4</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="other col-3 co-m-3 col-s-12">
                            <h3>${order[i].price} VND</h3>
                            <p><i>còn hàng</i></p>
                            <button class="like"><i class="far fa-heart"></i></button>
                            <br>
                            <button class="trash"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>`;
    }
    orderContainer.html(content);
    sumprice = getTotalPrice(order);
    $('#sum-price').text(`Đơn hàng: ${sumprice} VND`);
    $('#all-price').text(`Tạm tính: ${sumprice} VND`);
}

$('.quantity').keydown(function (e) { 
    $(this).blur();
});

$('.size').keydown(function (e) { 
    $(this).blur();
});

$('.size-quan-selector div input').click(function(){
    $(this).nextAll('.picker').toggleClass('showPicker');
});

$('.size-quan-selector div .picker li').click(function(){
    $(this).parent().prevAll('input').val($(this).text());
    $(this).parent().toggleClass('showPicker');
});

$('.trash').click(function(){
   var orderDetail  = $(this).parent().parent();
   var name = orderDetail.children(".detail").children('h3').text();
   order.splice(order.findIndex(x=>x.name === name), 1);
   sessionStorage.setItem("order", JSON.stringify(order));
   orderDetail.remove();
});

$(".like").click(function(){
    var orderDetail  = $(this).parent().parent();
    var productName = orderDetail.children(".detail").children('h3').text();
    var preLike = likes.find(x=>x === productName);
    if(preLike != undefined){
        likes.splice(likes.findIndex(x=>x === productName), 1); 
        $(this).css("background-color", "black");
        $(this).children(".fa-heart").css("color", "orangered");
    } else {
        likes.push(productName);
        $(this).css("background-color", "orangered");
        $(this).children(".fa-heart").css("color", "white");
    }
    sessionStorage.setItem('likes', JSON.stringify(likes));
    //like.text("Yêu thích"+"("+likes.length+")");
});

$('#btn-pay').click(function(){
    window.location.href = './shipping.html';
});