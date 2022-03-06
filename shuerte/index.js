/*
 * @FileName: index.js
 * @Author  : yanshuifa
 * @Time    : 2022/3/6 4:02 下午
 * @Desc    : 专注练训练，舒尔特方格
*/

$(document).ready(function () {
    let num = 4
    let numArr = {}
    // 目前点击到的最大数
    let curNum = 0
    let start = null
    let stop = false

    const genRandNum = (randNum) => {
        const total = num*num
        for(let i = 0; i < total; i++) {
            numArr[i] = i
        }

        // 每次随机互换两个数的位置
        for(let i = 0; i < randNum; i++) {
            let r1 = Math.floor(Math.random() * total)
            let r2 = Math.floor(Math.random() * total)
            let tmp = numArr[r1]
            numArr[r1] = numArr[r2]
            numArr[r2] = tmp
        }
        console.log(numArr)
    }

    const initTable = () => {
        let table = $("#number-list")
        table.html("")
        genRandNum(10000)
        for(let i = 0; i < num; i++) {
            let tr = $("<tr></tr>")
            for(let j = 0; j < num; j++) {
                let td = $("<td></td>")
                td.html(numArr[i*num + j] + 1)
                tr.append(td)
            }
            table.append(tr)
        }
        curNum = 0
        start = new Date()
        stop = false
    }

    const bindClick = () => {
        $(".btn").unbind("click").click(function(){
            let v = $(this).attr("data-val")
            num = parseInt(v)
            initTable()
        })

        $("#number-list").on("click", "td", function(){
            let v = parseInt($(this).html())
            if(v != (curNum+1)) {
                alert("请先点击 " + (curNum+1))
                return
            }
            curNum++
            if(curNum == num*num) {
                stop = true
                alert("恭喜你，完成啦！！！🎉🎉🎉")
            }
        })
    }

    const timer = () => {
        setInterval(function(){
            formatDuring()
        }, 300)
    }

    const formatDuring = () => {
        if(stop) {
            return
        }
        let now = new Date()
        mss = now - start
        var days = parseInt(mss / (1000 * 60 * 60 * 24))
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = parseInt((mss % (1000 * 60)) / 1000)
        var haom = mss % 1000
        $(".days").html(days)
        $(".hours").html(hours)
        $(".min").html(minutes)
        $(".second").html(seconds)
        $(".mss").html(haom)
    }
    // ---------------MAIN---------------
    initTable()
    bindClick()
    timer()
})