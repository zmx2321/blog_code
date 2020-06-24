ary = [5, 7, 1, 2, 6, 0, 3, 8, 9];

//取一个数，数组中依次与末尾的数比较，从后往前比较
function insertSort(ary){
	var newAry = [];
	newAry.push(ary[0]);

	for(var i=1; i<ary.length; i++){
		var cur = ary[i];

		for(var j=newAry.length-1; j>=0;){
			if(cur < newAry[j]){
				j--;
				if(j === -1){	//当前的数比数组中每一个数都小
					newAry.unshift(cur);	//将当前的数放在新数组最前面
				}
			}else{
				newAry.splice(j+1, 0, cur);	//从索引(newAry[j+1]处，删除0项，把当前项cur插入前面
				j = -1;
			}
		}
	}
	return newAry;
}

var res = insertSort(ary);
console.log(res);