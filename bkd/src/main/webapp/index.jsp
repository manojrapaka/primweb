<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<!--------------------
LOGIN FORM
by: Amit Jakhu
www.amitjakhu.com
--------------------->

<!--META-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login Form</title>

<!--STYLESHEETS-->
<link href="AppLoginResources/css/style.css" rel="stylesheet" type="text/css" />

<!--SCRIPTS-->
<script type="text/javascript" src="resources/js/jquery-2.1.4.js"></script>


<!--Slider-in icons-->
<script type="text/javascript">
	var userName = "";
	var userPass = "";

	$(document).ready(function() {

		$(".username").focus(function() {
			$(".user-icon").css("left", "-48px");
		});
		$(".username").blur(function() {
			$(".user-icon").css("left", "0px");
		});

		$(".password").focus(function() {
			$(".pass-icon").css("left", "-48px");
		});
		$(".password").blur(function() {
			$(".pass-icon").css("left", "0px");
		});
	});

	function userLogin() {

		userName = $(".username").val();
		userPass = $(".password").val();

		var loginData = {
			user : userName,
			pass : userPass
		};
		
		if (userName != "" && userPass != "") {

			window.location = "gui/extapp/index.html";

			/* $.ajax({
				type : "POST",
				url : "/login/user",
				data : JSON.stringify(loginData),
				success : function(response){
					
					var result = JSON.parse(response);
					if(result.success === true){
						
						window.location="/gui/main.jsp";
						
					} else {
						
						alert("whats going on here.....");
						
					}
					
				}
			}); */

		}

	}
</script>

</head>
<body>

	<!--WRAPPER-->
	<div id="wrapper">

		<!--SLIDE-IN ICONS-->
		<div class="user-icon"></div>
		<div class="pass-icon"></div>
		<!--END SLIDE-IN ICONS-->

		<!--LOGIN FORM-->
		<form name="login-form" class="login-form">

			<!--HEADER-->
			<div class="header">
				<!--TITLE-->
				<h1>Login Form</h1>
				<!--END TITLE-->
				<!--DESCRIPTION-->
				<span>Fill out the form below to login to my super awesome
					imaginary control panel.</span>
				<!--END DESCRIPTION-->
			</div>
			<!--END HEADER-->

			<!--CONTENT-->
			<div class="content">
				<!--USERNAME-->
				<input name="username" type="text" class="input username"
					value="" onfocus="this.value=''" />
				<!--END USERNAME-->
				<!--PASSWORD-->
				<input name="password" type="password" class="input password"
					value="" onfocus="this.value=''" />
				<!--END PASSWORD-->
			</div>
			<!--END CONTENT-->

			<!--FOOTER-->
			<div class="footer">
				<!--LOGIN BUTTON-->
				<input type="button" name="submit" value="Login" class="button"
					onClick="userLogin()" />
				<!--END LOGIN BUTTON-->
				<!--REGISTER BUTTON-->
				<input type="button" name="submit" value="Register" class="register" />
				<!--END REGISTER BUTTON-->
			</div>
			<!--END FOOTER-->

		</form>
		<!--END LOGIN FORM-->

	</div>
	<!--END WRAPPER-->

	<!--GRADIENT-->
	<div class="gradient"></div>
	<!--END GRADIENT-->

</body>
</html>