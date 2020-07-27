var darkMode = true;
var darkModeToggled = false;
var counter = 0;
$("input").click(function () {
    counter = 0
    darkMode = !darkMode
});

function animate() {
    requestAnimationFrame(animate)


    if (darkMode) {
        counter++


        $("body").addClass("bg-darkMode");
        $("body").removeClass("bg-lightMode");

        if (counter % 120 == 0) {
            $('body').css("background", "#25233a");
        }


        $(".card").addClass("card-darkMode");
        $(".card").removeClass("card-lightMode");


        $('body').css("color", "#e5e5ea");

        $(".card").css("background-color", "#383358")
        // $(".card-text-gold").css("color", "#1EA51D")

        $(".card-text-faded").css("color", "#CECECE")
    } else {
        counter++;
        $("body").addClass("bg-lightMode");
        $("body").removeClass("bg-darkMode");

        if (counter % 120 == 0) {
            $('body').css("background", "#448AFF")
            // $('body').css({
            //     background: "-webkit-gradient(linear, left top, left bottom, from(#B721FF), to(#21D4FD))"
            // });
        }


        $(".card").addClass("card-lightMode");
        $(".card").removeClass("card-darkMode");
        $('body').css("color", "#333");

        $(".card-text-faded").css("color", "#727272")
        $(".card-text-gold").css("color", "#44abff")
        $(".card").css("background-color", "#fff")
        // $("body").css("background-image", "linear-gradient(0deg, #21D4FD, #B721FF);");
        /* background-image: linear-gradient(0deg, #21D4FD, #B721FF); */
    }

}

animate();