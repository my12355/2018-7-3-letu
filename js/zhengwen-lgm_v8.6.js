/**
 * Created by Administrator on 2016/9/22.
 */
//����΢��Js����
var wappId, wtimestamp, wnonceStr, wsignature;
$(document).ready(function () {
    var nowurl = location.href.split('#')[0];
    $.ajax({
        type: "GET",
        async: false, //false ��ͬ�� ��true���첽
        dataType: 'jsonp',
        jsonp: 'callback',
        url: "http://wx.lotour.com/WxCommon/WxAPI.ashx",
        data: { curl: nowurl },
        success: function (data) {
            wappId = data.appId;
            wtimestamp = data.timestamp;
            wnonceStr = data.nonceStr;
            wsignature = data.signature;

            wx.config({
                debug: false, // ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���alert��������Ҫ�鿴����Ĳ�����������pc�˴򿪣�������Ϣ��ͨ��log���������pc��ʱ�Ż��ӡ��
                appId: wappId, // ������ںŵ�Ψһ��ʶ
                timestamp: wtimestamp, // �������ǩ����ʱ���
                nonceStr: wnonceStr, // �������ǩ���������
                signature: wsignature, // ���ǩ��������¼1
                jsApiList: ["startRecord", "hideMenuItems", "scanQRCode", "hideOptionMenu", "showMenuItems", "showOptionMenu", "showAllNonBaseMenuItem", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "closeWindow", "uploadImage", "chooseImage", "stopRecord"] // �����Ҫʹ�õ�JS�ӿ��б�����JS�ӿ��б����¼2
            });

        },
        error: function () {
            alert("error");
        }
    });
    setShareInfo({
        title:title, // �������
        summary:desc, // ��������
        pic:imgUrl, // ����ͼƬ
        url:link
    });
    //��������
    wx.ready(function () {
        //��������Ȧ
        wx.onMenuShareTimeline({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                ShareCount("wx");
            }
        });
        //���������
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                ShareCount("wx");
            }
        });
        //����qq
        wx.onMenuShareQQ({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                ShareCount("wx");
            }
        });
        //������Ѷ΢��
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

//�����̶�
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

//����Ķ�
function relRead() {
    $('.idx-brand ul li .item').hover(function () {
            if ($(this).find('p').length < 0) { return false }
            $(this).stop().animate({
                    'bottom': 0
                },
                300)
        },
        function () {
            if ($(this).find('p').length < 0) { return false }
            $(this).stop().animate({
                    'bottom': -28
                },
                500)
        });
}
var loginMemberId = 0;
function priseFun(data) {
    prise.fromMemberId = data.memberId;
    ap.AddPrise();
}

//20151222mobile�ֻ��˷��ء�������ת����------Start
function goback() {
    var home = 'http://m.lotour.com';
    (document.referrer == '' || document.referrer == null || document.referrer.indexOf('m.lotour.com') > -1) ? window.location.href = home : window.history.go(-1);
}
function gocomment() {
    //$('body,html').animate({ 'scrollTop': $("#commentsite").offset().top - 50 });
    window.location.href = "http://m.comment.lotour.com/commentList?appId=" + $("#appId").val() + "&appType=" + $("#appType").val() + "&appIdMemberId=" + $("#appMemberId").val();
}
//20151222mobile�ֻ��˷��ء�������ת����------End

$(function () {
    $.getJSON("http://www.lotour.com/app/UpdateBrowse?id=" + newsData.id + "&type=1&userId=" + userid + "&isPc=false&callback=?", function (data) {
        if (data.CountBrowse <= 1) {
            $("<div class=\"wx-share\"><p class=\"wx-name\"><span  class=\"share1\"><strong class=\"fx-name\">" + decodeURIComponent(data.NickName) + "</strong>�������ƪ���£���û�к��ѿ�����</span><span class=\"wx-fx\">�����<span>����Ȧ</span>�ɣ�<img src=\"http://img1.lotour.com/i-article/imgs/share-line.png\" width=\"42\" height=\"36\" /></span></p></div>").insertBefore(".ia-banner");
        }
        else if (data.CountBrowse <= 100) {
            $("<div class=\"wx-share1\"><p class=\"wx-name2\"><span><strong class=\"fx-name\">" + decodeURIComponent(data.NickName) + "</strong>�������ƪ���£�������<strong>" + data.CountBrowse + "</strong>λ���ѹ�ע��սʤ��<strong>" + data.Win + "</strong>λ�����û�����������~</span></p><p class=\"wx-yingx\"><a href=\"" + newsData.Dwz + "\" target=\"_blank\" title=\"\"  class=\"chuangj\">�����ҵ�Ӱ����</a></p></div>").insertBefore(".ia-banner");
        }
        else {
            $("<div class=\"wx-share2\"><p class=\"wx-name2\"><span><i><img src=\"http://img1.lotour.com/i-article/imgs/" + (data.Sex == 2 ? "wo" : "") + "men.png\" width=\"76\" height=\"26\"></i><strong class=\"fx-name\">" + decodeURIComponent(data.NickName) + "</strong>�������ƪ���£�������<strong>" + data.CountBrowse + "</strong>λ���ѹ�ע��սʤ��<strong>" + data.Win + "</strong>λ�����û���̫�����ˣ�</span></p><p class=\"wx-yingx\"><a href=\"" + newsData.Dwz + "\" target=\"_blank\" title=\"\" class=\"chuangj\">�����ҵ�Ӱ����</a></p></div>").insertBefore(".ia-banner");
        }
    });

    $('.ia-text img[original]').each(function (i, e) {
        $(e).attr("original", $(e).attr("original").replace(/_910/i, "_690"));
    });
    relRead();
    topFix();
    praise();


    if ($(".foot-nav-a3 .num").text() == "0") {
        $(".foot-nav-a3 .num").hide();
    } else {
        $(".foot-nav-a3 .num").show();
    }
    $('.foot-nav-a3').click(function () {
        gocomment();
    })
    //20150923mobile�ֻ��˶�����-----End

    //��+1
    function praise() {
        $('.articleZanBtn').click(function () {
            ap.AddPrise();
        })

        //20150923mobile�ֻ��˵���-----Start
        //$('.foot-nav-a2').click(function () {
        //    ap_mobile.AddPrise();
        //})
        //20150923mobile�ֻ��˵���-----End

    }

    $.ajaxSettings.async = false;
    $.getJSON('http://my.lotour.com/login/login/islogin?callback=?&' + (new Date()), function (data) {
        if (data.uid > 0) {
            try {
                loginMemberId = data.uid;
            } catch (e) { }
        }
        chsubscribedzw();
    });
    if (authorinfo.id == 241 || authorinfo.id == 239 || authorinfo.id == 238 || authorinfo.id == 85) {
        var authorStr = '<a title="" target="_blank" href="http://zhuanlan.lotour.com/' + authorinfo.id + '">' + authorinfo.nickName + '</a>';
        $(".mianze").html("<span>&copy;��Ȩ������</span>����ϵ" + authorStr + " ��Ȩ��;���������ҷ�������ת�أ�Υ�߽�����׷���������Ρ�") ;
    }
    else {
        if (authorinfo.atype == 1) {
            var authorStr = '<a title="" target="_blank" href="http://zhuanlan.lotour.com/' + authorinfo.id + '">' + authorinfo.nickName + '</a>';
            switch (authorinfo.category) {
                case 1:
                    authorStr = 'ý��ר��' + authorStr;
                    break;
                case 3:
                case 4:
                    authorStr = '���ξ�ר��' + authorStr;
                    break;
                case 5:
                    authorStr = '��ĩר��' + authorStr;
                    break;
                default:
                    authorStr = '��;������м�' + authorStr;
                    break;
            }
            if (authorinfo.category == 5) {
                $(".mianze").html("<span>&copy;��Ȩ������</span>����ϵԭ�����ߺ���;��������ͬ���У�����ת�أ�Υ�߽�����׷���������Ρ�");
            } else {
                $(".mianze").html("<span>&copy;��Ȩ������</span>����ϵ������Ȩ��;�����������κ�ת�ؾ���ȡ��������Ȩ����ת��ʱ��ע�������Դ������;��������" + authorStr + "����Υ�߽�����׷�����Ρ�");
            }
            if (authorinfo.category == 0 && newsData.IsOrigin == 1) {
                $.ajax({
                    cache: false,
                    type: "GET",
                    url: "http://api.lotour.net/brandhome/columnwriter/BQYData",
                    dataType: "jsonp",
                    data: { "id": newsData.id },
                    success: function (data) {
                        if (data != null && parseInt(data.Price) >= 0) {
                            switch (parseInt(data.Price)) {
                                case 0:
                                    $(".mianze").html('<span>&copy;��Ȩ������</span>����ϵ������Ȩ��;�����������κ�ת�ؾ���ȡ����Ȩ�����ת�أ���ת��ʱ��ע�������Դ��"��;��������' + authorStr + '"��Υ�߽�����׷�����Ρ�');
                                    $(".mianze").append('<div class="zhuanzai-price"><a href="http://www.banquanyin.com/' + data.Bid + '" target="_blank">��ȡ��Ȩ</a></div>');
                                    break;
                                case 5000:
                                    $(".mianze").html('<span>&copy;��Ȩ������</span>����ϵ' + authorStr + '��Ȩ��;���������ҷ�������ת�أ�Υ�߽�����׷���������Ρ�');
                                    break;
                                default:
                                    $(".mianze").html('<span>&copy;��Ȩ������</span>����ϵ������Ȩ��;�����������κ�ת�ؾ���ȡ����Ȩ��<em>ת�ؼ۸�' + data.Price + 'Ԫ/ƪ</em>��ת��ʱ��ע�������Դ��"��;��������' + authorStr + '"��Υ�߽�����׷�����Ρ�');
                                    $(".mianze").append('<div class="zhuanzai-price"><a href="http://www.banquanyin.com/' + data.Bid + '" target="_blank">��ȡ��Ȩ</a></div>');
                                    break;
                            }
                        }
                    }
                });
            }
        }
        else {
            $(".mianze").html('<span>&copy;��Ȩ������</span>����ϵ������Ȩ��;�����������κ�ת�ؾ���ȡ��������Ȩ����ת��ʱ��ע�������Դ��"��;����������;������м�' + authorinfo.nickName + '��Υ�߽�����׷�����Ρ�');
        }
    }

    $.ajax({
        cache: false,
        type: "GET",
        url: "http://api.lotour.net/pv/SelectPv",
        dataType: "jsonp",
        data: { "id": newsData.id, "regionId": newsData.regionid },
        success: function (data) {
            if (data != null) {
                $(".ia-num-like").html(data.pageview);
            }
        }
    });
    $('.ia-text img[original]').lazyload({
        effect: "fadeIn"
    });
    $('img[original]:not(.ia-text img[original])').lazyload({
        effect: "fadeIn"
    });

    $.getJSON("http://api.lotour.net/pv/SelectPvs?ids=" + Recomids() + "&callback=?", function (data) {
        $.each(data, function (i, val) {
            var pv = val.pageview;
            if (pv >= 10000) {
                pv = Math.round(pv / 10000 * 10) / 10 + "��";
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

    $.getScript('http://stats.lotour.com/behavior2/statsv3.js?t=' + new Date().getTime());
});
$(function () {
    //
    // var pingmu = window.innerHeight;
    $(".foot-nav-a4").click(function () {
        //$("body,html").css("overflow", "hidden");
        $(".wap-share-con").show();
        $(".wap-gx-con").hide();
    });
    $(".wap-share-con").click(function () {
        $(".wap-share-con").hide();
        //$("body,html").css("overflow-y", "auto");
    });
    $(".wap-share-con .inb").click(function (event) {
        event.stopPropagation();
    });
    //
    //  var pingmu = window.innerHeight;
    $(".foot-nav-a2").click(function () {
        //$("body,html").css("overflow", "hidden");
        var ishelped = $.cookie('praise-16-' + newsData.id);
        if (ishelped == null){
            $(".wap-gx-con").css("display", "block");
        }else{
            $(".foot-nav-att").show();
            $(".foot-nav-att").animate({opacity:1}).animate({opacity:0},2000);
        }
    });
    $(".wap-gx-con").on("click",function () {
        $(".wap-gx-con").hide();
        //$("body,html").css("overflow-y", "auto");
    });

    $(".wap-gx-con .inb-a-gx").on("click",function(){
        $(".gx1").css("color","#ff9900");
        $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.com/i-article/gx-hover.png").css({"width":".58rem","height":".41rem","margin-top":"0"});
        $(".wap-gx-con").hide();
        $(".foot-nav-a2").find("span").text("��л");
        ap.AddPrise();
        return false;
    });
    $(".wap-gx-con .inb-a-lg").on("click",function(){
        nohelp_m();
        $(".wap-gx-con").hide();
        $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.com/i-article/y-myqf2.png").css({"width":".57rem","height":".47rem","margin-top":"-.05rem"});
        $(".foot-nav-a2").find("span").text("û������");
        return false;
    });
    $(".wap-gx-con .inb").click(function (event) {
        event.stopPropagation();
    });
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
    var isupdate = true;
    //���ظ���
    $(document).scroll(function() {
        var vheight = $(".text-height").height();
        var vhbox = $(".height-box").height();
        if(vheight<=5000){
            $(".ia-more").hide();
            $(".height-box").css("height","auto");
        }else{
            $(".ia-more .l-things").unbind('click').click(function(){
                $(".height-box").css("height","auto");
                $(".ia-more").hide();
            });
        }
        if(vheight<vhbox){
            $(".ia-more").hide();
            $(".height-box").css("height","auto");
        }
        if(isupdate) {
            $.ajax({
                cache: false,
                type: "GET",
                url: "http://api.lotour.net/pv/UpdatePv",
                dataType: "jsonp",
                data: { "id": newsData.id },
                success: function (data) {
                }
            });
            isupdate = false;
        }
    });
    $('.vr-vedio .vr,.pt-vedio .pt').find('p').prepend('�������');
});

//����
var prise = { articalId: newsData.id,articalType: 16, articalMemberId: 0 }
var ap = new Prise(prise, sucDianZan, areadyDianZan, errDianZan);
var ap_mobile = new Prise(prise, sucDianZan_m, areadyDianZan_m, errDianZan);//20150923mobile�ֻ��˵��޶�����
var ag = new PriseGet(newsData.id, 16, sucAgDianZan, errDianZan);
ag.GetPrise();
function sucDianZan() {
    var _this = $('.articleZanBtn');
    var _num = _this.find('.praiseNum');
    var _text = _this.find('.number');
    var _number = parseInt(_this.find('.number').text());
    if (!_this.hasClass('cur') && !_num.is(":animated")) {
        _num.show();
        _num.stop().animate({ "top": "-40px", "opacity": 0 }, 1000, function () {
            _text.text(_number + 1);
            $(".ia-num-zan").html(_number + 1);
            $("#mZanNumber").html(_number + 1).show();
            _this.addClass('cur');
            _num.css({ "top": 0, "display": "none", "opacity": 1, "flter": "Alpha(Opacity=1)" });
        });
    }
}

//20150923mobile�ֻ��˵���Ч��-----Start
function sucDianZan_m() {
    //����Ч��
    $(".foot-nav-a2").find("em").addClass("yidian");
    $(".foot-nav-a2").find("p").hide();
    $(".foot-nav-a2").find("em").show().animate({ "top": "-40px", "opacity": 0 }, 500);
    $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.com/i-article/gx-hover.png");
    var num = $("#mZanNumber").html().replace(/[^0-9]/ig, "");
    num =isNaN(num)?1: parseInt(num) + 1;
    $("#spZanNumber").html(num);
    $(".ia-num-zan").html(num);
    $("#mZanNumber").html(num).show();
}
function areadyDianZan() {
    $("#zanedLayer").show();
    setTimeout(function () { $("#zanedLayer").fadeOut("slow") }, 1000);
}
function areadyDianZan_m() {
    //�ѵ���Ч��
    $(".foot-nav-a2").find("p").fadeIn().fadeOut(500);
    //$(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.net/i-article/foot-fix-2-on.png");
}
//20150923mobile�ֻ��˵���Ч��-----End
function errDianZan() {}
function sucAgDianZan(n) {
    $("#spZanNumber").html(n);
    $(".ia-num-zan").html(n);
    if(n>0)
    {
        $("#mZanNumber").html(n).show();
    }
    else{
        $("#mZanNumber").html(0).hide();
    }
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
        var pop_url = 'http://service.weibo.com/share/share.php?appkey=2861886718&title=' + encodeURIComponent("�������ȥ���ߣ������Ϊ��������磡" + title + "@��;�������ٷ�΢��") + '&url=' + encodeURIComponent(url) + "&picture_search=false&pic=" + encodeURIComponent(contentpic);
        return "window.open('" + pop_url + "', '_blank', 'scrollbars=no,width=600,height=480,left=75,top=20,status=no,resizable=yes');";
    } else if (from == 'qz') {
        var pop_url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + encodeURIComponent(title + "@��;������") + '&url=' + encodeURIComponent(url) + "&pics=" + contentpic;
        return "window.open('" + pop_url + "', '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');";
    } else if (from == 'qt') {
        var pop_url = 'http://share.v.t.qq.com/index.php?c=share&a=index&title=' + encodeURIComponent("�������ȥ���ߣ������Ϊ��������磡" + title + "@��;������") + '&url=' + encodeURIComponent(url) + '&appkey=100317561&pic=' + encodeURIComponent(contentpic);
        return "window.open('" + pop_url + "', '_blank', 'scrollbars=no,width=700,height=680,left=75,top=20,status=no,resizable=no,menubar=no,toolbar=no,scrollbars=no,location=yes');";
    }
    else if (from == 'db') {
        var pop_url = 'http://www.douban.com/share/service?image=' + encodeURIComponent(pic) + '&amp;href=' + encodeURIComponent(url) + '?aaaa&amp;name=' + encodeURIComponent(title) + '&amp;text=';
        return "window.open('" + pop_url + "', '_blank', 'scrollbars=no,width=700,height=680,left=75,top=20,status=no,resizable=no,menubar=no,toolbar=no,scrollbars=no,location=yes');";
    }

}
function ShareCount(shareType) {
    $.post("http://api.lotour.net/brandhome/Statistics/ShareCount",
        { articalType: 1, articalId: newsData.id, shareType: shareType },
        function (data) { }, "jsonp");
    return true;
}
function getContentPic(c) {
    var mContent = $(".ia-text").find("img");
    var cPic = '';
    var n=Math.min(mContent.length,15);
    for (var i = 0; i < n; i++) {
        if (i != 0) {
            cPic = cPic + c;
        }
        cPic = cPic + $(mContent[i]).attr("original");
    }
    return cPic;
}

function FocusCount(l, m) {
    if(l==1){
        _gaq.push(['_trackPageview', '/PageAction/zhengwen/' + m]);
        clickDataCount('zhengwen',m);
    }
    return true;
}

if($(".ind_list li").length <= 1){
    $("._pre").hide();
    $("._next").hide();
}


//20151216mobile�ֻ���new-----Start
//����Ϊ0����ʾ
//function foota3(){
//    var span = $('.foot-nav-a3 span')
//    span.text()==0 && span.hide() || span.show();
//}
//foota3();

//�ֻ��˻���Ч��
function touchFix(){
    var beginY,moveY,moveYold;
    $(document).on('touchstart',function(e){
        //event.preventDefault();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            beginY=touch.pageY;
            $(this).stop(true,false);
        }
    })
    $(document).on('touchmove',function(e){
        //event.preventDefault();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            moveY=touch.pageY;
            if(beginY - moveY<=0){
                $('.bottom-footer').addClass("foot-nav");
            }else if(beginY - moveY>0){
                //  var pingmu = window.innerHeight;
                $('.bottom-footer').removeClass("foot-nav");
                $(".wap-share-con").css("top", 0).hide();
                $(".wap-gx-con").css("top", 0).hide();
            }
        }
    })
}
touchFix();

//20151216mobile�ֻ���new-----End
function nohelp_m() {
    var ishelped = $.cookie('praise-16-' + newsData.id);
    if (ishelped != null) {
        $(".gx1").css("color","#b4b4b4");
        $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.com/i-article/y-gx2.png");
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
                    data: { id: newsData.id },
                    dataType: "jsonp",
                    type: "POST",
                    success: function (result) {
                        $(".gx1").css("color","#b4b4b4");
                        $(".foot-nav-a2").find("img").attr("src", "http://img1.lotour.com/i-article/y-gx2.png");
                        $(".wap-gx-con").hide();
                    }
                });
            } catch (e) { }
        }
        else {
//            loginToAction();
        }
    });
}
function mark() {
    jQuery.getJSON('http://my.lotour.com/login/login/islogin?callback=?&' + (new Date()), function (data) {
        if (data.uid > 0) {
            try {
                loginMemberId = data.uid;
                prise.fromMemberId = data.uid;
                $.ajax({
                    url: "http://api.lotour.net/brandhome/Statistics/AddMark",
                    data: { id: newsData.id,userid: data.uid},
                    dataType: "jsonp",
                    type: "POST",
                    success: function (result) {
                    }
                });
            } catch (e) { }
        }
        else {
            loginToAction();
        }
    });
}
//introduce
var aList=$('.ind_list').find('li');
function autoPlay(){
    var iNow=0;
    //��һ��
    $('.pre').on('click',function(){
        iNow--;
        if(iNow<0){
            iNow=4;
        }
        console.log(iNow)
        $('.ind_list').css('left',-iNow*$(aList[0]).width()+10);
    });
    //��һ��
    $('.next').on('click',function(){
        iNow++;
        if(iNow>4){
            iNow=0;
            $('.ind_list').css('left',10);
        }
        console.log(iNow)
        $('.ind_list').css('left',-iNow*$(aList[0]).width()+10);
    })
};
autoPlay();
FdClk();

//console.log($(".swiper-wrapper").children().length);
if($(".swiper-wrapper").children().length <= 1){
    $(".swiper-pagination").hide();
    $(".swiper-wrapper").children().css('text-align','center');
}

//�ֻ���
$('.btnlist').on('click','li',function(){
    $('.btnlist li').removeClass('clickon').eq($(this).index()).addClass('clickon');
    $('.ind_list').css('left',-$(this).index()*$(aList[0]).width()+1);
})
$(".ind_list").on("swipe","li",function(event,direction){
    console.log(direction)
})

var mySwiper = new Swiper('.swiper-container',{
    pagination : '.swiper-pagination',
    loop: true,
    click: true
//pagination : '#swiper-pagination1',
})


function FdClk(){
    if($(window).width()>768){
        $('.idx-friend h6').unbind('click').siblings('ul,.button').removeAttr('style');
    }else{
        $('.idx-friend .fl .bb .button').hide();
        $('.idx-friend h6').unbind('click').click(function () {
            $(this).toggleClass('open');
            $(this).siblings('ul').toggle();
            $(this).siblings('.button').toggle();
        });
    }
}
//������������

$(function () {
    $('.wap-menu-left').click(function(){
        if($(this).hasClass('wap-menu-left2')){
            $(this).removeClass('wap-menu-left2');
            $('.idx-srh-layer3,.idx-srh-layer4').fadeOut();
            $('body').css('overflow','auto');
            $(".bdall").show();
        }else{
            $('.idx-srh-layer4').fadeIn();
            if($('.tea-sin').height()>30){
                $('.tea-name').css('margin-top','-0.1rem');
            }else if($('.tea-sin').height()>15&&$('.tea-sin').height()<=30){
                $('.tea-name').css('margin-top','0.05rem');
            }else{
                $('.tea-name').css('margin-top','0.15rem');
            }
            //  $('.tab-tit').addClass('clearfix');
            $('body').css('overflow','hidden');
            $("header,.bdall").hide();
        }
        return false;
    })
});

$(function () {
    $.ajax({
        type: "get",
        cache: false,
        url: "http://fw1.lotour.com/i/Detail/Comment/JCommentList",
        data: {"id":newsData.id,"appType":16, "pageSize": 3, "currentPage": 1 },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            if (data.length > 0) {
                $('#commentsite .comment_wrap').empty();
                $.each(data,function(i,e){
                    $('#commentsite .comment_wrap').append(GetComment(e));
                })
                $('#commentsite').show();
                $(".comment_wrap li").eq(data.length-1).find(".com_wrap").css('border','none');
            }
        }
    })
})

function GetComment(comment){
    var str = [];
    str.push('<li class="com_li">');
    str.push('<div class="tx_wrap">');
    str.push('<span class="tx">');
    if (comment.MemberType == 0) {
        str.push('<a href="javascript:;"><img src="http://img.lotour.net/UserPhoto/'+comment.MemberPhoto+'" alt=""/></a>');
    }
    else if (comment.MemberType == 1) {
        str.push('<a href="javascript:;"><img src="'+comment.MemberPhoto+'" alt=""/></a>');
    }
    str.push('</span></div>');
    str.push('<div class="com_wrap">');
    str.push('<div class="com_top"><span class="top_lf re_name"><a href="javascript:;">'+comment.MemberName+'</a></span>');
    var re = new RegExp('\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/');
    var r=comment.AddTime.match(re);
    var datestamp = parseInt(r);
    var timestamp = parseInt(new Date().getTime()/1000);
    var date = r ? new Date(((r[1] || '') + r[2]) * 1) : null;
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    if(timestamp-datestamp<=300){
        str.push('<span class="time">�ո�</span>');
    }
    else if(y==new Date().getYear() && m==(new Date().getMonth()+1) && d==new Date().getDate()){
        str.push('<span class="time">����</span>');
    }
    else{
        str.push('<span class="time">'+y+'-'+m+'-'+d+'</span>');
    }
    str.push('</div><div class="com_bottom">');
    if(comment.ActionType==7 || comment.ActionType==11){
        str.push('<span><img src="'+comment.AppPicUrl+'" style="width: 80%;"/></span>');
    }
    str.push('<p>'+comment.Content+'</p>');
    if(comment.FId>0){
        str.push('<div class="resplay_wrap">');
        str.push('<span class="to_name c-33">'+comment.FMemberName+'��</span>');
        str.push('<span class="c-33">'+comment.FContent+'</span>');
        str.push('</div>');
    }
    str.push('</div></div></li>');
    return str.join("");
}
$(function() {
    //���"����"
    $(".dingy_btn").on("click",function(){
        subscribedzw();
    })
    //���"�Ѷ���"
    $(".ydingy_btn").on("click",function(){
        $(".mc2").show();
    })

    //���"ȡ����ע"
    $(".cancelBtn").on("click",function(){
        Consolesubscribedzw();
    });
    //���"�����"
    $(".wrongBtn").on("click",function(){
        $(".mc2").hide();
    });

    //���"mc"
    $(".mc2").on("click",function(){
        $(".mc2").hide();
    })
    $(".mc2").on("touchmove",function(){
        $(".mc2").hide();
    })
})
function chsubscribedzw(){
    $(".dingy_btn").show();
    $(".ydingy_btn").hide();
    if (typeof loginMemberId != "undefined" && loginMemberId > 0) {
        jQuery.ajax({
            url: "http://api.lotour.net/brandhome/Statistics/getSubscribeZL",
            data: { zlid: authorinfo.id, userid: loginMemberId },
            dataType: "jsonp",
            type: "POST",
            success: function (result) {
                if (result.subscribed > 0) {
                    $(".dingy_btn").hide();
                    $(".ydingy_btn").show();
                }
            }
        });
    }
}
function subscribedzw(){
    if (typeof loginMemberId != "undefined" && loginMemberId > 0) {
        jQuery.ajax({
            url: "http://api.lotour.net/brandhome/Statistics/SubscribeZL",
            data: { zlid: authorinfo.id, userid: loginMemberId },
            dataType: "jsonp",
            type: "POST",
            success: function (result) {
                if (result.status > 0) {
                    $(".dingy_btn").hide();
                    $(".ydingy_btn").show();
                }
            }
        });
    }
    else{
        window.location.href = "http://m.passport.lotour.com/mregist.html?ReturnUrl=" + location.href;
    }
}
function Consolesubscribedzw() {
    if (typeof loginMemberId != "undefined" && loginMemberId > 0) {
        jQuery.ajax({
            url: "http://api.lotour.net/brandhome/Statistics/ConsoleSubscribeZL",
            data: { zlid: authorinfo.id, userid: loginMemberId },
            dataType: "jsonp",
            type: "POST",
            success: function (result) {
                if (result.status > 0) {
                    $(".mc2").hide();
                    $(".dingy_btn").show();
                    $(".ydingy_btn").hide();
                }
            }
        });
    }
    else{
        window.location.href = "http://m.passport.lotour.com/mregist.html?ReturnUrl=" + location.href;
    }
}
/**
 * Created by Administrator on 2016/11/7.
 */