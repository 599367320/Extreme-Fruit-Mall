//类瀑布流加载图片
$(function() {
    var load = false; //判断当前是否可以加载图片 默认可以
    var mark = null; //记录前一次选项卡的索引值

    //请求数据的url和对应的请求次数
    var arrs = [
        { url: "../try/json/all.js", num: 0 },
        { url: "../try/json/apply.js", num: 0 },
        { url: "../try/json/try.js", num: 0 },
        { url: "../try/json/end.js", num: 0 }
    ];
    $(window).scroll(function() {
        if (load) return;
        //滚动条的高度 + 当前窗口的高度 + 页面页脚的高度 = 当前网页的高度
        var H = $("body").height(); //当前网页的高度
        var wh = $(this).height(); //当前窗口的高度
        var fh = $(".footer").height(); //页面页脚的高度
        var top = $(window).scrollTop(); //滚动条的高度

        if (top >= H - wh - fh) {
            load = true;
            var index = $(".tab-box .show").index(); //获取当前选中的选项卡索引
            mark = mark === null ? index : mark;

            $.ajax({
                type: "POST",
                url: arrs[index].url,
                dataType: "json",
                success: function(data) {
                    if (mark != index) {
                        $(".tab-box .box").eq(mark).children("a, span").each(function(index, ele) {
                            if (index >= 8) {
                                ele.remove();
                            }
                        }).eq(mark).children("span").html();
                        arrs[mark].num = 0; //清空前一次选项卡对应的num
                        mark = index;
                    }
                    if (arrs[index].num < data.length) {
                        var info = data[arrs[index].num];
                        var template = "";
                        $.each(info, function(index, value) {
                            template += `
                            <a href="" class="con">
                                <span class="top-tip sf">首发</span>
                                <img src="${value.img}" alt="">
                                <h2 class="name">${value.text}</h2>
                                <p class="label">
                                    <span class="one">2020</span>
                                    <span class="one">20台</span>
                                </p>
                                <p class="apply"><span class="one">1234</span>申请</p>
                                <p class="lave one">剩余时间2天</p>
                            </a>
                        `
                        });
                        $(".tab-box .show").append(template);
                        arrs[index].num++;
                    } else if (arrs[index].num == data.length && data[arrs[index].num - 1].length == 8) {
                        var dom = '<span title="没有更多了..." class="icon iconfont icon-meijieguo no-more"></span>'
                        $(".tab-box .show").append(dom);
                        arrs[index].num++;
                    }
                    load = false;
                }
            });
        }
    });
});