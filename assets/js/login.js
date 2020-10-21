$(function () {
    var form = layui.form;
    var layer = layui.layer;





    $('#link_reg').on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    $('#link_login').on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })


    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }

        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repass: function (value) {
            if ($('#pwdInputReg').val() !== value) {
                return '两次密码不一致！'
            }
        }
    });



    // 发起注册用户的Ajax请求
    $('#formReg').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#usernameReg').val(),
                password: $('#pwdInputReg').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败！')
                }
                layer.msg('注册成功 请登录！');
                // 跳转到登录界面
                $('#link_login').click();
            }
        })
    })


    // 发起登录的Ajax请求
    $('#formLogin').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $('#usernameLogin').val(),
                password: $('#pwdInputLogin').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 保存 请求成功返回的token字符串 到本地存储中
                localStorage.setItem('token', res.token)
                // 跳转到后台页面
                location.href = '/index.html';
            }
        })
    })







})