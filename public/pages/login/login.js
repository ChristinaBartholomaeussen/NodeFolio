function validateLogin() {
    fetch("/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            user: document.getElementById("user").value,
            password: document.getElementById("password").value
        })
    }).then(response => {
        if (response.status === 200) {
            location.href = "/admin";
        }
        else if (response.status === 429) {
            document.getElementById("user").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("loginBtn").disabled = true;
            var myToast = toastr.error({
                timeOut: 0
            });
            const tenMin = 10;
            const currentDate = new Date().getTime();
            const timeToCountFrom = new Date(currentDate + tenMin * 60000)
            var x = setInterval(function () {
                var now = new Date().getTime();
                var distance = timeToCountFrom - now;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (minutes === 0 && seconds === 0) {
                    clearInterval(x);
                    myToast.slideDown();
                    location.href = "/auth"
                }
                myToast.find(".toast-message").text("Min: " + minutes + " Sec: " + seconds);
            }, 1000);
        }
        else {
            var wrongInfo = toastr.warning({
                timeOut: 2000,
                positionClass: "toast-top-center"
            });
            wrongInfo.find(".toast-message").text("Forkert login. Forsøg igen.");
            document.getElementById("user").value = "";
            document.getElementById("password").value = "";
        }
    })
}
document.getElementById("loginBtn").addEventListener("click", validateLogin);
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "0",
    "hideDuration": "0",
    "timeOut": "0",
    "extendedTimeOut": "0",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}