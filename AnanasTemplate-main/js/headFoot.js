$('#btn-menu').click(function(){
    $(".menu-container").toggleClass("display");
});

$(".menu .menu-item").click(function(){
    
    if($(window).width()>=768)
        return;

    if($(this).is(':hover'));
        console.log($(this));

    $(this).children(".sub-menu").toggleClass("display");
    
});

var isSearch = false;
$('#btn-search').click(function(){
    $(".search-area").toggleClass('display');
    $("body").prepend("<div id = 'b-black' class = 'blur-back'><div>");
    $('#b-black').click(function(){
        $(".search-area").removeClass('display');
        $(this).remove();
    });
});

$('.footer-col').click(function(){
    $(this).children('div').toggleClass('display');
});

var cart = $(".cart-display a");
var order = JSON.parse(sessionStorage.getItem("order"));
if(order == null)
    order = [];
cart.text("Giỏ hàng"+ '('+order.length+')');
$('.extend .cart-display t').text(order.length);

var like = $(".likes-display a");
var likes = JSON.parse(sessionStorage.getItem("likes"));
if(likes == null)
    likes = [];
like.text("Yêu thích"+"("+likes.length+")");
$('.extend .likes-display t').text(likes.length);

var menulink = ['./product.html', './category.html','./product.html?key=sale', './article.html', "./article-content.html"];
var menuContent = $('.menu li:not(.sub-menu li)').children('a');
for(var i = 0; i<menulink.length; i++){
    $(menuContent[i]).attr('href', menulink[i]);
}

var subMenuLink = ['./product.html?key=nửa+trên', './product.html?key=giày', './product.html?key=sale','./product.html?key=phụ+kiện'];
var subMenuContent = $('.sub-menu li a');
for(var i = 0; i<subMenuLink.length; i++){
    $(subMenuContent[i]).attr('href', subMenuLink[i]);
}