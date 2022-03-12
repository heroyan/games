/*
 * @FileName: index.js
 * @Author  : yanshuifa
 * @Time    : 2022/3/11 6:13 下午
 * @Desc    : math calculator
*/

$(document).ready(function () {
    var global_num1 = 0
    var global_num2 = 0
    var global_num3 = 0
    var global_method = 1
    var global_max = 10
    var global_answer = 0
    var global_input = ''
    var global_hide = 0
    var global_right_num = 0
    var global_wrong_num = 0
    var global_start = null
    var global_top = 0
    var global_times = 0

    function genTable(num) {
        global_max = num
        randCalc()
    }

    function randCalc() {
        // decide the method
        // decide num1
        // decide the number
        $("#bonus").hide()
        global_input = ''

        global_method = [-1, 1][Math.floor(Math.random() * 2)]
        console.log(global_method)
        $("#method").html(global_method == 1 ? "+" : "-")

        global_num1 = Math.floor(Math.random() * global_max)
        if(global_method == 1) {
            // 相加
            global_num2 = Math.floor(Math.random() * global_max)
            while(global_num2 + global_num1 > global_max) {
                global_num2 = Math.floor(Math.random() * global_max)
            }
        } else {
            // 相减
            global_num2 = Math.floor(Math.random() * global_max)
            while(global_num2 > global_num1) {
                global_num2 = Math.floor(Math.random() * global_max)
            }
        }
        global_num3 = global_num1 + global_num2*global_method

        $("#num1").html(global_num1)
        $("#num2").html(global_num2)
        $("#num3").html(global_num3)
        $(".one").removeClass("answer-grid")

        global_hide = Math.floor(Math.random() * 3) + 1
        $("#num" + global_hide).html("")
        $("#num" + global_hide).addClass("answer-grid")
        global_answer = [0, global_num1, global_num2, global_num3][global_hide]

        global_top = $("#num1").offset().top
        global_times = 0

        global_start = new Date()
    }

    // show animation when the answer is wrong
    const wrongTips = () => {
        let obj = $("#num" + global_hide)
        let offset = obj.offset()
        if(global_times > 5) {
            global_times = 0
            // 复位
            obj.offset({top: global_top, left: offset.left})
            return
        }
        if(offset.top > global_top) {
            obj.offset({top: global_top - 10, left: offset.left})
        } else {
            obj.offset({top: global_top + 10, left: offset.left})
        }
        setTimeout(function(){
            global_times++
            wrongTips()
        }, 100)
    }

    const bindClick = () => {
        $(".btn").unbind("click").click(function(){
            let v = $(this).attr("data-val")
            global_max = parseInt(v)
            genTable(global_max)
        })
        $("#submit-btn").unbind("click").click(function(){
            if(global_answer == parseInt(global_input)) {
                global_right_num += 1
                $("#right-num").html(global_right_num)
                $("#bonus").show(500, function(){
                    randCalc()
                })
            } else {
                global_wrong_num += 1
                $("#wrong-num").html(global_wrong_num)
//                alert("答案错误哦😫😫😫😫😫😫")
                wrongTips()
                global_input = ''
                $("#num" + global_hide).html(global_input)
            }

        })
        $("#clear-btn").unbind("click").click(function(){
            global_input = ''
            $("#num" + global_hide).html(global_input)
        })
        $(".number").unbind("click").click(function(){
            global_input += $(this).html()
            $("#num" + global_hide).html(global_input)
        })
    }
    // ---------------MAIN---------------
    genTable(10)
    bindClick()
})

