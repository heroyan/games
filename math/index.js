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

    function genTable(num) {
        global_max = num
        randCalc()
    }

    function randCalc() {
        // decide the method
        // decide num1
        // decide the number
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

        global_start = new Date()
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
                randCalc()
                $("#right-num").html(global_right_num)
            } else {
                global_wrong_num += 1
                $("#wrong-num").html(global_wrong_num)
                alert("答案错误哦😯")
                $("#num" + global_hide).html("")
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

