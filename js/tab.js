//选项卡功能
$(function() {
    //面向过程
    // $(".tab-nav li").on("click", function() {
    //     var index = $(this).index(); //获取当前a标签的索引值
    //     $(this).addClass("active").siblings().removeClass("active");
    //     //$.siblings()：获取当前元素的其它兄弟节点
    //     $(".tab-box .box").eq(index).addClass("show").siblings().removeClass("show");
    // });

    //插件封装
    $.fn.extend({
        "tab": function(options) {
            //默认参数
            var obj = {
                evenType: "click", //事件类型
                liCurClass: "active", //li选中的class
                divCurClass: "show", //div选中的class                
            }

            var $Dom = $(this);

            //浅层克隆 整合参数列表
            var ops = $.extend(obj, options);

            //选项卡的导航容器结构必须为：.tab-nav > li
            var $TabNav = $(".tab-nav li");
            //选项卡的内容结构必须为：.tab-box > .box
            var $TabBox = $(".tab-box .box");

            //容错
            if ($TabNav.length != $TabBox.length) {
                throw "选项卡导航区域的数量与内容区域的数量不对应！"
            }

            $TabNav.on(ops.evenType, function() {
                var index = $(this).index(); //获取当前a标签的索引值
                $(this).addClass(ops.liCurClass).siblings().removeClass(ops.liCurClass);
                //$.siblings()：获取当前元素的其它兄弟节点
                $TabBox.eq(index).addClass(ops.divCurClass).siblings().removeClass(ops.divCurClass);
            });

            return $Dom;
        }
    });

    $(".main").tab();
});