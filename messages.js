$(function(){
    let a = new tip_alert();
    $("#success").click(function(){
        a.top_alert();
    })
    $("#info").click(function(){
        a.top_alert("信息测试信息","INFO");
    })
    $("#warning").click(function(){
        a.top_alert("警告信息","WARNING",2000);
    })
    $("#error").click(function(){
        a.top_alert("错误","ERROR");
    })

    $("#left").click(function(){
        left_alert();
    })
})
function tip_alert(){};
tip_alert.prototype.handle_data = function(msg,level,fade_time){
    this.msg = msg;
    if(this.msg == ""){
        throw "Cannot prompt for an empty string"
    }
    this.level = level;
    this.fade_time=fade_time;
    switch(this.level){
        case "SUCCESS":
            this.background_color = '#398439';
            this.icon = '<i class="font-aw fa fa-check" aria-hidden="true"></i>'
            break;
        case "INFO":
            this.background_color = '#31b0d5';
            this.icon = '<i class="font-aw fa fa-bell-o" aria-hidden="true"></i>'
            break;
        case "WARNING":
            this.background_color = '#ec971f';
            this.icon = '<i class="font-aw fa fa-exclamation-circle" aria-hidden="true"></i>'
            break;
        case "ERROR":
            this.background_color = '#c9302c';
            this.icon = '<i class="font-aw fa fa-times" aria-hidden="true"></i>'
            break;
        default:
            throw 'Frame level does not contain:'+this.level;
    };
    this.html = "<div style='background-color:"+this.background_color+";' class='my-alert-style'>"+this.icon+this.msg+"</div>"
    if(!(this.fade_time)){this.check_str_length();};
}
tip_alert.prototype.check_str_length = function(){
    if(this.msg.length < 5){this.fade_time = 2000}
    else if(this.msg.length>=5 && this.msg.length<=15){this.fade_time = 2500}
    else if(this.msg.length>15 && this.msg.length<30){this.fade_time = 3500}
    else{this.fade_time = 4000};
}
tip_alert.prototype.top_alert = function(msg="成功",level="SUCCESS",fade_time=null){
    this.handle_data(msg,level,fade_time);
    $("body").append(this.html)
    $(".my-alert-style").animate({"top":"15px"},"normal")
    $(".my-alert-style").fadeOut(this.fade_time,function(){$(this).remove()})
    $(".my-alert-style").click(function(){$(this).remove();return false;})
}

function left_alert(){
    if($(".left-frame-body").length == 0){
        $("body").after("<div class=\"left-frame-body\"></div>");
    }
    let html = '<div class="left-frame">left框</div>';
    $(".left-frame-body").append(html);
    $(".left-frame").animate({"right":"15px"},"normal");
    $(".left-frame").delay(2000);
    $(".left-frame").animate({"right":"-200px"},"normal","swing",function(){$(this).remove();return false;});
    $(".left-frame").click(function(){$(this).remove();return false;})
}