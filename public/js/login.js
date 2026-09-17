document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.querySelector(
                "form"
            );


        if (!form) {

            return;

        }


        const usernameInput =
            form.querySelector(
                'input[name="username"]'
            );

        const passwordInput =
            form.querySelector(
                'input[name="password"]'
            );

        const submitButton =
            form.querySelector(
                'button[type="submit"]'
            );


        const message =
            document.createElement(
                "div"
            );


        message.style.marginTop =
            "12px";

        message.style.fontSize =
            "13px";

        message.style.minHeight =
            "20px";


        form.appendChild(
            message
        );


        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                message.textContent =
                    "";

                message.style.color =
                    "#b42318";


                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Ingresando...";


                try {

                    const response =
                        await fetch(
                            "/api/auth/login",
                            {
                                method:
                                    "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        username:
                                            usernameInput
                                                .value
                                                .trim(),

                                        password:
                                            passwordInput
                                                .value
                                    })
                            }
                        );


                    const result =
                        await response.json();


                    if (
                        !response.ok ||
                        !result.ok
                    ) {

                        message.textContent =
                            result.message ||
                            "No fue posible iniciar sesión.";

                        return;

                    }


                    window.location.href =
                        "/index.html";

                }
                catch (error) {

                    console.error(
                        error
                    );


                    message.textContent =
                        "No fue posible comunicarse con el servidor.";

                }
                finally {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Iniciar sesión";

                }

            }
        );

    }
);