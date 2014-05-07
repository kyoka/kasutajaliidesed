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


/*-------------------------------------------*/
function log() {
    if ($("#signin-email").val() == 'admin@admin.com') {
        if ($("#signin-password").val() == 'admin') {
            setCookie("username", $.trim($("#signin-email").val()));
            alert("successfully logged in");
            window.location = "home.html";
        } else if ($("#signin-password").value == '') {
            alert("Password can't be blank");
        } else {
            alert("Wrong password");
        }
    } else if ($("#signin-email").value == 'derp@derpson.com') {
        if ($("#signin-password").value == 'derp') {
            setCookie("username", $.trim($("#signin-email").val()));
            alert("successfully logged in");
            window.location = "home.html";
        } else if ($("#signin-password").value == '') {
            alert("Password can't be blank");
        } else {
            alert("Wrong password");
        }
    } else if ($("#signin-email").value == '') {
        alert("UserId can't be blank");
    } else {
        alert("No such user");
    }
}

function newComplaint() {

}


$('#MyProfile').click(function () {
    window.location = "home.html";
});

$('#logout').click(function () {
    location.reload();
});

//$('#signin-submit').click(function() {
//    log();
//});

$('#newComp').click(function () {
    newComplaint();
});

$(document).ready(function () {
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

});

$(document).ready(function () {
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