$(document).ready(function() {
    $("#test").click(function() {
        alert("test");
        $.get("/connect?name=session", function(data, status) {
            alert("数据：" + data + "\n状态：" + status);
        });
    });
    $('#range').jRange({
        from: 0,
        to: 0,
        step: 20,
        format: '%s',
        width: 300,
        showLabels: false,
        showScale: false,
        snap: true,
        ondragend: function() {
            var value = $('#range').val();
            var message = {
                name: 'x',
                param: value
            }
            $.post("/event", message, function(data, status) {
                if (status) {
                    $('#xTb').html(data);
                } else {
                    alert('移动视频失败');
                }
            })
        },
        onbarclicked: function() {
            var value = $('#range').val();
            var message = {
                name: 'x',
                param: value
            }
            $.post("/event", message, function(data, status) {
                if (status) {
                    $('#xTb').html(data);
                } else {
                    alert('移动视频失败');
                }
            })
        }
    });
    $('#sessionBt').click(function() {
        var session = $('#session').val();
        var message = {
            name: 'session',
            param: session
        }
        $.post("/event", message, function(data, status) {
            if (status) {
                $('#sessionTb').html(data);
            } else {
                alert('session设置失败');
            }
        });
        $('#session').val('');
    });
    $('#widthBt').click(function() {
        var message = {
            name: 'width',
            param: ''
        }
        $.post("/event", message, function(data, status) {
            if (status) {
                $('#widthTb').html(data);
                $('#xTb').html(data);
                $('#amplificationTb').html(1);
                $('#range').jRange('updateRange', '0,' + String(data), String(data));
            } else {
                alert('width获取失败');
            }
        });
    });
    $('#magnifyBt').click(function() {
        if (parseInt($('#amplificationTb').html()) === 0) {
            return;
        }
        var message = {
            name: 'amplification',
            param: parseInt($('#amplificationTb').html()) + 1
        }
        $.post("/event", message, function(data, status) {
            if (status) {
                $('#amplificationTb').html(data);
            } else {
                alert('视频放大失败');
            }
        });
    });
    $('#shrinkBt').click(function() {
        if (parseInt($('#amplificationTb').html()) < 2) {
            return;
        }
        var message = {
            name: 'amplification',
            param: parseInt($('#amplificationTb').html()) - 1
        }
        $.post("/event", message, function(data, status) {
            if (status) {
                $('#amplificationTb').html(data);
            } else {
                alert('视频缩小失败');
            }
        });
    })
});