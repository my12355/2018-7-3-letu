// JavaScript Document
$(function(){
    $('.fz ul li').hover(function(){
        $(this).find('p').fadeIn();
    },function(){
        $(this).find('p').fadeOut();
    });
})

$(function(){
    //ÉãÓ°Õ÷¼¯Áî
    var LiIndex=0;
    var src;
    var LiLen=$(".con3 .bd-pic ul li").length;
    console.log(LiLen);
    $(".BpicWrap .close").click(function(){
        $(".Mc").hide();
    })
    $(".con3 .bd-pic ul li").live('click',function(){
        LiLen=$(".con3 .bd-pic ul li").length;
        console.log(LiLen)
        LiIndex=$(this).index(".bd-pic ul li");
        if(LiIndex==0){
            $(".whiteMc.lf").show();
            $(".whiteMc.rg").hide();
        }else if(LiIndex==LiLen-1){
            $(".whiteMc.rg").show();
            $(".whiteMc.lf").hide();
        }else{
            $(".whiteMc.lf").hide();
            $(".whiteMc.rg").hide();
        }
        src=$(this).find('img').attr('src');
        console.log(src)
        $(".Mc").find(".con02Bpic").attr('src',src);
        $(".Mc").show();
    })
    $(".Mc .left").click(function(){
        LiIndex--;
        console.log(LiIndex);
        if(LiIndex==0){
            $(".whiteMc.lf").show();
        }else if(LiIndex<0){
            LiIndex=0;
            return false;
        }else{
            $(".whiteMc.lf").hide();
        }
        src=$(".bd-pic ul li").eq(LiIndex).find("img").attr('src');
        $(".Mc").find(".con02Bpic")[0].src=src;
        $(".whiteMc.rg").hide();
    })
    $(".Mc .right").click(function(){
        LiIndex++;
        if(LiIndex==LiLen-1){
            $(".whiteMc.rg").show();
        }else if(LiIndex==LiLen){
            LiIndex=LiLen-1;
            return false;
        }else{
            $(".whiteMc.rg").hide();
        }
        src=$(".bd-pic ul li").eq(LiIndex).find("img").attr('src');
        console.log(LiIndex);
        $(".Mc").find(".con02Bpic")[0].src=src;
        $(".whiteMc.lf").hide();

    })

    $('.canyu').click(function(){
        $('.tanceng').show();
        $('.main').show();
    })
    $('.main .chacha').click(function(){
        $('.tanceng').hide();
        $('.main').hide();
    })
    $('.chenggong .chacha').click(function(){
        $('.tanceng').hide();
        $('.chenggong').hide();
    })
    $('.con3 .bd-pic li').live('mouseenter',function(){
        $(this).find('.pic-info').show();
    }).live('mouseleave',function(){
        $(this).find('.pic-info').hide();
    });
    /*$('.con3 .bd-pic li').hover(function(){
     $(this).find('.pic-info').show();
     },function(){
     $(this).find('.pic-info').hide();
     })*/
})

$(function () {

    var slideBanner = function () {
        this.bannerImg = $(".tabpic ul li");
        this.bannerBtn = $(".btn span");
        this.bannerCir_btn = $(".lbcont-left ul li");
        this.showIndex = 0;
        this.time = null;
        tab1(".player-block p span",".player-block ul li");
        tab1(".wangzhuan-cont .numpage span",".wangzhuan-cont .lists")
        function tab1(points,tablock){
            $(points).click(function(){
                $(this).addClass("cur").siblings().removeClass("cur");
                $(tablock).eq($(this).index()).addClass("cur").siblings().removeClass("cur");

            })
        }

    };

    slideBanner.prototype = {

        init: function () {
            var that = this;

            that.bannerBtn.bind("click", function () {
                var index = $(this).index();
               that.showIndex = index;
               $(this).addClass("cur").siblings().removeClass("cur");
                that.bannerCir_btn.eq(index).addClass("cur").siblings().removeClass("cur");
               //jai
                that.bannerCir_btn.eq(index).find("i").css("display","block").parents("li").siblings("li").find("i").css("display","none")

                that.goBanner(index)
            })
            that.bannerCir_btn.bind("click", function () {
                var index = $(this).index();

                that.bannerBtn.eq(index).click();


            })
            $(".lbcont-left,.lbcont-right").hover(function () {
                clearTimeout(that.time)
            }, function () {
                that.timePlay();
            })

            that.bannerBtn.eq(0).click();
            that.timePlay();

        },


        goBanner: function (index) {
            var that = this;

            that.bannerImg.eq(index).css({
                "z-index": 2,
                "display": "block"
            }).stop().siblings(".cur").css({
                "z-index": 1,
                "display": "block"
            }).end().animate({
                opacity: 1
            }, 500, function () {
                $(this).addClass("cur").siblings().css({
                    "z-index": 0,
                    "display": "block",
                    "opacity": 0
                }).removeClass("cur");
            })
        },

        timePlay: function () {
            var that = this;

            that.showIndex++;

            if (that.showIndex >= that.bannerImg.length) that.showIndex = 0;
            clearTimeout(that.time);
            that.time = setTimeout(function () {

                that.bannerBtn.eq(that.showIndex).click();

                that.timePlay();
            }, 4000)
        }

    }

    var bannerSlide = new slideBanner();
    bannerSlide.init();


})

//ÊÖ»ú°æÂÖ²¥

$(function(){
    if ($(window).width() <= 768) {
        $(".tanceng .main .p-65 input").attr("placeholder","")
$(" .tanceng .main .tijiao").html("")
    }

})

//m-µ¯²ã

$(function(){
    $(".con3 .hed-bd .tit .chakan span.m-jiang").click(function(){
        $(".m-j").css("display","block");
    })
    $(".m-j .m-close").click(function(){
        $(".m-j ").css("display","none");
    })
})






$(".toum,.wenzi").show().css({ "bottom": "-28px", "left": 0 });
$("ul li a img").hover(function () {
        $(this).parent().siblings(".toum,.wenzi").stop().animate({ "bottom": 0 }, 200).show();
    },
    function () {
        $(this).parent().siblings(".wenzi,.toum").stop().animate({ "bottom": -28 }, 200).show();
    })

//$(".lookTu").colorbox({ rel: 'lookTu' });

function FocusCount(l, m) {
    return true;
}
/**
 * Created by Administrator on 2016/11/7.
 */
