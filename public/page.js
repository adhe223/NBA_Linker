$(document).ready(function() {
    $('.game-div').hover(
        function() {
            $( this ).addClass('game-div-selected', 400);
        }, function() {
            $( this ).removeClass('game-div-selected', 400);
        }
    );
});
