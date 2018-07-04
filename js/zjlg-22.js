$(window).resize(function () {

    changeImg();
    if ($(window).width() <= 768 && $("#ulzuji li").length == 3) {
        $("#ulzuji li:last").hide();
    } else {
        $("#ulzuji li:last").show();
    }
});


//整合微信Js调用
var wappId, wtimestamp, wnonceStr, wsignature;
$(document).ready(function () {
    var nowurl = location.href.split('#')[0];
    $.ajax({
        type: "GET",
        async: false, //false 是同步 ，true是异步
        dataType: 'jsonp',
        jsonp: 'callback',
        url: "http://wx.lotour.com/WxCommon/WxAPI.ashx",
        data: {curl: nowurl},
        success: function (data) {
            wappId = data.appId;
            wtimestamp = data.timestamp;
            wnonceStr = data.nonceStr;
            wsignature = data.signature;

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wappId, // 必填，公众号的唯一标识
                timestamp: wtimestamp, // 必填，生成签名的时间戳
                nonceStr: wnonceStr, // 必填，生成签名的随机串
                signature: wsignature, // 必填，签名，见附录1
                jsApiList: ["startRecord", "hideMenuItems", "scanQRCode", "hideOptionMenu", "showMenuItems", "showOptionMenu", "showAllNonBaseMenuItem", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "closeWindow", "uploadImage", "chooseImage", "stopRecord"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

        },
        error: function () {
            alert("error");
        }
    });
    setShareInfo({
        title: title, // 分享标题
        summary: desc, // 分享内容
        pic: imgUrl, // 分享图片
        url: link
    });
    //定义文字
    wx.ready(function () {
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                ShareCount("wx");
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                ShareCount("wx");
            }
        });
        //分享到qq
        wx.onMenuShareQQ({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                ShareCount("wx");
            }
        });
        //分享到腾讯微博
        wx.onMenuShareWeibo({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                ShareCount("wx");
            }
        });
    });
});

//顶部固定
function topFix() {
    var scrollFunc = function (e) {
        e = e || window.event;
        if (e.wheelDelta) {
            if (e.wheelDelta > 0) {
                $('header').addClass("header-fix");
                $(".ia-left").addClass("ia-left-fix2");
                $(".ia-banner").addClass("ia-banner2");
            }
            if (e.wheelDelta < 0) {
                $('header').removeClass("header-fix");
                $(".ia-left").removeClass("ia-left-fix2");
                $(".ia-banner").removeClass("ia-banner2");
            }
        } else if (e.detail) {
            if (e.detail > 0) {
                $('header').removeClass("header-fix");
                $(".ia-left").removeClass("ia-left-fix2");
                $(".ia-banner").removeClass("ia-banner2");
            }
            if (e.detail < 0) {
                $('header').addClass("header-fix");
                $(".ia-left").addClass("ia-left-fix2");
                $(".ia-banner").addClass("ia-banner2");
            }
        }
    }

    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = scrollFunc;


    $(window).scroll(function () {
        if ($(document).scrollTop() == 0) {
            $('header').addClass("header-fix2");
            $(".ia-banner").addClass("ia-banner3");
        } else {
            $('header').removeClass("header-fix2");
            $(".ia-banner").removeClass("ia-banner3");
        }
    });

}
//左侧悬浮固定
function leftFix() {
    var hh = $(".ia-left").outerHeight(true),
        bdRt = $(".ia-left").offset().top,
        bhh = $(".ia-read").offset().top;
    $(window).scroll(function () {
        var st = $(document).scrollTop(), bt = $(".ia-left").offset().top;
        bhh = $(".ia-read").offset().top;
        if (st - bdRt >= 0) {
            $(".ia-left").addClass("ia-left-fix");

        } else if (st - bdRt < 0) {
            $(".ia-left").removeClass("ia-left-fix");
        }
        if (st >= bhh - hh) {
            $(".ia-left").removeClass("ia-left-fix");
        }

    });
}
//相关阅读
function relRead() {
    $('.idx-brand ul li .item').hover(function () {
            if ($(this).find('p').length < 0) {
                return false
            }
            $(this).stop().animate({
                    'bottom': 0
                },
                300)
        },
        function () {
            if ($(this).find('p').length < 0) {
                return false
            }
            $(this).stop().animate({
                    'bottom': -28
                },
                500)
        });
    if ($(window).width() > 768) {
        $(".idx-brand ul li").css("height", $(".idx-brand ul li .item").height() - 28);
    } else {
        $(".idx-brand ul li").css("height", "auto");
    }
}
var loginMemberId = 0;
function priseFun(data) {
    prise.fromMemberId = data.memberId;
    ap.AddPrise();
}

//20151222mobile手机端返回、评论跳转函数------Start
function goback() {
    var home = 'http://www.lotour.com';
    (document.referrer == '' || document.referrer == null || document.referrer.indexOf('www.lotour.com') > -1) ? window.location.href = home : window.history.go(-1);
}
function gocomment() {
    //$('body,html').animate({'scrollTop': $("#commentsite").offset().top - 50});
}
//20151222mobile手机端返回、评论跳转函数------End

$(function () {

    $('img[original]').lazyload({
        effect: "fadeIn"
    });
    var isupdate = true;
    $(window).scroll(function () {
        if (isupdate) {
            $.ajax({
                cache: false,
                type: "GET",
                url: "http://api.lotour.net/pv/UpdatePv",
                dataType: "jsonp",
                data: {"id": newsData.id},
                success: function (data) {
                }
            });
            isupdate = false;
        }
    });
    leftFix();
    relRead();
    topFix();
    praise();
    //20150923mobile手机端端评论-----End

    //赞+1
    function praise() {
        $('.articleZanBtn').click(function () {
            ap.AddPrise();
        })

        //20150923mobile手机端点赞-----Start
        //$('.foot-nav-a2').click(function () {
        //    ap_mobile.AddPrise();
        //})
        //20150923mobile手机端点赞-----End

    }


    //评论
    $(".commentBtn").live("hover", function () {
        $(this).toggleClass("tihsOn");
    });
    $(".ltCommentList li").live("hover", function () {
        $(this).children(".commnLstL").toggleClass("atMeIcoOn");
    });

    $.ajaxSettings.async = false;
    $.getJSON('http://my.lotour.com/login/login/islogin?callback=?&' + (new Date()), function (data) {
        if (data.uid > 0) {
            try {
                loginMemberId = data.uid;
            } catch (e) {
            }
        }
    });
    var authorStr = '<a title="" target="_blank" href="http://zhuanlan.lotour.com/' + authorinfo.id + '/">' + authorinfo.nickName + '</a>';
    $(".mianze").html("<span>&copy;版权声明：</span>本文系合作俱乐部授权乐途旅游网发表，文章中所涉及的内容合法性由该俱乐部承担。转载需注明稿件来源：“乐途旅游网与" + authorStr + "”。违者将依法追究责任。");
    $.ajax({
        type: "get",
        cache: false,
        url: "http://fw1.lotour.com/i/Detail/Comment/GetCommentCount?id="+newsData.id +"&appType=16",
        dataType: "jsonp",
        jsonp: 'callback',
        success: function (data) {
            if(parseInt(data)>0){
                $('.foot-nav-a3').append('<i class="num">'+data+'</i>');
            }
        }
    });
    //pv
    $.ajax({
        cache: false,
        type: "GET",
        url: "http://api.lotour.net/pv/SelectPv",
        dataType: "jsonp",
        data: {"id": newsData.id, "regionId": newsData.regionid},
        success: function (data) {
            if (data != null) {
                $(".ia-num-like").html(data.pageview);
            }
        }
    });

    $.getJSON("http://api.lotour.net/pv/SelectPvs?ids=" + Recomids() + "&callback=?", function (data) {
        $.each(data, function (i, val) {
            var pv = val.pageview;
            if (pv >= 10000) {
                pv = Math.round(pv / 10000 * 10) / 10 + "万";
            }
            $("span[lid=" + val.id + "]").html(pv);
        });
    });
    function Recomids() {
        var ids = "0";
        $("span[lid]").each(function (i, e) {
            ids += "," + $(e).attr("lid");
        });
        return ids;
    }

    if (window.PIE) {
        $('.ia-writer img,.commnLstL img,.ltCommentBox,.imglist li,.imglist2 li .txt2 img').each(function () {
            PIE.attach(this);
        });
    }

    $.getScript('http://stats.lotour.com/behavior2/statsv3.js?t=' + new Date().getTime());
});


function GetUserPoto(arrpoto) {
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        url: "http://my.lotour.com/i/Common/GetMembersInfo",
        dataType: "jsonp",
        data: {"memberIds": arrpoto},
        success: function (data) {
            if (data.Result.Data.length > 0) {
                for (var i = 0; i < data.Result.Data.length; i++) {
                    var tHeadPic = "http://img.lotour.net/UserPhoto/" + data.Result.Data[i].Photo;
                    $("#imgAuthor" + data.Result.Data[i].MemberId).attr("src", "http://img.lotour.net/zip/20110411/index_mrtu.jpg").attr('original', tHeadPic);
                }
            }
        }
    });
}


function sns_share_show(key, title, content, url, pic, tag) {
    if (pic != '') {
        if (pic.split('|').length > 1) {
            pic = pic.split('|')[1];
        }
        else {
            pic = pic.split('|')[0];
        }
    }
    var from = key.split('_')[0];
    var biglog = 'http://img2.lotour.net/lotour/logo_460.jpg';

    ShareCount(from);
    var contentpic = getContentPic("|");
    if (from == 'wb') {
        contentpic = getContentPic("||");
        var pop_url = 'http://service.weibo.com/share/share.php?appkey=2861886718&title=' + encodeURIComponent("走吧，不是去哪里，而是在路上！" + title + "@乐途旅游网官方微博") + '&url=' + encodeURIComponent(url) + "&picture_search=false&pic=" + encodeURIComponent(contentpic);
        return "window.open('" + pop_url + "', '_blank', 'scrollbars=no,width=600,height=480,left=75,top=20,status=no,resizable=yes');";
    } else if (from == 'qz') {
        var pop_url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + encodeURIComponent("走吧，不是去哪里，而是在路上！" + title + "@乐途旅游网") + '&url=' + encodeURIComponent(url) + "&pics=" + contentpic;
        return "window.open('" + pop_url + "', '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');";
    } else if (from == 'qt') {
        var pop_url = 'http://share.v.t.qq.com/index.php?c=share&a=index&title=' + encodeURIComponent("走吧，不是去哪里，而是在路上！" + title + "@乐途旅游网") + '&url=' + encodeURIComponent(url) + '&appkey=100317561&pic=' + encodeURIComponent(contentpic);
        return "window.open('" + pop_url + "', '_blank', 'scrollbars=no,width=700,height=680,left=75,top=20,status=no,resizable=no,menubar=no,toolbar=no,scrollbars=no,location=yes');";
    }
    else if (from == 'db') {
        var pop_url = 'http://www.douban.com/share/service?image=' + encodeURIComponent(pic) + '&amp;href=' + encodeURIComponent(url) + '?aaaa&amp;name=' + encodeURIComponent(title) + '&amp;text=';
        return "window.open('" + pop_url + "', '_blank', 'scrollbars=no,width=700,height=680,left=75,top=20,status=no,resizable=no,menubar=no,toolbar=no,scrollbars=no,location=yes');";
    }

}
function ShareCount(shareType) {
    $.post("http://api.lotour.net/brandhome/Statistics/ShareCount",
        {articalType: 1, articalId: newsData.id, shareType: shareType},
        function (data) {
        }, "jsonp");
    return true;
}
function getContentPic(c) {
    var mContent = $(".ia-text").find("img");
    var cPic = '';
    var n = Math.min(mContent.length, 15);
    for (var i = 0; i < n; i++) {
        if (i != 0) {
            cPic = cPic + c;
        }
        cPic = cPic + $(mContent[i]).attr("original");
    }
    return cPic;
}

function FocusCount(l, m) {
    return true;
}

//20151216mobile手机端new-----Start
//评论为0不显示
function foota3() {
    var span = $('.foot-nav-a3 span')
    span.text() == 0 && span.hide() || span.show();
}
foota3();

//手机端滑动效果
function touchFix() {
    var beginY, moveY, moveYold;
    $(document).on('touchstart', function (e) {
        //event.preventDefault();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            beginY = touch.pageY;
            $(this).stop(true, false);
        }
    });

    $(document).on('touchmove', function (e) {
        //event.preventDefault();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            moveY = touch.pageY;
            if (beginY - moveY <= 0) {
                $('.bottom-footer').addClass("foot-nav");
                $(".icon_mask").css("display", "none");
            } else if (beginY - moveY > 0) {
                $('.bottom-footer').removeClass("foot-nav");
                $(".icon_mask").css("display", "none");
                $(".wx-share-img").css("display","none");
                $(".sss .s3 img").css("visibility","visible");
            }
        }
    })
}
touchFix();
//20151216mobile手机端new-----End


//点赞
var prise = {articalId: newsData.id, articalType: 16, articalMemberId: 0}
var ap = new Prise(prise, sucDianZan, areadyDianZan, errDianZan);
var ap_mobile = new Prise(prise, sucDianZan_m, areadyDianZan_m, errDianZan);//20150923mobile手机端点赞对象定义
var ag = new PriseGet(newsData.id, 16, sucAgDianZan, errDianZan);
ag.GetPrise();
function sucDianZan() {
    var _this = $('.articleZanBtn');
    var _num = _this.find('.praiseNum');
    var _text = _this.find('.number');
    var _number = parseInt(_this.find('.number').text());
    if (!_this.hasClass('cur') && !_num.is(":animated")) {
        _num.show();
        _num.stop().animate({"top": "-40px", "opacity": 0}, 1000, function () {
            _text.text(_number + 1);
            $(".ia-num-zan").html(_number + 1);
            $("#mZanNumber").html(_number + 1).show();
            _this.addClass('cur');
            _num.css({"top": 0, "display": "none", "opacity": 1, "flter": "Alpha(Opacity=1)"});
        });
    }
}

//20150923mobile手机端点赞效果-----Start
function sucDianZan_m() {
    //点赞效果
    $(".foot-nav-a2").find("em").addClass("yidian");
    $(".foot-nav-a2").find("p").hide();
    $(".foot-nav-a2").find("em").show().animate({"top": "-40px", "opacity": 0}, 500);
    $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.net/lg_my/thank_1.png");
    var num = $("#mZanNumber").html().replace(/[^0-9]/ig, "");
    num = isNaN(num) ? 1 : parseInt(num) + 1;
    $("#spZanNumber").html(num);
    $(".ia-num-zan").html(num);
    $("#mZanNumber").html(num).show();
}
function areadyDianZan() {
    $("#zanedLayer").show();
    setTimeout(function () {
        $("#zanedLayer").fadeOut("slow")
    }, 1000);
}
function areadyDianZan_m() {
    //已点赞效果
    $(".foot-nav-a2").find("p").fadeIn().fadeOut(500);
}
//20150923mobile手机端点赞效果-----End
function errDianZan() {
}
function sucAgDianZan(n) {
    $("#spZanNumber").html(n);
    $(".ia-num-zan").html(n);
    if (n > 0) {
        $("#mZanNumber").html(n).show();
    }
    else {
        $("#mZanNumber").html(0).hide();
    }
}


//手机端滑动效果


//20151216mobile手机端new-----End
function nohelp_m() {
    var ishelped = $.cookie('praise-16-' + newsData.id);
    if (ishelped != null) {
        //$(".gx1").css("color", "#b4b4b4");
        $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.net/lg_my/no_lg.png");
        $(".wap-gx-con").hide();
        return false;
    }
    jQuery.getJSON('http://my.lotour.com/login/login/islogin?callback=?&' + (new Date()), function (data) {
        if (data.uid > 0) {
            try {
                loginMemberId = data.uid;
                prise.fromMemberId = data.uid;
                $.ajax({
                    url: "http://api.lotour.com/brandhome/Statistics/AddNoHelp",
                    data: {id: newsData.id},
                    dataType: "jsonp",
                    type: "POST",
                    success: function (result) {
                        //$(".gx1").css("color", "#b4b4b4");
                        $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.net/lg_my/no_lg.png");
                        $(".wap-gx-con").hide();
                    }
                });
            } catch (e) {
            }
        }
        else {
            loginToAction();
        }
    });
    $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.net/lg_my/no_lg.png");
    $(".foot-nav .foot-nav-a2 ").find("img").css("margin-left",".5rem")

}
function mark() {
    jQuery.getJSON('http://my.lotour.com/login/login/islogin?callback=?&' + (new Date()), function (data) {
        if (data.uid > 0) {
            try {
                loginMemberId = data.uid;
                prise.fromMemberId = data.uid;
                $.ajax({
                    url: "http://api.lotour.net/brandhome/Statistics/AddMark",
                    data: {id: newsData.id, userid: data.uid},
                    dataType: "jsonp",
                    type: "POST",
                    success: function (result) {
                    }
                });
            } catch (e) {
            }
        }
        else {
            loginToAction();
        }
    });
}
//introduce
var aList = $('.ind_list').find('li');
function autoPlay() {
    var iNow = 0;
    //上一个
    $('.pre').on('click', function () {
        iNow--;
        if (iNow < 0) {
            iNow = 4;
        }
        console.log(iNow)
        $('.ind_list').css('left', -iNow * $(aList[0]).width() + 10);
    });
    //下一个
    $('.next').on('click', function () {
        iNow++;
        if (iNow > 4) {
            iNow = 0;
            $('.ind_list').css('left', 10);
        }
        console.log(iNow)
        $('.ind_list').css('left', -iNow * $(aList[0]).width() + 10);
    })
};
autoPlay();

//手机版
$('.btnlist').on('click', 'li', function () {
    $('.btnlist li').removeClass('clickon').eq($(this).index()).addClass('clickon');
    $('.ind_list').css('left', -$(this).index() * $(aList[0]).width() + 1);
})
$(".ind_list").on("swipe", "li", function (event, direction) {
    console.log(direction)
})

//通用底展开功能
function FdClk() {
    if ($(window).width() > 768) {
        $('.idx-friend h6').unbind('click').siblings('ul,.button').removeAttr('style');
    } else {
        $('.idx-friend .fl .bb .button').hide();
        $('.idx-friend h6').unbind('click').click(function () {
            $(this).toggleClass('open');
            $(this).siblings('ul').toggle();
            $(this).siblings('.button').toggle();
        });
    }
}

$(function () {
    FdClk();
    var mapurl = $("#bookmap").attr("real");
    $("#bookmap").attr("src", mapurl);
})

//新增效果
$(".foot-nav-a4").on("click", function () {
    $(".fx-bg").css("display", "block");
    $('.wap-share').slideDown();
    return false;
})

$(".bottom-footer .foot-nav-a5").on("click", function () {
    $(".bg").css("display", "block");
    $(".ding-bg-2").css("background", "rgba(0, 0, 0, 0.3)");
    $(".ding-bg .foot-nav-a5").css("display", "block");

    $(".bottom-footer").css("display", "block");
})
$(".bg").on("click", function () {
    $(".bg").css("display", "none");
})



$(" .ding-bg .info .know").on("click", function () {
    $(".bg").css("display", "none");
})
$(".foot-nav-a5").on("click", function () {
    $(".bg").css("display", "block");
})

$("ding-bg-2").on("click", function () {
    $(".bg").css("display", "none");
})

$(".foot-nav-a6").on("click", function () {
    $(".icon_mask").css("display", "block");

})
$(".cancle").on("click", function () {
    $(".icon_mask").css("display", "none");
})
$('.foot-nav-a3').click(function () {
    //    gocomment();
    window.location.href = "http://m.comment.lotour.com/commentList?appId=" + $("#appId").val() + "&appType=" + $("#appType").val() + "&appIdMemberId=" + $("#appMemberId").val();
})

$(".wap-share-con .cancel").on("click", function () {
    $(".wap-share-con").css("display", "none");
})
$(".mask_bg").on("click", function () {
    $(".icon_mask").css("display", "none");
})

$(".wap-share  .cancel").on("click", function () {
    $(".fx-bg").css("display", "none");
    return false;

})

$(".foot-nav-a2").click(function () {
    //$("body,html").css("overflow", "hidden");


    var ishelped = $.cookie('praise-16-' + newsData.id);
    if (ishelped == null) {
        $(".wap-gx-con").css("display", "block");
    } else {
        $(".foot-nav-att").show();
        $(".foot-nav-att").animate({opacity: 1}).animate({opacity: 0}, 2000);
    }
});

$(".wap-gx-con .cancel").click(function () {
    $(".wap-gx-con").css("display", "none");
})
//$(".wap-gx-con").on("click", function () {
//    $(".wap-gx-con").css("top", 0).animate({top: pingmu}, 0).hide();
//    //$("body,html").css("overflow-y", "auto");
//});

$(".wap-gx-con .inb-a-gx").on("click", function () {
        $(".gx1").css("color", "#ff9900");
        $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.com/i-article/gx-hover.png");
        $(".wap-gx-con").hide();

        $(".gx1").text("已感谢");
        $(".gx1").css({"color": "#ff9900"});
        $(".foot-nav-a2 img").css("margin-left", ".1rem");
        $(".wap-gx-con").hide();
        ap.AddPrise();
        return false;
    }
);

$(".wap-gx-con .inb-a-lg").on("click", function () {
    $(".gx1").text("没有启发");
    $(".gx1").css({"width": "1.1rem", "color": "#999"});

    nohelp_m();
    return false;
});
//*分享遮罩*/
var flag = 0;
$(".s3").click(function () {
    flag = 1;
    $(this).find("img").css("visibility", "hidden");
    $(".wx-share-img").show();
})
$(".wx-s-txt").click(function () {
    flag = 0;
    $(".s3").find("img").css("visibility", "visible");

    $(".wx-share-img").hide();
});
document.addEventListener('touchmove', function (event) { 　　 //监听滚动事件
    if (flag == 1) {　　　　　　　　　　　　　　　　　　　　　　　　　　　　//判断是遮罩显示时执行，禁止滚屏
        event.preventDefault();　　　　　　　　　　　　　　　　　　　//最关键的一句，禁止浏览器默认行为
    }
})



$(".wap-gx-con .inb").click(function (event) {
    event.stopPropagation();
});

$(".bg-share-2").on("click", function () {
    $(".wap-gx-con").css("display", "none");
})
$(".wx-share-img").on("click",function(){
    $(this).css("display","none");
    $(".sss .s3 img").css("visibility","visible");

})
//console.log("bg-share");
//$(".wap-share").click(function(){
//    alert(2)
//})
$(".bg-share").on("click",function(){
    $(".fx-bg").css("display","none");

})/**
 * Created by Administrator on 2016/11/7.
 */
/**
 * Created by Administrator on 2016/11/7.
 */
