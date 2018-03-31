$(document).ready(function() {
    $("#login").click(function() {
        alert("login");
        $.ajax({
                url: "http://127.0.0.1:8080/DataServer/local/logincheck",
                type: "post",
                async: false,
                dataType: 'json',
                data: {
                    username: 'test',
                    password: 'test'
                },
                success: function(res) {
                    alert('s');
                    alert(JSON.stringify(res));
                },
                error: function(err) {
                    alert(JSON.stringify(err));
                }
            })
            // $.get("/test", function(data, status) {
            //     alert(JSON.stringify(data));
            // })
    });
    $("#test").click(function() {
        alert("test");
        $.ajax({
                url: "http://127.0.0.1:8080/DataServer/local/test",
                type: "get",
                async: false,
                dataType: 'json',
                success: function(res) {
                    alert('s');
                    alert(JSON.stringify(res));
                },
                error: function(err) {
                    alert(JSON.stringify(err));
                }
            })
            // $.get("/test", function(data, status) {
            //     alert(JSON.stringify(data));
            // })
    });
    $('#range').change(function() {
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
    });
    /*  $('#range').jRange({
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
      });*/
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
                //$('#range').jRange('updateRange', '0,' + String(data), String(data));
                $('#range').val(parseInt(data));
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