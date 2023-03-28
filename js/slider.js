function Slider(selector, speed){
    $(selector).css("overflow", "hidden");
    var imgItem = $(selector).children(".slide-content").children("li");
    var statusContain = $(selector).children(".status-container");
    var statusItem = $(statusContain).children(".status-item");
    var index = 0;
    var length = imgItem.length;

    this.run = function(){
        console.log(statusItem);
        setInterval(() => {
            var next = getNext(index)
            showAnimateEnd(imgItem[next]);
            hideAnimateEnd(imgItem[index])
        
            show(imgItem[next]);
            hide(imgItem[index]);
            activeStatus(index, next);
            if(index>length-2)
                index = 0;
            else
                index++;
        }, speed);

        $(selector).children("#right").click(function () { 
            var next = getNext(index)
            showAnimateEnd(imgItem[next]);
            hideAnimateEnd(imgItem[index])
            
            show(imgItem[next]);
            hide(imgItem[index]);
            activeStatus(index, next);
            if(index>length-2)
                index = 0;
            else
                index++;
        });
        
        $(selector).children("#left").click(function () { 
            var prev = getPrev(index)
            showAnimateEnd(imgItem[prev]);
            hideAnimateEnd(imgItem[index])
            
            show(imgItem[prev]);
            hide(imgItem[index]);
            activeStatus(index,prev);
        
            if(index>0)
                index--;
            else
                index=length-1;
        });

        statusItem.click(function(){
            index = $(this).index();
            
        });
    }

    function getNext(index){
        if(index>length-2)
            return 0;
        return index+1;
    }
    
    function getPrev(index){
        if (index>0)
            return index-1;
        return length-1;
    }
    
    function show(element){
        $(element).removeClass("hide off");
        $(element).addClass("show");
    }
    
    function hide(element){
        $(element).removeClass("on");
        $(element).addClass("hide");
    }
    
    function showAnimateEnd(element){
        element.onanimationend = function(){
            $(element).removeClass("show");
            $(element).addClass("on");
        }
    }
    
    function hideAnimateEnd(element){
        element.onanimationend = function(){
            $(element).removeClass("hide");
            $(element).addClass("off");
        }
    }
    
    function activeStatus(index, next){
        $(statusItem[index]).removeClass("active");
        $(statusItem[next]).addClass("active");
    }

    function move(index){
        var next = getNext(index)
        showAnimateEnd(imgItem[next]);
        hideAnimateEnd(imgItem[index])
    
        show(imgItem[next]);
        hide(imgItem[index]);
        activeStatus(index, next);
        if(index>length-2)
            index = 0;
        else
            index++;
    }
}





