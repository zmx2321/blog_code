ary = [5, 7, 1, 2, 6, 0, 3, 8, 9];

function quickSort(ary){
	if(ary.length <= 1){
		return ary;
	}

	var pointIndex = Math.floor(ary.length / 2);
	var pointValue = ary.splice(pointIndex, 1)[0];
	var left = [];
	var right = [];
	for(var i=0; i<ary.length; i++){
		var cur = ary[i];
		cur < pointValue ? left.push(cur) : right.push(cur);
	}

	return quickSort(left).concat([pointValue], quickSort(right));
}

var res = quickSort(ary);
console.log(res);

// //快速排序  找一个基准点（中间），小的放左边，大的放右边
// function quickSort(ary){
// 	//传过来的数组只有一项，直接返回
// 	if(ary.length <= 1){
// 		return ary;
// 	}

// 	var pointIndex = Math.floor(ary.length / 2); //找到基准点的索引
// 	var pointValue = ary.splice(pointIndex, 1)[0];	//通过基准点的索引，在原数组中删除，并获取其值
// 	//拿基准点的值和原数组的每一项值比较，小的放左边，大的放右边
// 	var left = [];
// 	var right = [];
// 	for(var i=0; i<ary.length; i++){
// 		var cur = ary[i];
// 		cur < pointValue ? left.push(cur) : right.push(cur);
// 	}

// 	return quickSort(left).concat([pointValue], quickSort(right));	//递归	//concat拼接数组（左边排序好的数组，加中间，加右边排序好的数组）
// }

// var res = quickSort(ary);
// console.log(res);