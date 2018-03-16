$(document).ready(function() {
    $('#range').jRange({
        from: -2.0,
        to: 2.0,
        step: 0.5,
        scale: [-2.0, -1.0, 0.0, 1.0, 2.0],
        format: '%s',
        width: 300,
        showLabels: true,
        snap: true
    });
    $("#test").click(function() {
        alert("test");
        $.get("/connect?name=session", function(data, status) {
            alert("数据：" + data + "\n状态：" + status);
        });
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
                $('#range').attr('max', data);
                $('#range').val(data / 2);
            }
        });
    })
});