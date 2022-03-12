/*
 * @FileName: index.js
 * @Author  : yanshuifa
 * @Time    : 2022/3/11 11:08 下午
 * @Desc    : 数字华容道
*/

$(document).ready(function () {
    var global_num = 0
    var global_arr = null
    var global_x = 0
    var global_y = 0
    var global_start = null
    var huarongdao = document.getElementById('huarongdao')

    function genTable(num) {
        global_num = num
        huarongdao.style.width = num * 120 + 'px'
        huarongdao.innerHTML = ''
        arr = new Array()
        for(i = 0; i < num; i++) {
            tmp = new Array()
            for(j = 0; j < num; j++) {
                tmp.push(i*num + j + 1)
            }
            arr.push(tmp)
        }
        // 最后一格置为空
        arr[num-1][num-1] = ''
        console.log(arr)
        // 记录空的位置坐标
        emptyX = num - 1
        emptyY = num - 1
        global_x = emptyX
        global_y = emptyY
        arr = randMove(arr, emptyX, emptyY, 10000)
        global_arr = arr
        console.log(arr)
        // 开始移动
        for(i = 0; i < num; i++) {
            for(j = 0; j < num; j++) {
                ele = document.createElement('div')
                ele.className = 'one'
                ele.setAttribute("x", i)
                ele.setAttribute("y", j)
                text = document.createTextNode(arr[i][j] + '')
                ele.appendChild(text)
                huarongdao.appendChild(ele)
            }
        }
        global_start = new Date()
    }

    // 随机移动， 从目标位置开始随机打乱
    function randMove(arr, emptyX, emptyY, moveTimes) {
        num = arr.length
        offset = [[-1, 0], [1, 0], [0, 1], [0, -1]]
        for(i = 0; i < moveTimes; i++) {
            rd = Math.floor(Math.random() * 4)
            off = offset[rd]
            moveX = emptyX + off[0]
            moveY = emptyY + off[1]
            if(moveX >= 0 && moveX < num && moveY >= 0 && moveY < num) {
                tmp = arr[emptyX][emptyY]
                arr[emptyX][emptyY] = arr[moveX][moveY]
                arr[moveX][moveY] = tmp
                emptyX = moveX
                emptyY = moveY
            }
        }
        // 把空格移到最后一个单元格，简单的和
        for(i = 0; i < num; i++) {
            if(emptyX + 1 >= num) {
                break
            }
            moveX = emptyX + 1
            arr[emptyX][emptyY] = arr[moveX][emptyY]
            arr[moveX][emptyY] = ''
            emptyX = moveX
        }

        for(i = 0; i < num; i++) {
            if(emptyY + 1 >= num) {
                break
            }
            moveY = emptyY + 1
            arr[emptyX][emptyY] = arr[emptyX][moveY]
            arr[emptyX][moveY] = ''
            emptyY = moveY
        }

        return arr
    }

    // 捕捉鼠标事件
    document.onkeydown = function (event) {  // 方向键控制元素移动函数
        var event = event || window.event;  // 标准化事件对象
        switch(event.keyCode){  // 获取当前按下键盘键的编码
            case 38 :  // 按下上箭头键
                if(global_x - 1 < 0) {
                    console.log('到最上了')
                    return
                }
                global_arr[global_x][global_y] = global_arr[global_x-1][global_y]
                setText(global_x, global_y, global_arr[global_x-1][global_y])
                global_arr[global_x-1][global_y] = ''
                global_x = global_x - 1
                setText(global_x, global_y, '')
                console.log(global_x + "-" + global_y)
                break;
            case 40 :  // 按下下箭头键
                if(global_x + 1 >= global_num) {
                    console.log('到最下了')
                    return
                }
                global_arr[global_x][global_y] = global_arr[global_x+1][global_y]
                setText(global_x, global_y, global_arr[global_x+1][global_y])
                global_arr[global_x+1][global_y] = ''
                global_x = global_x + 1
                setText(global_x, global_y, '')
                console.log(global_x + "-" + global_y)
                break;
            case 37 :  // 按下左箭头键
                if(global_y - 1 < 0) {
                    console.log('到最左了')
                    return
                }
                global_arr[global_x][global_y] = global_arr[global_x][global_y-1]
                setText(global_x, global_y, global_arr[global_x][global_y-1])
                global_arr[global_x][global_y-1] = ''
                global_y = global_y - 1
                setText(global_x, global_y, '')
                console.log(global_x + "-" + global_y)
                break;
            case 39 :  // 按下右箭头键
                if(global_y + 1 >= global_num) {
                    console.log('到最右了')
                    return
                }
                global_arr[global_x][global_y] = global_arr[global_x][global_y+1]
                setText(global_x, global_y, global_arr[global_x][global_y+1])
                global_arr[global_x][global_y+1] = ''
                global_y = global_y + 1
                setText(global_x, global_y, '')
                console.log(global_x + "-" + global_y)
                break;
        }
        checkFinished()

        return false
    }

    const checkFinished = () => {
        setTimeout(function(){
            if(isFinished()) {
                alert("恭喜！你完成了！花时：" + ((new Date()) - global_start)/1000 + "秒")
            }
        }, 100)
    }

    function setText(x, y, value) {
        huarongdao.children[x*global_num + y].textContent = value
    }

    function isFinished() {
        for (i = 0; i < global_num; i++) {
            for (j = 0; j < global_num; j++) {
                // 忽略最后一个值
                if(i == global_num - 1 && j == global_num - 1) {
                    continue
                }
                if(global_arr[i][j] != (i*global_num + j + 1)) {
                    return false
                }
            }
        }

        return true
    }

    const bindClick = () => {
        $(".set-grid-num-btn").unbind("click").click(function(){
            let v = $(this).attr("data-val")
            genTable(parseInt(v))
        })
        $("#huarongdao").on("click", ".one", function(){
            let x = parseInt($(this).attr("x"))
            let y = parseInt($(this).attr("y"))
            if( (x == global_x && (y == global_y-1 || y == global_y+1)) ||
                (y == global_y && (x == global_x-1 || x == global_x+1))
            ) {
                setText(global_x, global_y, global_arr[x][y])
                setText(x, y, '')
                global_arr[global_x][global_y] = global_arr[x][y]
                global_arr[x][y] = ''
                global_x = x
                global_y = y
                checkFinished()
            }
        })
        $(".reset-btn").unbind("click").click(function(){
            genTable(global_num)
        })
    }
    // ---------------MAIN---------------
    // 默认展示 4*4 格
    genTable(4)
    bindClick()
})