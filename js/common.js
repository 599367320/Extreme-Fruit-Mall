//$(function (){...})：具备延时加载的作用
$(function() {
    //无缝滚动轮播图 - 面向过程设计
    // var $Ul = $(".main .hot-box .inner .slide-box .hot ul");

    // //右移按钮事件
    // $(".next").click(function() {
    //     //$Ul.is(":animated")：判断当前ul是否在执行动画
    //     if (!$Ul.is(":animated")) {
    //         $Ul.animate({ left: "-1002px" }, 1000, function() {
    //             //appendTo()：在被选元素内部的末尾插入指定内容
    //             $Ul.find("li").eq(0).appendTo($Ul);
    //             $Ul.css("left", 0);
    //         });
    //     }
    // });

    // //左移按钮事件
    // $(".prev").click(function() {
    //     //$Ul.is(":animated")：判断当前ul是否在执行动画
    //     if (!$Ul.is(":animated")) {
    //         //prependTo()：在被选元素内部的开头插入指定内容
    //         $Ul.find("li").last().prependTo($Ul);
    //         $Ul.css("left", "-1002px");
    //         $Ul.animate({ left: 0 }, 1000);
    //     }
    // });

    // //自动轮播
    // var timer = setInterval(function() {
    //     var $Ul = $(".main .hot-box .inner .slide-box .hot ul");
    //     $Ul.animate({ left: "-1002px" }, 1000, function() {
    //         //appendTo()：在被选元素内部的末尾插入指定内容
    //         $Ul.find("li").eq(0).appendTo($Ul);
    //         $Ul.css("left", 0);
    //     });
    // }, 3000);

    // var $SlideBox = $(".main .hot-box .inner .slide-box");
    // //终止自动轮播
    // $SlideBox.mouseover(function() {
    //     clearInterval(timer);
    // });

    // //开启自动轮播
    // $SlideBox.mouseout(function() {
    //     timer = setInterval(function() {
    //         var $Ul = $(".main .hot-box .inner .slide-box .hot ul");
    //         $Ul.animate({ left: "-1002px" }, 1000, function() {
    //             //appendTo()：在被选元素内部的末尾插入指定内容
    //             $Ul.find("li").eq(0).appendTo($Ul);
    //             $Ul.css("left", 0);
    //         });
    //     }, 3000);
    // });

    //无缝滚动轮播图 - 面向对象设计
    var slide = {
        type: true, //是否进行自动轮播
        animate: false, //当前对象是否在执行动画
        timer: null,
        $Ul: $(".main .hot-box .inner .slide-box .hot ul"),
        $Prev: $(".prev"),
        $Next: $(".next"),
        $SlideBox: $(".main .hot-box .inner .slide-box"),

        //初始化函数
        init: function() {
            this.automatic();
            this.stop();
            this.start();
            this.prevEvent();
            this.nextEvent();
        },
        //左移按钮事件
        prevEvent: function() {
            var self = this;
            self.$Prev.click(function() {
                if (!self.animate) {
                    self.animate = true;
                    //prependTo()：在被选元素内部的开头插入指定内容
                    self.$Ul.find("li").last().prependTo(self.$Ul);
                    self.$Ul.css("left", "-1002px");
                    self.$Ul.animate({ left: 0 }, 1000, function() {
                        self.animate = false;
                    });
                }
            });
        },
        //右移按钮事件
        nextEvent: function() {
            var self = this;
            self.$Next.click(function() {
                if (!self.animate) {
                    self.animate = true;
                    self.$Ul.animate({ left: "-1002px" }, 1000, function() {
                        //appendTo()：在被选元素内部的末尾插入指定内容
                        self.$Ul.find("li").eq(0).appendTo(self.$Ul);
                        self.$Ul.css("left", 0);
                        self.animate = false;
                    });
                }
            });
        },
        //自动轮播
        automatic: function() {
            self = this;
            self.timer = setInterval(function() {
                if (self.type && !self.animate) {
                    self.animate = true;
                    self.$Ul.animate({ left: "-1002px" }, 1000, function() {
                        //appendTo()：在被选元素内部的末尾插入指定内容
                        self.$Ul.find("li").eq(0).appendTo(self.$Ul);
                        self.$Ul.css("left", 0);
                        self.animate = false;
                    });
                }
            }, 3000);
        },
        //停止轮播
        stop: function() {
            var self = this;
            self.$SlideBox.mouseover(function() {
                self.type = false;
            });
        },
        //开启轮播
        start: function() {
            self = this;
            self.$SlideBox.mouseout(function() {
                self.type = true;
            });
        }
    }

    slide.init(); //启动轮播图

    //点击加载更多
    var indexNum = 0; //记录请求的次数
    $(".more-btn").click(function() {
        var self = $(this);
        self.html("正在加载中...").addClass("loading");
        $.ajax({
            type: "POST",
            url: "json/json4.js",
            dataType: "json",
            success: function(data) {
                if (indexNum < data.length) {
                    var info = data[indexNum];
                    var template = "";
                    $.each(info, function(index, value) {
                        template += `
                        <li>
                            <a href="#">
                                <img src="${value.img}" alt="">
                                <div class="info">
                                    <p class="name">${value.text}</span></p>
                                    <div class="fix">
                                        <span class="left price">${value.price}</span>
                                        <p class="right">
                                            <span class="xin">3</span>
                                            <span class="look">3</span>
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    `
                    });
                    self.parent().prev().append(template);
                    self.html("点击加载更多").removeClass("loading");
                    indexNum++;
                } else {
                    var dom = '<span title="没有更多了..." class="icon iconfont icon-meijieguo"></span>'
                    self.parent().html(dom);
                }
            }
        });
    });

    //悬浮按钮 - 返回顶部
    // $(window).scroll(function() {
    //     var h = $(window).scrollTop(); //滚动条向下滚动的距离
    //     if (h > 500) {
    //         $(".back-top").show();
    //     } else {
    //         $(".back-top").hide();
    //     }
    // });

    // $(".back-top").click(function() {
    //     $("html, body").animate({ scrollTop: 0 }, 500);
    // });

    $(".back-top").backBtn({
        position: "right",
        scrollTop: 500,
        offset: 50,
        // isBack: false
    });
});

//注册插件
(function($) {
    //扩展工具方法
    $.fn.extend({
        "backBtn": function(options) {
            // 参数要求：
            // {
            //     isBack: true, //可选参数 默认值：true 表示是否返回顶部
            //     ifShow: false, //可选参数 默认值：false 表示按钮是否显示
            //     scrollTop: 0, //可选参数 默认值：0 表示滚动条滚动距离超过时多少出现按钮
            //     position: "left", //可选参数 默认值：left 表示按钮在内容区域的位置
            //     width: 1000, //可选参数 默认值：1000 表示当前网页内容区域的宽度
            //     offset: 0, //可选参数 默认值：0 表示按钮距离网页内容区域的距离
            //     speed: 500, //可选参数 默认值：500 表示按钮实现效果需要的时间，即滚动的速度
            //     bottom: 100, //可选参数 默认值：100 表示按钮距离页面底部的距离
            // }

            //参数的默认值
            var obj = {
                isBack: true,
                ifShow: false,
                scrollTop: 0,
                position: "left",
                width: 1000,
                offset: 0,
                speed: 500,
                bottom: 100
            }

            //浅层克隆 整合参数列表
            var ops = $.extend(obj, options);

            var $Win = $(window);
            var $Dom = $(this);

            //功能方法集合：1、获取需要使用的值 2、设置相应的值 3、实现对应的功能
            var funs = {
                //初始化
                init: function() {
                    this.setPosition();
                    //当调整浏览器窗口大小时，触发resize事件
                    $Win.resize(function name(params) {
                        funs.setPosition();
                    });
                    //监听滚动条
                    $Win.scroll(function() {
                        if ($Win.scrollTop() > ops.scrollTop) {
                            $(".back-top").show();
                        } else {
                            $(".back-top").hide();
                        }
                    });
                    //绑定事件
                    $Dom.on("click", function() {
                        if (ops.isBack) {
                            $("html, body").animate({ scrollTop: 0 }, ops.speed);
                        }
                    });
                    if (ops.ifShow) {
                        $(".back-top").show();
                    } else {
                        $(".back-top").hide();
                    }
                },
                //计算按钮需要的left值
                getLeft: function() {
                    var left = null;
                    var wWidth = $Win.width(); //当前窗口的宽度

                    // width()：设置或返回元素的宽度
                    // height()：设置或返回元素的高度
                    // innerWidth()：返回元素的宽度（padding）
                    // innerHeight()：返回元素的高度（padding）
                    // outerWidth()：返回元素的宽度（padding + border）
                    // outerWidth(true)：返回元素的宽度（padding + border + margin）
                    // outerHeight()：返回元素的高度（padding + border）

                    var dWidth = $Dom.outerWidth(); //元素自身的宽度
                    if (ops.position == "left") {
                        //left = 页面侧边空白区域 - 按钮自身宽度 - ops.offest
                        left = (wWidth - ops.width) / 2 - dWidth - ops.offset;
                    } else if (ops.position = "right") {
                        //left = 页面侧边空白区域 + 页面内容区域宽度 + ops.offest
                        left = (wWidth - ops.width) / 2 + ops.width + ops.offset;
                    }
                    return left;
                },
                //计算按钮需要的top值
                getTop: function() {
                    var top = null;
                    var wHeight = $Win.height(); //当前窗口的高度
                    var dHeight = $Dom.outerHeight(); //元素自身的高度

                    top = wHeight - dHeight - ops.bottom;
                    return top;
                },
                //设置按钮的位置
                setPosition: function() {
                    var left = this.getLeft();
                    var top = this.getTop();
                    $Dom.css({
                        left: left + "px",
                        top: top + "px"
                    });
                }
            }

            funs.init(); //调用初始函数

            return $Dom;
        }
    });
}(jQuery));