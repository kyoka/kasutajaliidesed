/**
 * @author Vladimir Ivanov and Jevgeni Krutov
 */
$(document).ready(function() {
	$("#forgot_password").hide();
	$("#registration").hide();
	$("#hint_sent").hide();
	document.getElementById("email1").focus();
	$("#hint_pwd_error").hide();

	$("#registerLink").click(function() {
		$("#sign_in").hide();
		//$("#hint_email_error").text(" ");
		$("#hint_email_error").text(" ");
		$("#email1Input").removeClass("error");
		$("#registration").show();
		var colors = ["Tallinn, Estonia", "New York, USA", "Moscow, Russia", "Tartu, Estonia", "Narva, Estonia", "New-Jersey, USA"];
		$('#fieldLocation').typeahead({
			source : colors
		});
		document.getElementById("fieldFirst").focus();
	});

	$("#btnSignIn").click(function() {
		var validEmail = validateEmail(document.getElementById('email1').value);
		var validPassword = false;
		if (document.getElementById('pwdInput').value.length >= 6) {
			validPassword = true;
			$("#hint_email_error").hide();
			$("#form-signin").removeClass("error");
		}
		if (validEmail && validPassword) {
			window.open("bookworm.html", "_self");
			$("#hint_pwd_error").hide();
		}
		if (!validEmail) {
			$("#hint_email_error").show();
			$("#hint_email_error").text("Invalid email");
			$("#email1Input").addClass("control-group error");
		}
		if (!validPassword) {
			$("#hint_pwd_error").show();
			$("#hint_pwd_error").text("Invalid password");
			$("#pwdBlock").addClass(" error");
		}
	});

	$("#email1").focus(function() {
		$("#hint_email_error").hide();
	});

	$("#pwdInput").focus(function() {
		$("#hint_pwd_error").hide();
		$("#pwdBlock").removeClass("error");
	});

	$("#submit_address").click(function() {
		var email = document.getElementById('email2').value;
		var validEmail = validateEmail(email);
		if (email.length == 0) {
			validEmail = false;
		}
		if (validEmail) {
			$("#hint_email_error").text(" ");
			$("#form_email2").removeClass("control-group error");

			$("#forgot_password").hide();
			$("#sign_in").show();

			document.getElementById("email1").focus();
			$("#hint_email_error").text(" ");

			$("#hint_sent").show();
		} else {
			$("#emailError").show();
			$("#form_email2").addClass("control-group error");
		}
	});

	$("#email2").focus(function() {
		$("#form_email2").removeClass("control-group error");
	});

	$("#email1").focus(function() {
		$("#email1Input").removeClass("error");
	});
	$("#email2").focus(function() {
		$("#email2Input").removeClass("error");
	});
	$("#email1").keyup(function(event) {
		if (event.keyCode == 13) {
			$("#btnSignIn").focus();
			$("#btnSignIn").click();
		}
	});
	$("#pwdInput").keyup(function(event) {
		if (event.keyCode == 13) {
			$("#btnSignIn").focus();
			$("#btnSignIn").click();
		}
	});
	$("#email2").blur(function() {
		var isEmailValid = validateEmail(document.getElementById('email2').value);
		document.getElementById('email2').focus();
		if (!isEmailValid) {
			$("#emailError").show();
			$("#form_email2").addClass("control-group error");
		} else {
			$("#emailError").hide();
			$("#form_email2").removeClass("control-group error");
		}
	});

	$("#btnDone").click(function() {
		var first = document.getElementById('fieldFirst').value;
		var last = document.getElementById('fieldLast').value;
		var email = document.getElementById('fieldEmail').value;
		var password1 = document.getElementById('fieldPassword1').value;
		var password2 = document.getElementById('fieldPassword2').value;
		var location = document.getElementById('fieldLocation').value;

		var isEmptyFields = false;
		var isEmailCorrect = true;
		var passwordsMatch = true;
		var passwordOK = true;

		if (first == "") {
			isEmptyFields = true;
			$("#regError1").text("empty field");
			$("#inputFirst").addClass("error");
		}
		if (last == "") {
			isEmptyFields = true;
			$("#regError2").text("empty field");
			$("#inputLast").addClass("error");
		}
		if (email == "") {
			isEmptyFields = true;
			$("#regError3").text("empty field");
			$("#inputEmail").addClass("error");
		}
		if (password1 == "") {
			isEmptyFields = true;
			$("#regError4").text("empty field");
			$("#inputPassword1").addClass("error");
		}
		if (password1.length < 6) {
			passwordOK = false;
			$("#inputPassword1").addClass("error");
			$("#regError4").text("6+ characters, please!");
		}
		if (!checkAlNum(password1)) {
			passwordOK = false;
			$("#inputPassword1").addClass("error");
			$("#regError4").text("only letters and numbers, please!");
		}
		if (password2 == "") {
			isEmptyFields = true;
			$("#regError5").text("empty field");
			$("#inputPassword2").addClass("error");
		}
		if (location == "") {
			isEmptyFields = true;
			$("#regError6").text("empty field");
			$("#inputLocation").addClass("error");
		}
		isEmailCorrect = validateEmail(email);
		if (!isEmailCorrect) {
			$("#regError3").text("invalid email");
			if (email == "") {
				$("#regError3").text("empty field");
			}
			$("#inputEmail").addClass("error");
		}

		var pwd1 = $("#fieldPassword1").val();
		var pwd2 = $("#fieldPassword2").val();
		if (!(pwd1 == pwd2)) {
			passwordsMatch = false;
			$("#regError5").text("passwords don't match");
			$("#inputPassword1").addClass("error");
			$("#inputPassword2").addClass("error");
		}
		if (!isEmptyFields && isEmailCorrect && passwordsMatch && passwordOK) {
			$("#registration").hide();

			$("#sign_in").show();
			$("#hint_email_error").text(" ");
			document.getElementById("email1").focus();

			$("#hint_sent").show();
		}
	});

	$("#fieldFirst").focus(function() {
		$("#regError1").text("");
		$("#inputFirst").removeClass("error");
	});
	$("#fieldLast").focus(function() {
		$("#regError2").text("");
		$("#inputLast").removeClass("error");
	});
	$("#fieldEmail").focus(function() {
		$("#regError3").text("");
		$("#inputEmail").removeClass("error");
	});
	$("#fieldPassword1").focus(function() {
		$("#regError4").text("");
		$("#inputPassword1").removeClass("error");
	});
	$("#fieldPassword2").focus(function() {
		$("#regError5").text("");
		$("#inputPassword2").removeClass("error");
	});
	$("#fieldLocation").focus(function() {
		$("#regError6").text("");
		$("#inputLocation").removeClass("error");
	});
	$("#fieldFirst").blur(function() {
		var textEntered = document.getElementById('fieldFirst').value;
		if (textEntered == "") {
			$("#regError1").text("empty field");
			$("#inputFirst").addClass("error");
		}
	});
	$("#fieldLast").blur(function() {
		var textEntered = document.getElementById('fieldLast').value;
		if (textEntered == "") {
			$("#regError2").text("empty field");
			$("#inputLast").addClass("error");
		}
	});
	$("#fieldEmail").blur(function() {
		var textEntered = document.getElementById('fieldEmail').value;
		if (!validateEmail(textEntered)) {
			$("#regError3").text("invalid email");
			$("#inputEmail").addClass("error");
		}
		if (textEntered == "") {
			$("#regError3").text("empty field");
			$("#inputEmail").addClass("error");
		}
	});
	$("#fieldPassword1").blur(function() {
		var password1 = $("#fieldPassword1").val();
		var password2 = $("#fieldPassword2").val();

		if (password1.length < 6) {
			$("#inputPassword1").addClass("error");
			$("#regError4").text("6+ characters, please!");
		}
		if (!checkAlNum(password1)) {
			$("#inputPassword1").addClass("error");
			$("#regError4").text("only letters and numbers, please!");
		}
		if (password1 == "") {
			$("#regError4").text("empty field");
			$("#inputPassword1").addClass("error");
			$("#inputPassword2").removeClass("error");
		}
	});

	$("#fieldPassword2").blur(function() {
		var password1 = $("#fieldPassword1").val();
		var password2 = $("#fieldPassword2").val();

		if (!(password1 == password2)) {
			$("#regError5").text("passwords don't match");
			$("#inputPassword1").addClass("error");
			$("#inputPassword2").addClass("error");
		}
		if (password2 == "") {
			$("#regError5").text("empty field");
			$("#inputPassword2").addClass("error");
		}
	});

	$("#fieldLocation").blur(function() {
		var textEntered = document.getElementById('fieldLocation').value;
		if (textEntered == "") {
			$("#regError6").text("empty field");
			$("#inputLocation").addClass("error");
		}
	});
});

function forgot() {
	$("#sign_in").hide();
	$("#hint_email_error").text(" ");
	$("#forgot_password").show();
	document.getElementById("email2").focus();
	$("#emailError").hide();
};
function validateEmail(email) {
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if (reg.test(email) == false) {
		return false;
	}
	return true;
}

function checkAlNum(input) {
	var reg = /^[a-z0-9]+$/i;
	if (reg.test(input) == false) {
		return false;
	}
	return true;
}