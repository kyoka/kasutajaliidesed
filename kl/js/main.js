function setCookie(c_name, value) {
    document.cookie = c_name + "=" + value;

}
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function checkCookie() {

    var username = getCookie("username");

    if (username != null && username != "" && username == "admin@admin.com") {
        return true;
    }
    return false;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function newComplaint() {

}

$('#newComp').click(function () {
    newComplaint();
});

$(document).ready(function () {
    if (getCookie('is_admin')) {
        var a = $('<a></a>', {
            'href': '/newTag.html'
        }).addClass('navlink').text('Add Tag');
        var li = $('<li></li>');
        $('#left-header').append(li.append(a));
    }
    $("#regform").validate({
        rules: {
            full_name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 3,
                maxlength: 16
            }
        }
    });
    $("#newComp").validate({

        rules: {
            compH: {
                required: true
            },
            compType: {
                required: true
            },
            compDt: {
                required: true
            },
            compDet: {
                required: true
            }
        }

    });

});

function renderComplaint(complaint_id) {
    $.getJSON("/cgi-bin/complaint.py?c=id&v=" + complaint_id, function (data) {
        data = data.data[0];
        window.data = data;
        $('#compHead').text(data.title);
        $('#compDet').text(data.description);
        $('#compDate').text(data.time);
        $('#compTag').text(data.tag);
        $('#compAadress').text(data.location);
        $('#compImg').empty();
        if (data.images) {
            $(data.images.split(',')).each(function (index, value) {
                var div = $('<div></div>').addClass('col-md-4');
                $('<img>', {
                    src: '/img/' + value,
                    alt: ''
                })
                    .addClass('img-rounded')
                    .addClass('complaint-image')
                    .appendTo(div);
                $('#compImg').append(div);
            });
        }

        $('#user_complaints_full').slideDown();
    });

}

function glyphClickEvent(glyph, complaint_id) {
    var glyph = $(glyph);
    var complain_div = $('#user_complaints_full');
    if (glyph.hasClass('active-glyph')) {
        glyph.removeClass('active-glyph');
        complain_div.slideUp();
    } else {
        $('.active-glyph').removeClass('active-glyph');
        glyph.addClass('active-glyph');
        complain_div.slideUp(function () {
            renderComplaint(complaint_id);
        });
    }
}