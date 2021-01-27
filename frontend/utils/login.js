$(document).ready(() => {

    $("form").on("submit", (e) => {
        e.preventDefault();

        $.ajax({
            url: "/auth/login",
            method: "POST",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: (res) => {          
                localStorage.setItem('user', JSON.stringify(Object.entries(res)));
                window.location.href = "/main";
            },
            error: (res) => {
                console.log(res.responseJSON.message);
                alert(res.responseJSON.message)
            }
        });
    });
});