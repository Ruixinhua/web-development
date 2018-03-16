$(document).ready(function() {

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
                $('#range').jRange('updateRange', '0,100', '50');
            }
        });
    })
});
$('#range').jRange({
    from: 0,
    to: 0,
    step: 20,
    scale: [0, 0],
    format: '%s',
    width: 300,
    showLabels: true,
    snap: true,
    ondragend: function() {
        alert('changed');
        $('#session').val('changed');
        console.log('changed');
    }
});