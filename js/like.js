var product = function(name, price, src){
    return `<div class="cell col-3 col-m-4 col-s-6">
                <a href="../html/product-detail.html">
                    <div class="product">
                        <img src="${src}" alt="ảnh sản phẩm">
                        <h3>${name}</h3>
                        <h3>${price}</h3>
                    </div>
                </a>
            </div>`;
}
console.log(likes);
var likeContent =  likes.map(x=>product(x.name, x.price, x.src));
$('.product-container').html(likeContent);