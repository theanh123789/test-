class MultipleSlider{
    constructor(selector, displayItem){
        this.selector = selector;
        this.displayItem = displayItem;
        this.width =  Number($(this.selector).css("width").replace("px",""));
        this.itemWidth = this.width/this.displayItem;
        this.overlay = $(`${this.selector} .overlay`);
        this.carousel = $(this.selector);
        this.item = $(`${this.selector} .overlay .content .item`);
        this.slider = $(`${this.selector} .overlay .content`);
        this.maxCount = this.item.length%displayItem==0?(this.item.length/displayItem)-1:Math.floor(this.item.length/this.displayItem);
        this.count = 0;
    }

    reloadWidth(){
        this.itemWidth = this.width/this.displayItem;
    }

    load(){
        
        this.carousel.css("position","relative");
        this.overlay.css({
            "width": "100%",
            "height": "100%",
            "overflow": "hidden"
        });

        this.slider.css({
            "display": "flex",
            "height":"100%",
            "width": "fit-content",
            "transition": "0.5s"
        });

        this.item.children("img").css("width","100%");

       

        this.resetButton();

        $(this.selector+" .btnPrev").css("left", "5px");
        $(this.selector+" .btnNext").css("right", "5px");

        $(this.item).css("width", this.itemWidth);
        window.addEventListener("resize", this.update);
        $($(this.selector+" .btnPrev")[0]).click(this.prev);
        $($(this.selector+" .btnNext")[0]).click(this.next);
    }
    
    update = () =>{
        this.width = Number($(this.selector).css("width").replace("px",""));
        $(this.item).css("width",  (this.width/this.displayItem)+"px");
        
        this.resetButton();

        if(Number($(this.slider).css("width").replace("px",""))>=this.width){
            $(".btnPrev, .btnNext").css("display","block");
        } else{
            $(".btnPrev, .btnNext").css("display","none");
        }

    }

    resetButton =()=>{
        $(this.selector+" .btnPrev,"+this.selector+" .btnNext").css({
            "cursor":"pointer",
            "position": "absolute",
            "top": `calc(50% - ${$(this.selector+" .btnNext").height()/2}px)`
        });
    }


    next = ()=>{
        this.count++;
        if(this.count>this.maxCount){
            this.slider[0].style.transform = "translateX(0)";
            this.count = 0;
            return;
        }
        this.slider[0].style.transform = `translateX(-${this.count*this.width}px)`;
    }
    
    prev = ()=>{
        this.count--;
        if(this.count<0){
            this.slider[0].style.transform = `translateX(-${this.width*this.maxCount}px)`;
            this.count = this.maxCount;
    
            return;
        }
        this.slider[0].style.transform = `translateX(-${this.count*this.width}px)`;

    }
}



















