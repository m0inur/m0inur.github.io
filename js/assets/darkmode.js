var darkMode = true;
var counter = 0;
$("input").click(function () {
    counter = 0
    darkMode = !darkMode
});

function animate() {
    requestAnimationFrame(animate)

    if (darkMode) {
        counter++

        if (!$("body").hasClass("bg-lightMode")) {

            $('body').css("background", "#25233a")
            $(".card").css("background-color", "#383358")
        }

        if ($("body").hasClass("bg-lightMode")) {
            $("body").addClass("bg-darkMode");
            $("body").removeClass("bg-lightMode");

            $(".card").addClass("card-darkMode");
            $(".card").removeClass("card-lightMode");
        }

        if (counter % 100 == 0) {
            $('body').css("background", "#25233a");
        }

        $('body').css("color", "#e5e5ea");

        $(".card").css("background-color", "#383358")

        $(".card-text-faded").css("color", "#CECECE")
    } else {
        counter++;
        $("body").addClass("bg-lightMode");
        $("body").removeClass("bg-darkMode");

        if (counter % 120 == 0) {
            $('body').css("background", "#448AFF")
        }


        $(".card").addClass("card-lightMode");
        $(".card").removeClass("card-darkMode");
        $('body').css("color", "#333");

        $(".card-text-faded").css("color", "#727272")
        $(".card-text-gold").css("color", "#44abff")
        $(".card").css("background-color", "#fff")

        $(".heart-img-text").css("color", "#B7B7B7")
    }

}

animate();