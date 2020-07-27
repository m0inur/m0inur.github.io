    var darkMode = true;

    $("input").click(function () {
        darkMode = !darkMode

        // $("body").css("animation", "change-to-light");
        // $("body").css("animation", "3s");
        // $("body").css("-webkit-animation-play-state", "running");
    });

    function animate() {
        requestAnimationFrame(animate)


        if (darkMode) {
            $('body').css("background", "#25233a");
            $('body').css("color", "#e5e5ea");

            $(".card").css("background-color", "#383358")
            $(".card-text-gold").css("color", "#1EA51D")

            $("body").addClass("darkMode");
            $("body").removeClass("lightMode");
            // $(".card").removeClass("card")
        } else {
            // $("body").addClass("lightMode");
            // $("body").removeClass("darkMode");

            $('body').css({
                background: "-webkit-gradient(linear, left top, left bottom, from(#B721FF), to(#21D4FD))"
            });
            $('body').css("color", "#333");

            $(".card-text-gold").css("color", "#AAA500")
            $(".card").css("background-color", "#fff")
            // $("body").css("background-image", "linear-gradient(0deg, #21D4FD, #B721FF);");
            /* background-image: linear-gradient(0deg, #21D4FD, #B721FF); */
        }

    }

    animate();