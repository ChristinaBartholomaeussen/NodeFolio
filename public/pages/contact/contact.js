function sendContactMessage() {
    fetch("/contact/api", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        })
    }).then(response => {
        if (response.status === 200) {

            toastr["success"]("Din mail er afsendt.");
            setTimeout(() => location.href = "/", 4000);

        } else if (response.status === 400) {
            toastr["warning"]("Udfyld alle felter.");
        }
        else {
            toastr["error"]("Der skete en fejl.");
        }
    });
}
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "4000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
document.getElementById("contact-button").addEventListener("click", sendContactMessage);
