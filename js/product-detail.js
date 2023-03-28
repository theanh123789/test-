var textSlide = new Slider(".text-slider", 2000);
textSlide.run();

var imgMultiSlide = new MultipleSlider(".img-list", 4);
imgMultiSlide.load();


var lItem = $(document).width()>=768?4:3;

var productRelate = new MultipleSlider(".product-related", lItem);
productRelate.resetButton = ()=>{
    $(productRelate.selector+" .btnPrev,"+productRelate.selector+" .btnNext").css({
        "cursor":"pointer",
        "position": "absolute",
        "top": `calc(33% - ${$(productRelate.selector+" .btnNext").height()/2}px)`
    });
}
productRelate.load();

var productViewed = new MultipleSlider(".product-reviewd", lItem);
productViewed.resetButton = ()=>{
    $(productViewed.selector+" .btnPrev,"+productViewed.selector+" .btnNext").css({
        "cursor":"pointer",
        "position": "absolute",
        "top": `calc(33% - ${$(productViewed.selector+" .btnNext").height()/2}px)`
    });
}
productViewed.load();

var quantityItem = $('.quan-container .picker li');
var quantity = Number($(quantityItem[quantityItem.length -1]).text());



if(likes.find(x=>x===$("#name").text()) != undefined){
    $("#like").css("background-color", "orangered");
    $(".fa-heart").css("color", "white");
}

$("#add").hover(function(){
    if($("#size").val() ==="" || $("#quantity").val() === ""){
        $(this).css('cursor','no-drop');
    } else{
        $(this).css('cursor', 'pointer');
    }
}, function(){});

var addToCart = function(){
    if($("#size").val() ==="" || $("#quantity").val() === ""){
        return;
    }

    var detail = {
         img : $("#product-image").attr("src"),
         name : $("#name").text(),
         price : optimizeString($("#price").text()),
         quantity : $("#quantity").val(),
         size : $("#size").val()
    }
    if(order == null)
        order = [];
    
    var preOrder = order.find(x=>x.name === detail.name);
    if(preOrder != undefined){
        preOrder.quantity = parseInt(preOrder.quantity) + parseInt(detail.quantity);
        if(preOrder.quantity>quantity){
            console.log("vailoz");
            return;
        };
        sessionStorage.setItem("order", JSON.stringify(order));
        return false;
    }

    order.push(detail);
    sessionStorage.setItem("order", JSON.stringify(order));
    cart.text("Giỏ hàng"+ '('+order.length+')');
    $('.extend .cart-display t').text(order.length);
    return true;
}

$("#add").click(addToCart);

$("#like").click(function(){
    var productName = $('#name').text();
    var preLike = likes.find(x=>x.name === productName);
    if(preLike != undefined){
        likes.splice(likes.findIndex(x=>x.name === productName), 1); 
        $("#like").css("background-color", "black");
        $(".fa-heart").css("color", "orangered");
    } else {
        likes.push({
            name:  productName,
            src: $('#product-image').attr('src'),
            price: $('#price').text()
        });
        $("#like").css("background-color", "orangered");
        $(".fa-heart").css("color", "white");
    }
    sessionStorage.setItem('likes', JSON.stringify(likes));
    like.text("Yêu thích"+"("+likes.length+")");
    $('.extend .likes-display t').text(likes.length);
    
});

$('#size, #quantity').keydown(function (e) { 
    $(this).blur();
});

$(".img-container .img-list .overlay .content .item img").click(function(){
    $("#product-image").attr("src", $(this).attr("src"));
    console.log("lol");
});

function optimizeString(str){
    str = str.replace(" VND", "");
    while(str.indexOf(".")>=0){
        str = str.replace(".", "");
    }
    return Number(str);
}

function closeOrthers(){
    
    $.each($('.verticle-nav li').not('.chosen').children('.content'), function (index, element) { 
         $(element).css('display','none');
    });

    $.each($('.verticle-nav li').not('.chosen'), function (index, element) { 
        if($(element).children('.title').children('i').hasClass('turnAround')){
            $(element).children('.title').children('i').removeClass('turnAround');
            console.log('ok');
        }
   });
}

$('.verticle-nav li').click(function(){
    $('.verticle-nav li').removeClass('chosen');
    $(this).children('.content').toggle();
    $(this).toggleClass('chosen');
    $(this).children('.title').children('i').toggleClass('turnAround');
    closeOrthers();
});

$('.size-quan-selector div input').click(function(){
    $(this).nextAll('.picker').toggleClass('showPicker');
});

$('.size-quan-selector div .picker li').click(function(){
    $(this).parent().prevAll('input').val($(this).text());
    $(this).parent().toggleClass('showPicker');
});

var img = $("#product-image");
var lens = $("#lens");
var result = $("#result");
img[0].addEventListener('mousemove', moveLens)
function moveLens(ev){
    var pos = getMousePos(ev);
    var offset = getLensPos(pos, lens);
    
    if(pos.top>img.height()-offset || pos.top<offset || pos.left>img.width()-offset || pos.left<offset){
        lens.css('display', 'none');
        result.css('display', 'none');

    }else{
         lens.css('display', 'block');
         result.css({
            'background-image': `url('${img.attr('src')}')`,
             'display': 'block',
             'background-position': `${-pos.left}px ${-pos.top}px`,
        });
    }
}

function getLensPos(pos, lens){
    var lensPos = {x: (pos.left - lens.width()/2)+"px", y: (pos.top - lens.height()/2)+"px"};
    lens.css({"top": lensPos.y, "left": lensPos.x});
    return lens.width()/2;
}

function getMousePos(ev){
    var bound = ev.target.getBoundingClientRect();
    var x = ev.clientX - bound.left;
    var y = ev.clientY - bound.top;
    return {left: x, top: y}
}

$("#pay").hover(function(){
    if($("#size").val() ==="" || $("#quantity").val() === ""){
        $(this).css('cursor','no-drop');
    } else{
        $(this).css('cursor', 'pointer');
    }
}, function(){});

$('#pay').click(function(){
    if($("#size").val() ==="" || $("#quantity").val() === ""){
        return;
    }
    window.location.replace('./cart.html');
    return true;
});

window.addEventListener('resize', function(){
    if(window.innerWidth <768){
       productViewed.displayItem = 3;
       productRelate.displayItem = 3;
       
    } else{
        productViewed.displayItem = 4;
        productRelate.displayItem = 4
    }
    productViewed.reloadWidth();
    productViewed.load();

    productRelate.reloadWidth();
    productRelate.load();
    
    
});







