
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
var products = JSON.parse(localStorage.getItem('product'));

var actionState = 1;
var selectedId = -1;

var product = function(name, src, price, style, cate, color, colorRGB, type){
    return `<div class="item product">
                <div class="img-container">
                    <img src="${src}" alt="" srcset="">
                </div>
                <div class="detail">
                    <h3 class="name">${name}</h3>
                    <div class="other">
                        <div>
                            <p class="price">Giá: ${price}</p>
                            <p class="style">Kiểu dáng: ${style}</p>
                            <div>Màu sắc: <div class="color" style="background-color: ${colorRGB}" data-color = '${color}'></div></div>
                        </div>
                        <div>
                            <p class="cate">Bộ sưu tập: ${cate}</p>
                            <p class="type">Loại sản phẩm: ${type}</p>
                        </div>
                    </div>
                </div>
                <div class="action">
                    <button>Delete</button>
                    <button>Edit</button>
                </div>
            </div>`
}

var addProduct = function(name, src, price, style, cate, color, colorRGB, type){
    $('.list-item').append(product(name, src, price, style, cate, color, colorRGB, type));
    products.push({
        cate: cate,
        color: color,
        name: name,
        price: price,
        src: src,
        style: style,
        type: type
    });
    localStorage.setItem('product', JSON.stringify(products));
}

var updateProduct = function(name, src, price, style, cate, color, colorRGB, type){
    src  = src.replace('../images/', '') === ""?products[selectedId].src:src;
    products[selectedId] = {
        cate: cate,
        color: color,
        name: name,
        price: price,
        src: src,
        style: style,
        type: type
    }
    localStorage.setItem('product', JSON.stringify(products));
    $('.list-item').html('');
    $('.list-item').append(products.map(x=>product(x.name, x.src, x.price, x.style, x.cate, x.color, 'black', x.type)));
}

var manageProduct = function(){
    var content =  `<h2>Quản lý thông tin sản phẩm</h2>
            <div class="product-control">
                <form action="#" method="post" onsubmit="return false">
                    <input type="text" name="name" id="pname" placeholder="Tên sản phẩm" >
                    <input type="text" name="style" id="style" placeholder="Kiểu dáng">
                    <input type="text" name="price" id="price" placeholder="Giá (VND)">
                    <br>
                    <select name="color" id="color">
                        <option value="0">Màu sắc</option>
                    </select>
                    <select name="cate" id="cate">
                        <option value="0">Bộ sưu tập</option>
                        <option value="basas">basas</option>
                        <option value="vintas">vintas</option>
                        <option value="urbas">urbas</option>
                        <option value="basic-tee">basic-tee</option>
                    </select>
                    <select name="type" id="type">
                        <option value="0">Loại sản phẩm</option>
                        <option value="giày">giày</option>
                        <option value="nửa trên">nửa trên</option>
                        <option value="phụ kiện">phụ kiện</option>
                    </select>
                    <br>
                    <input type="file" name="img" id="img">
                    <br>
                    <button type="submit">Lưu</button>
                </form>
            </div>
            <div class="list-item">
                
            </div>`;
    $('.content').html(content);
    $('.list-item').append(products.map(x=>product(x.name, x.src, x.price, x.style, x.cate, x.color, 'black', x.type)));
    $('#color').append(colors.map(x=>`<option value='${x.name}'>${x.name}</option>`));
    $('.product .action button:first-child').click(function(){
      var product =  $(this).parent().parent();
      var productId = product.index();
      products.splice(productId, 1);
      localStorage.setItem('product', JSON.stringify(product));
      product.remove();
    });
    $('.product-control form button').click(function(){
        var name = $('#pname').val();
        var style = $('#style').val();
        var price = $('#price').val();
        var color = $('#color option:selected').val();
        var type = $('#type option:selected').val();
        var cate = $('#cate option:selected').val();
        var src = "../images/"+$('#img').val().substr(12);
        if(actionState ==1){
            addProduct(name, src, price, style, cate, color, 'black', type);
        } else{
            updateProduct(name, src, price, style, cate, color, 'black', type);
        }
        actionState = 1;
    });
    $('.product .action button:nth-child(2)').click(function(){
        var product = $(this).parent().parent();
        var detail = product.children('.detail');
        $("#pname").val(detail.children('h3').text());
        $("#style").val($(detail.children('.other').children('div')[0]).children('.style').text().substr(10));
        $("#price").val($(detail.children('.other').children('div')[0]).children('.price').text().substr(4));
    
        var color =  $(detail.children('.other').children('div')[0]).children('div').children('.color').data('color');
        $('#color option').filter(function(){
            return  $(this).text() === color.toLowerCase();
        }).prop('selected', true);
    
        var cate = $(detail.children('.other').children('div')[1]).children('.cate').text().substr(11);
        $('#cate option').filter(function(){
            return $(this).text() === cate.toLowerCase().trim();
        }).prop('selected', true);
    
        var type = $(detail.children('.other').children('div')[1]).children('.type').text().substr(14);
        $('#type option').filter(function(){
            return $(this).text() === type.toLowerCase().trim();
        }).prop('selected', true);
    
        actionState = 2;
        selectedId = product.index();
        console.log(selectedId);
    });
}

var managePendingOrrder = function(){
  var content = `<h2>Đơn hàng đang chờ</h2>
          <div class="list-item">
              <div class="item order bottom-dashed">
                  <div class="detail order-item">
                    <div class="info">
                        <div>Mã đơn hàng:</div>
                        <div>Ngày tạo:</div>
                        <div>Địa chỉ:</div>
                        <div>Tổng tiền:</div>
                    </div>
                    <div class="info">
                        <div>DH100</div>
                        <div>11/1/2021</div>
                        <div>An Vĩ, Khoái Châu, Hưng Yên</div>
                        <div>500000VND</div>
                    </div>
                  </div>
                  <div class="action">
                      <button>xem</button>
                      <button>huỷ</button>
                  </div>
                  <div class="list-detail">
                      <div class="order-detail order-item bottom-dashed">
                          <div class="info">
                              <div>Tên sản phẩm:</div>
                              <div>Số lượng:</div>
                              <div>Đơn giá:</div>
                          </div>
                          <div class="info">
                              <div>Giày Ananas</div>
                              <div>2</div>
                              <div>250000VND</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`
          $('.content').html(content);
          $($('.order .action button')[1]).click(function(){
            $(this).parent().parent().remove();
          });
          
          $($('.order .action button')[0]).click(function(){
            $(this).parent().parent().children('.list-detail').toggle();
          });
}

var manageSentOrder = function(){
      var content = `<h2>Đơn hàng đang chờ</h2>
      <div class="list-item">
          <div class="item order bottom-dashed">
              <div class="detail order-item">
                <div class="info">
                    <div>Mã đơn hàng:</div>
                    <div>Ngày tạo:</div>
                    <div>Địa chỉ:</div>
                    <div>Ngày giao:</div>
                    <div>Tổng tiền:</div>
                </div>
                <div class="info">
                    <div>DH100</div>
                    <div>11/1/2021</div>
                    <div>An Vĩ, Khoái Châu, Hưng Yên</div>
                    <div>18/1/2021</div>
                    <div>500000VND</div>
                </div>
              </div>
              <div class="action">
                  <button>xem</button>
                  <button>huỷ</button>
              </div>
              <div class="list-detail sent">
                  <div class="order-detail order-item bottom-dashed">
                      <div class="info">
                          <div>Tên sản phẩm:</div>
                          <div>Số lượng:</div>
                          <div>Đơn giá:</div>
                      </div>
                      <div class="info">
                          <div>Giày Ananas</div>
                          <div>2</div>
                          <div>250000VND</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>`
      $('.content').html(content);
      $($('.order .action button')[1]).click(function(){
        $(this).parent().parent().remove();
      });
      
      $($('.order .action button')[0]).click(function(){
        $(this).parent().parent().children('.list-detail').toggle();
      });
}

var forms = [manageProduct, function(){}, function(){}, function(){}, function () { }]
var formsOrder = [managePendingOrrder,manageSentOrder];
$('.menu li:not(.sub li)').click(function(e){
    var item = $(e.target).parent();
    if(this !== item[0])
        return;
    var subMenu =  item.children('.sub');
    if(subMenu[0] == undefined){
        forms[item.index()]();
        return;
    }
    subMenu.toggle();
});

$($('.menu li:not(.sub li)')[1]).find('.sub li').click(function(){
  formsOrder[$(this).index()]();
});




