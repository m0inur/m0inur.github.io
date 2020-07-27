    var darkMode = true;

    $("input").click(function () {
        darkMode = !darkMode
        console.log('toggle button was clicked')
    });

    function animate() {
        requestAnimationFrame(animate)


        if (darkMode) {
            $('body').css("background", "#25233a");
            $('body').css("color", "#e5e5ea");

            $(".card").css("background-color", "#383358")
            // $(".card").removeClass("card")
        } else {
            // console.log("white mode is true");#
            $('body').css({
                background: "-webkit-gradient(linear, left top, left bottom, from(#B721FF), to(#21D4FD))"
            });
            $('body').css("color", "#333");

            // $(".card").toggleClass("card")
            // $(".card").removeClass("dark-card")

            $(".card").css("background-color", "#fff")
            // $("body").css("background-image", "linear-gradient(0deg, #21D4FD, #B721FF);");
            /* background-image: linear-gradient(0deg, #21D4FD, #B721FF); */
        }

    }

    animate();