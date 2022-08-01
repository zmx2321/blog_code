/**
 * 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

    回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
    
    例如，121 是回文，而 123 不是。
 */

/**
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {
    if (x < 0) return false

    let rev = 0
    for(let i = x; i >= 1; i = Math.floor(i/10)) rev = rev*10 + i%10
    return rev === x
};