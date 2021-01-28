//const { list } = require("../../app/models");

$(document).ready(() => {

    // nav
    $("#nav-tab").add($("#nav-hamburger")).click(() => {
        // toggle open classes
        $("#nav-tab").toggleClass("nav-tab-open");
        $("#nav-hamburger").toggleClass("nav-hamburger-open");
        $("#nav-hamburger > div").toggleClass("menu-icon-change");
        $("nav").toggleClass("nav-open");
    });

    // logout
    logout = () => {
        localStorage.clear();
    };

    // get user data from local storage (JSON parse was causing issues)
    let user = {}
    for (let [key, value] of JSON.parse(localStorage.getItem('user'))) {
        user[key] = value;
    }

    // get tasks
    $.ajax({
        url: "/user/getList",
        method: "POST",
        headers: {"x-access-token": user.accessToken},
        userId: user.id,
        data: {listId: user.lists[0]},
        success: (res) => {
            for (let i = 0; i < res.length; i++) {
                newListItem(res[i].title, res[i]._id, res[i].completed);
            }
        },
        error: (res) => {
            console.log(res.responseJSON.message);
        }
    });
    
    // new task
    $("form").on('submit', (e) => {
        e.preventDefault();

        // Add to database
        $.ajax({
            url: "/user/newTask",
            method: "POST",
            headers: {"x-access-token": user.accessToken},
            userId: user.id,
            data: {
                listId: user.lists[0],
                itemTitle: $("#task-input").val()
            },
            success: (res) => {
                console.log(res.message);
                
                // Add to list
                newListItem($("#task-input").val(), res.id);
                
                $("#task-input").val("");
            },
            error: (res) => {
                console.log(res.message);
            }
        });
    });

    // complete task
    completedTask = (listElement) => {
        // Get id of li
        let elementId = listElement.parentElement.id;

        // Update database
        $.ajax({
            url: "/user/completedTask",
            method: "POST",
            headers: {"x-access-token": user.accessToken},
            userId: user.id,
            data: {
                listId: user.lists[0],
                itemId: elementId
            },
            success: (res) => {
                console.log(res.message);
            },
            error: (res) => {
                console.log(res.message);
            }
        });
        
        // Update list
        $("#" + elementId).toggleClass("li-completed");
        $("#" + elementId + " > div").toggleClass("li-div-completed");

        // Reload list to ensure updated class is applied (issue on mobile)
        $("ul").html($("ul").html());
    };

    // delete task
    deleteTask = (listElement) => {
        // Get id of li
        let elementId = listElement.parentElement.id;

        // Update database
        $.ajax({
            url: "/user/deleteTask",
            method: "POST",
            headers: {"x-access-token": user.accessToken},
            userId: user.id,
            data: {
                listId: user.lists[0],
                itemId: elementId
            },
            success: (res) => {
                console.log(res);
            },
            error: (res) => {
                console.log(res);
            }
        });

        // Update list
        $("#" + elementId).remove();
    };


    newListItem = (content, id, completed = false) => {
        // Create list item
        let li = $(`<li id=${id}><div onclick="completedTask(this);"><p>${content}</p></div><span onclick="deleteTask(this);"></span></li>`);

        // Update list
        li.prependTo($("#taskList"));

        // Update classes
        if (completed) {
            $("#" + id).addClass("li-completed");
            $("#" + id + " > div").addClass("li-div-completed");
        }
    };
});
