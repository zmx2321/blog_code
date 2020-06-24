/**
    给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。最高位数字存放在数组的首位，数组中每个元素只存储单个数字。你可以假设除了整数0之外，这个整数不会以零开头。
    示例 1：
    输入：[1, 2, 3]
    输出: [1, 2, 4]
    解释：输入数组表示数字 123。

    示例 2:
    输入：[4, 3, 2, 1]
    输出: [4, 3, 2, 2]
    解释：输入数组表示数字 123。
 */
/**
    参考答案：
    1. 数组最后一个数是个位数，所以从后面开始读，个位数+1后，如果有进位，
    储存进位值，val=0,没进位直接存储。
    2. 处理十位数，如果个位数有进位，十位数+1，再判断十位数是否有进位
    3. 重复上面动作直到数组结束
 */

// 代码1：规矩的实现
const plusOne1 = (digits)=> {
    // 判断相加后是否需要进位
    let carry = 0;

    for(let i=digits.length-1; i>=0; i--) {
        // 目前位数=目前位数+前面是否进位
        digits[i] = digits[i] + carry;

        // list最后一个数字，也就是个位数，给他+1
        if(i == digits.length-1) {
            digits[i] = digits[i] + 1;
        }

        // 如果目前这个位数等于10(因为只+1,所以不会超过10)，进位
        if(digits[i] == 10) {
            digits[i] = 0;
            carry = 1;
        } else {
            carry = 0;
        }
    }

    // 最后如果进位
    if(carry == 1) {
        digits.unshift(carry);
    }

    return digits;
}


// 代码2：借助ES10 BigInt特效实现
const plusOne2 = (digits)=> {
    // 数值6145390195186705544超出Number基本类型的容纳范围，改用BigInt基本类型
    let num = BigInt(digits.join(''));

    // BigInt基本类型进行数学操作时，需要在数字字面量后加个n
    let string = String(num + ln);
    let ary = string.split('');

    return ary.map(str => Number(str));
}

let res = plusOne1([1, 2, 3]);
console.log(res);