$(function () {

    var layer = layui.layer;

    getUserInfo();

    // 获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // 调用函数渲染用户头像
                // console.log(res);
                renderAvatar(res.data);
            }
            // 不论成功还是失败，最终都会调用complete回调函数

        })
    }


    //渲染用户的头像
    function renderAvatar(user) {
        //1.获取用户的名称
        var name = user.nickname || user.username;
        //2.设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        //3.按需渲染用户的头像
        if (user.user_pic !== null) {
            //渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            // 渲染文字头像
            var first = name[0].toUpperCase();
            $('.layui-nav-img').hide();
            $('.text-avatar').html(first).show();
        }
    }


    // 给退出按钮绑定点击事件
    $('#btnDel').on('click', function (e) {
        e.preventDefault();

        // 提示用户是否确认退出
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token');

            // 跳转到登录页面
            location.href = '/login.html';

            layer.close(index);
        });
    })




})