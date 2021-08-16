/**
 * 冒泡排序: 让前项和后项比较，如果当期项大于后一项，两者交换位置
 * 每一轮当前项和后一项两两比较，虽然不一定达到最后结果，但是已经把当前最大的值放到末尾了
 */

let ary = [5, 7, 6, 2, 1, 0, 3, 8, 9];

function bubbleSort(ary){
    var temp = null;
    for(var i=0; i<ary.length-1; i++){
        for(var j=0; j<ary.length-1-i; j++){    //每一轮比较的次数
            if(ary[j] > ary[j+1]){    //如果当期项大于后一项，两者交换位置
                temp = ary[j];
                ary[j] = ary[j+1];
                ary[j+1] = temp;
            }
        }
    }
    return ary;
}

var res = bubbleSort(ary);
console.log(res);
