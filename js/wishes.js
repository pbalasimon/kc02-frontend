$(function() {
    console.log("Iniciando .js");
    var API_URL = 'https://kc-html.firebaseio.com/wishes';

    var wishes = {};
    var wishList = $('#wishList');

    var getWishes = function() {

        $.ajax({
                type: "GET",
                url: API_URL + ".json"
            }).done(function(data) {
                wishes = data;
                drawWishes();
            })
            .fail(function(error) {
                alert("Error al obtener la lista de deseos");
            });
    }

    var drawWishes = function() {
        wishList.empty();

        if (wishes == null)  {
            wishList.append('<li class="wish-item">No tienes ningún deseo.</li>');
        } else {
            var contentToAdd = '';

            for (prop in wishes) {
                contentToAdd += '<li class="wish-item"><a href="' + wishes[prop].url + '" target="_blank">' + wishes[prop].name + '</a>&nbsp;&nbsp;&nbsp;<a data-key="' + prop + '" href="#" class="deleteWish" title="Eliminar">X</a></li>';
            }

            wishList.append(contentToAdd);
        }
    };

    var deleteWish = function(key) {
        $.ajax({
                type: "DELETE",
                url: API_URL + "/" + key + ".json"
            })
            .done(function(data) {
                getWishes();
            })
            .fail(function(error) {
                alert("Error al eliminar el elemento de la lista de deseos");
            });
    };

    $(document).on("click", ".deleteWish", function(event) {
        event.preventDefault();
        var key = $(this).data('key');
        deleteWish(key);
    });

    $("#wishes-form").submit(function(evt) {

        evt.preventDefault();

        var name = $("#productName").val();
        var key = name.replace(/ /g, '').replace(/\s/g, '').toLowerCase();
        var url = $("#productUrl").val();

        var data = {
            "name": name,
            "url": url
        };

        $.ajax({
                type: "PATCH",
                contentType: "application/json",
                data: JSON.stringify(data),
                url: API_URL + "/" + key + ".json",
            }).done(function(data) {
                $("#productName").val("");
                $("#productUrl").val("");
                getWishes();
            })
            .fail(function(error) {
                alert("Error al añadir el producto a la lista de deseos");
            });

    });

    setTimeout(function() {
        getWishes();
    }, 1);

});
