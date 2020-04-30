//前端校验器

//对用户输入的内容进行格式化 - 去除空格
function print(value) {
    var exp = /(^\s*)(\s*$)/g;
    //replace()：在字符串中用一些字符替换另一些字符或替换一个与正则表达式匹配的子串
    value = value.replace(exp, "");
    return value;
}

//手机号码验证
function checkPhone() {
    var exp = /^[1][3,4,5,7,8][0-9]{9}$/;
    var phone = document.my_form.phone.value;
    phone = print(phone);
    if (exp.test(phone)) {
        return true;
    } else {
        alert("手机号码格式不正确，请重新输入！");
        return false;
    }
}

//邮箱验证
function checkEmail() {
    var exp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var email = document.my_form.email.value;
    email = print(email);
    if (exp.test(email)) {
        return true;
    } else {
        alert("邮箱格式不正确，请重新输入！");
        return false;
    }
}

//用户名验证 - 以字母开头，且只能包含字母或数字
function checkUsername() {
    var exp = /^[a-zA-Z][a-zA-Z0-9]+$/;
    var username = document.my_form.username.value;
    username = print(username);
    if (exp.test(username)) {
        return true;
    } else {
        alert("用户名格式不正确，必须以字母开头，且只能包含字母和数字！");
        return false;
    }
}

//密码验证 - 长度大于8位，且必须包含字母和数字以外的字符
function checkPassword() {
    var exp = /[a-zA-Z0-9]+$/; //只包含数字和字母
    var password1 = document.my_form.password1.value;
    password1 = print(password1);
    if (password1.length >= 8) {
        if (!exp.test(password1)) {
            var password2 = document.my_form.password2.value;
            password2 = print(password2);
            if (password2 === password1) {
                return true;
            } else {
                alert("两次密码输入不一致，请重新输入！");
                return false;
            }
        } else {
            alert("密码必须包含字母和数字以外的字符，请重新输入！");
            return false;
        }
    } else {
        alert("密码长度必须大于或等于8位，请重新输入！");
        return false;
    }
}

function check() {
    //若返回true，则表单数据验证通过，可以提交
    if (checkPhone() && checkEmail() && checkUsername() && checkPassword()) {
        return true;
    } else {
        return false;
    }
}