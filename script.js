let from = null, start = 0, url = 'http://localhost/chat%20app/chat.php';
$(document).ready(function () {
    from = prompt("Please Enter Your Name");
    load();
    $('form').submit(function (e) {
        $.post(url, {
            message: $('#message').val(),
            from: from
        });
        $("#message").val('');
        return false;
    });
});
function load() {
    $.get(url + '?start=' + start, function (result) {
        if (result.items) {
            result.items.forEach(item => {
                start = item.id;
                $('#messages').append(renderMessage(item));
            });
            $('#messages').animate({ scrollTop: $('#messages')[0].scrollHeight })
        }
        load();
    });
}
function renderMessage(item) {
    let time = new Date(item.created);
    time = `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
    return `<div class="msg"><p>${item.from}</p>${item.message}<span>${time}</span></div>`
}