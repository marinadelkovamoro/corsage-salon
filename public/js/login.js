$("#user-login").on("submit", function(e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/api/login",
    data: {
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    }
  })
    .then(function(data) {
      window.location.replace("/");
    })
    .catch(function(err) {
      $("#login-error").text("Authentication failed. Please try again!");
      $("#email").val("");
      $("#password").val("");
    });
});
