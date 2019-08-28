$( document ).ready(function() {
    $('#loginBtn').click(function(){
        login();
    });

    $('#registerBtn').click(function(){
        register();
    });
})



async function login() {
    var email = $('#loginInputEmail').val();
    var password = $('#loginInputPassword').val();

    await apiHandler.login({ "email": email, "password": password });
    //console.log(await apiHandler.isAuthenticated());

    if (await apiHandler.isAuthenticated() == true) {
        window.location.replace("/");
    }
}

async function register() {
    try {
        var firstName = $('#registerFirstName').val();
        var lastName = $('#registerLastName').val();
        var email = $('#registerInputEmail').val();
        var password = $('#registerInputPassword').val();
        var passwordValid = $('#registerRepeatPassword').val();

        if (password != passwordValid) {
            throw new Error("Les mots de passe ne sont pas identiques");
        }

        await apiHandler.register({ "email": email, "password": password, "firstName": firstName, "lastName": lastName});
        window.location.replace("/login.html");

    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}
