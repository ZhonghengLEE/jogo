$(function(){
    mui('.my-footer').on('tap','a',function(){
        window.top.location.href=this.href;
    });

})