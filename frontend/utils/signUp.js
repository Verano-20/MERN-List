$(document).ready(() => {
    // Password validation
    let password = $("#password");
    let confirmPassword = $("#confirmPassword");

    $("form").on("submit", (e) => {
        e.preventDefault();

        // password validation
        if (password.val() !== confirmPassword.val()) {
            alert("Passwords do not match.");
            return false;
        }

        let userData = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        };

        $.ajax({
            url: "/auth/signUp",
            method: "POST",
            data: userData,
            success: (res) => {
                console.log(res.message);
                login(userData);
            },
            error: (res) => {
                console.log(res.responseJSON.message);
                alert(res.responseJSON.message);
            }
        });
    });

    login = (data) => {
        $.ajax({
            url: "/auth/login",
            method: "POST",
            data: data,
            success: (res) => {
                let token = res.accessToken;
                localStorage.setItem('token', token);
                window.location.href = "/main";
            },
            error: (res) => {
                console.log(res);
            }
        });
    };
});