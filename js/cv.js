$(function() {
    console.log("Iniciando cv.js");
    initMenu();
    smoothScroll();
    addEventsForm();
});


var initMenu = function() {
    console.log("Iniciando menu");
    $(".navbar-item >a").click(function() {
        $(this).parent().siblings().removeClass("active")
            .end().addClass("active");
    })

}

var smoothScroll = function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 85
                }, 1000);
                return false;
            }
        }
    });
}


var addEventsForm = function() {

    $("#how-met").change(function() {
        var how_met = $("#how-met option:selected").val();

        if ("ot" === how_met) {
            $("#other").removeClass("hide");
        } else {
            $("#other").addClass("hide");
        }
    });

    $("#contact-form").submit(function(evt) {

        var observationsWords = $.trim($("#observations").val()).split(" ");
        if (observationsWords.length > 150) {
            alert("El número máximo de palabras permitidas son 150")
            return false;
        }

        evt.preventDefault();

        alert("Hola " + $("#name").val() + ". Gracias por ponerte en contacto conmigo. En breve te contestaremos ;)");
    });

}
