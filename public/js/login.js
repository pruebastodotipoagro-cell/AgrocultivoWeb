const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const loginButton =
    document.getElementById("loginButton");

const loginError =
    document.getElementById("loginError");

togglePassword.addEventListener(
    "click",
    () => {
        const showing =
            passwordInput.type === "text";

        passwordInput.type =
            showing
                ? "password"
                : "text";
    }
);

loginForm.addEventListener(
    "submit",
    async event => {
        event.preventDefault();

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value.trim();

        loginError.hidden = true;

        if (!username || !password) {
            showError(
                "Ingresa tu usuario y contraseña."
            );

            return;
        }

        loginButton.disabled = true;
        loginButton.textContent =
            "Ingresando...";

        await new Promise(resolve =>
            setTimeout(resolve, 400)
        );

        /*
         * LOGIN TEMPORAL
         *
         * Por ahora cualquier usuario y contraseña
         * permiten entrar para poder revisar el diseño.
         *
         * Luego sustituiremos esto por:
         * POST /api/auth/login
         */
        window.location.href =
            "/index.html";
    }
);

function showError(message) {
    loginError.textContent = message;
    loginError.hidden = false;

    loginButton.disabled = false;
    loginButton.textContent =
        "Iniciar sesión";
}