/*
 * @FileName: index.js
 * @Author  : yanshuifa
 * @Time    : 2022/3/6 10:36 上午
 * @Desc    : 记牌器
*/

$(document).ready(function () {
    let pokerLeft = {}
    let pokerArr = {}
    let maxNum = 18
    let start = 3
    pokerArr[11] = 'J'
    pokerArr[12] = 'Q'
    pokerArr[13] = 'K'
    pokerArr[14] = 'A'
    pokerArr[15] = '2'
    pokerArr[16] = 'JOKER'
    pokerArr[17] = 'JOKER'

    const initLeft = (num) => {
        for(let i = 1; i < maxNum; i++) {
            if(i > maxNum - 3) {
                pokerLeft[i] = num
            } else {
                pokerLeft[i] = 4 * num
            }
        }
        initLeftNum()
    }

    const initPoker = () => {
        for(let i = start; i < maxNum; i++) {
            let one = $("#one-card-template").html()
            one = $(one)
            one.attr("data-val", i)
            let display = pokerArr[i] || i
            if( i == 16) {
                one.find(".card-left").html(display)
                one.find(".card-left").css("color", "gray")
            } else if(i == 17) {
                one.find(".card-left").html(display)
                one.find(".card-left").css("color", "red")
            } else {
                one.find(".card-left").html(display)
                one.find(".card-right").html(display)
            }
            $("#card-template").append(one)
        }
        initLeft(1)
    }

    const updateLeftNum = (num) => {
        $(".card[data-val=" + num + "]").find(".left-num").html(pokerLeft[num])
    }

    const initLeftNum = () => {
        for(let i = start; i < maxNum; i++) {
            $(".card[data-val=" + i + "]").find(".left-num").html(pokerLeft[i])
        }
    }

    const bindClick = () => {
        $("#btn1").unbind("click").click(()=>{
            initLeft(1)
        })
        $("#btn2").unbind("click").click(()=>{
            initLeft(2)
        })
        $("#card-template").on("click", ".card", function(){
            let v = $(this).attr("data-val")
            console.log(v)
            console.log(pokerLeft[v])
            if(pokerLeft[v] > 0) {
                pokerLeft[v]--
            } else {
                console.log(v + "已经出完了")
            }
            updateLeftNum(v)
            console.log(pokerLeft)
        })
        $(".set-num-btn").unbind("click").click(function(){
            initLeft(parseInt($(this).attr("data-val")))
        })
    }
    // ---------------MAIN---------------
    initPoker()
    bindClick()
})