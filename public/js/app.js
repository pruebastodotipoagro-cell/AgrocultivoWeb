const currentDate =
    document.getElementById("currentDate");

const currentTime =
    document.getElementById("currentTime");

const greetingText =
    document.getElementById("greetingText");

const dayPeriodIcon =
    document.getElementById("dayPeriodIcon");

const welcomeTitle =
    document.getElementById("welcomeTitle");

const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");

const navItems =
    document.querySelectorAll(
        ".nav-item[data-page]"
    );

const mainContent =
    document.getElementById("mainContent");

const logoutButton =
    document.getElementById("logoutButton");

const sidebarUserName =
    document.getElementById(
        "sidebarUserName"
    );

const sidebarUserRole =
    document.getElementById(
        "sidebarUserRole"
    );

const reportsToggle =
    document.getElementById(
        "reportsToggle"
    );

const reportsGroup =
    document.getElementById(
        "reportsGroup"
    );


/* =========================================================
   USUARIO TEMPORAL
========================================================= */

const temporaryUser = {
    name: "Administrador",
    role: "Administrador"
};

sidebarUserName.textContent =
    temporaryUser.name;

sidebarUserRole.textContent =
    temporaryUser.role;

welcomeTitle.textContent =
    `Bienvenido, ${temporaryUser.name}`;


/* =========================================================
   DATOS DE PRUEBA
========================================================= */

const mockSales = [
    {
        id: 1,
        date: "16/09/2026",
        time: "04:38 PM",
        document: "26593",
        customer: "Consumidor Final",
        invoiceName: "Consumidor Final",
        nit: "CF",
        address: "Ciudad",
        type: "Contado",
        cashier: "ROCIO RAMOS",
        paymentMethod: "Efectivo",

        subtotal: 355.00,

        felStatus: "pending",

        series: "",
        dteNumber: "",
        authorization: "",
        certificationDate: "",

        items: [
            {
                id: 101,
                quantity: 3,
                description: "YODOTIN 60ML UNIDAD",
                price: 20.00,
                discount: 0
            },
            {
                id: 102,
                quantity: 1,
                description: "OXIVET 100 GRAMOS",
                price: 30.00,
                discount: 0
            },
            {
                id: 103,
                quantity: 2,
                description: "EMPAQUE DE EMBOLO",
                price: 10.00,
                discount: 0
            },
            {
                id: 104,
                quantity: 1,
                description: "PISTOLA PARA BOMBA",
                price: 35.00,
                discount: 0
            },
            {
                id: 105,
                quantity: 1,
                description: "FIEL AMIGO 50 LIBRAS",
                price: 210.00,
                discount: 0
            }
        ]
    },

    {
        id: 2,
        date: "16/09/2026",
        time: "04:15 PM",
        document: "F-1048",
        customer: "Rafael Barrera",
        invoiceName: "Rafael Barrera",
        nit: "4587621-8",
        address: "Asunción Mita, Jutiapa",
        type: "Crédito",
        cashier: "ADAN HERNANDEZ",
        paymentMethod: "Crédito",

        subtotal: 1265.00,

        felStatus: "pending",

        series: "",
        dteNumber: "",
        authorization: "",
        certificationDate: "",

        items: [
            {
                id: 201,
                quantity: 5,
                description: "FERTILIZANTE GRANULADO",
                price: 253.00,
                discount: 0
            }
        ]
    },

    {
        id: 3,
        date: "15/09/2026",
        time: "03:21 PM",
        document: "26591",
        customer: "Consumidor Final",
        invoiceName: "Consumidor Final",
        nit: "CF",
        address: "Ciudad",
        type: "Contado",
        cashier: "ROCIO RAMOS",
        paymentMethod: "Tarjeta",

        subtotal: 245.50,

        felStatus: "certified",

        series: "B73CF228",
        dteNumber: "15421418",

        authorization:
            "B73CF228-0065-4C61-B504-15421418",

        certificationDate:
            "15/09/2026 03:22 PM",

        items: [
            {
                id: 301,
                quantity: 1,
                description: "HERBICIDA DE PRUEBA",
                price: 145.50,
                discount: 0
            },
            {
                id: 302,
                quantity: 2,
                description: "PRODUCTO AGRÍCOLA",
                price: 50.00,
                discount: 0
            }
        ]
    }
];


/* =========================================================
   ESTADO
========================================================= */

let currentTicketType =
    "Contado";

let currentDetailOrigin =
    "ventas-generales";


/* =========================================================
   FECHA Y HORA
========================================================= */

function updateDateTime() {

    const now =
        new Date();

    currentDate.textContent =
        new Intl.DateTimeFormat(
            "es-GT",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        ).format(now);

    currentTime.textContent =
        new Intl.DateTimeFormat(
            "es-GT",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        ).format(now);

    const hour =
        now.getHours();

    let greeting =
        "Buenos días";

    let icon =
        "☀";

    if (
        hour >= 12 &&
        hour < 18
    ) {
        greeting =
            "Buenas tardes";
    }
    else if (
        hour >= 18 ||
        hour < 5
    ) {
        greeting =
            "Buenas noches";

        icon =
            "☾";
    }

    greetingText.textContent =
        `${greeting}, ${temporaryUser.name}`;

    dayPeriodIcon.textContent =
        icon;
}

updateDateTime();

setInterval(
    updateDateTime,
    1000
);


/* =========================================================
   MENÚ
========================================================= */

menuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


reportsToggle.addEventListener(
    "click",
    () => {

        reportsGroup.classList.toggle(
            "open"
        );

    }
);


/* =========================================================
   NAVEGACIÓN
========================================================= */

navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                navItems.forEach(
                    nav =>
                        nav.classList.remove(
                            "active"
                        )
                );

                item.classList.add(
                    "active"
                );

                const page =
                    item.dataset.page;

                const reportPages = [
                    "ventas-generales",
                    "corte-cajero",
                    "corte-general",
                    "cuadre-caja"
                ];

                if (
                    reportPages.includes(
                        page
                    )
                ) {

                    reportsGroup.classList.add(
                        "open"
                    );

                }

                loadPage(
                    page
                );

                if (
                    window.innerWidth <= 900
                ) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    }
);


/* =========================================================
   CARGAR PÁGINA
========================================================= */

function loadPage(page) {

    resetContentScroll();

    if (
        page === "home"
    ) {

        renderHome();
        return;

    }

    if (
        page === "tickets"
    ) {

        renderTickets();
        return;

    }

    if (
        page === "ventas-generales"
    ) {

        renderGeneralSales();
        return;

    }


    const pages = {

        cambiarias: {
            title:
                "Factura Cambiaria",

            description:
                "Gestión y certificación de facturas cambiarias."
        },

        envios: {
            title:
                "Envíos",

            description:
                "Administración y seguimiento de paquetes."
        },

        "corte-cajero": {
            title:
                "Corte por cajero",

            description:
                "Consulta de ventas y movimientos por cajero."
        },

        "corte-general": {
            title:
                "Corte general",

            description:
                "Resumen general de operaciones del día."
        },

        "cuadre-caja": {
            title:
                "Cuadre de caja",

            description:
                "Conteo, cierre y cuadre del efectivo."
        }

    };


    const selected =
        pages[page];

    if (!selected) {

        return;

    }


    mainContent.innerHTML = `
        <section class="page-placeholder">

            <div class="page-header">

                <div>

                    <h1>
                        ${selected.title}
                    </h1>

                    <p>
                        ${selected.description}
                    </p>

                </div>

                <button
                    class="refresh-button"
                    type="button"
                >
                    ↻ Actualizar
                </button>

            </div>

            <div class="empty-module">
                Este módulo se diseñará después.
            </div>

        </section>
    `;
}


/* =========================================================
   INICIO
========================================================= */

function renderHome() {

    mainContent.innerHTML = `
        <section class="home-view">

            <div class="welcome-card">

                <span class="welcome-kicker">
                    INNOVACIONES AGRÍCOLAS
                </span>

                <h1>
                    Bienvenido, ${temporaryUser.name}
                </h1>

                <p>
                    Sistema de Innovaciones Agrícolas de Guatemala
                </p>

                <span class="welcome-help">
                    Seleccione una opción del menú para comenzar.
                </span>

            </div>

        </section>
    `;
}


/* =========================================================
   TICKETS
========================================================= */

function renderTickets() {

    resetContentScroll();

    const sale =
        getLatestTicketSale(
            currentTicketType
        );


    mainContent.innerHTML = `
        <section class="tickets-page">

            <div class="page-header">

                <div>

                    <h1>
                        Tickets
                    </h1>

                    <p>
                        Prepare, certifique e imprima la última venta recibida.
                    </p>

                </div>

                <button
                    class="refresh-button"
                    id="ticketsRefreshButton"
                    type="button"
                >
                    ↻ Actualizar ventas
                </button>

            </div>


            <div class="ticket-tabs">

                <button
                    class="ticket-tab ${
                        currentTicketType ===
                        "Contado"
                            ? "active"
                            : ""
                    }"
                    data-ticket-type="Contado"
                    type="button"
                >
                    Contado
                </button>


                <button
                    class="ticket-tab ${
                        currentTicketType ===
                        "Crédito"
                            ? "active"
                            : ""
                    }"
                    data-ticket-type="Crédito"
                    type="button"
                >
                    Crédito
                </button>

            </div>


            ${
                sale
                    ?
                    renderSingleTicket(
                        sale
                    )
                    :
                    `
                        <div class="ticket-no-sale">

                            <h2>
                                No hay ventas pendientes
                            </h2>

                            <p>
                                Presione Actualizar ventas para consultar nuevas ventas.
                            </p>

                        </div>
                    `
            }

        </section>
    `;


    bindTicketPageEvents();


    if (
        sale
    ) {

        bindTicketEditorEvents(
            sale
        );

    }
}


/* =========================================================
   ÚLTIMA VENTA
========================================================= */

function getLatestTicketSale(
    type
) {

    const sales =
        mockSales.filter(
            sale =>
                sale.type ===
                type
        );


    if (
        sales.length === 0
    ) {

        return null;

    }


    return sales[0];
}


/* =========================================================
   PANTALLA ÚNICA TICKET
========================================================= */

function renderSingleTicket(
    sale
) {

    const total =
        calculateSaleTotal(
            sale
        );


    /* =====================================================
       IMPORTANTE:
       PRECIOS CONTADO / CRÉDITO SOLO APARECEN
       EN LA PESTAÑA CRÉDITO
    ===================================================== */

    const showPriceSelector =
        sale.type === "Crédito";


    return `
        <section class="single-ticket-card">

            <div class="single-ticket-header">

                <div>

                    <span class="ticket-editor-kicker">
                        ÚLTIMA VENTA
                    </span>

                    <h2>
                        Venta #${sale.document}
                    </h2>

                    <div class="latest-sale-meta">

                        <span>
                            ${sale.customer}
                        </span>

                        <span class="meta-divider">
                            •
                        </span>

                        <span>
                            ${sale.cashier}
                        </span>

                        <span class="meta-divider">
                            •
                        </span>

                        <span>
                            ${sale.paymentMethod}
                        </span>

                        <span class="meta-divider">
                            •
                        </span>

                        <span>
                            ${sale.date} ${sale.time}
                        </span>

                    </div>

                </div>


                <div class="single-ticket-total">

                    <span>
                        Total a imprimir
                    </span>

                    <strong
                        id="ticketFinalTotal"
                    >
                        Q${total.toFixed(2)}
                    </strong>

                </div>

            </div>


            <div class="ticket-section-title">

                <div>

                    <h3>
                        Datos de facturación
                    </h3>

                    <p>
                        Modifique los datos únicamente si el cliente lo solicita.
                    </p>

                </div>

            </div>


            <div class="ticket-customer-section">

                <div class="ticket-form-field ticket-field-wide">

                    <label>
                        Cliente
                    </label>

                    <select
                        id="ticketCustomer"
                    >

                        <option>
                            ${sale.customer}
                        </option>

                    </select>

                </div>


                <div class="ticket-form-field">

                    <label>
                        NIT
                    </label>

                    <div class="ticket-inline-field">

                        <input
                            id="ticketNit"
                            type="text"
                            value="${
                                sale.nit ||
                                "CF"
                            }"
                        >

                        <button
                            class="verify-nit-button"
                            id="verifyNitButton"
                            type="button"
                        >
                            Verificar NIT
                        </button>

                    </div>

                </div>


                <div class="ticket-form-field">

                    <label>
                        Nombre factura
                    </label>

                    <input
                        id="ticketInvoiceName"
                        type="text"
                        value="${
                            sale.invoiceName ||
                            "Consumidor Final"
                        }"
                    >

                </div>


                <div class="ticket-form-field ticket-field-wide">

                    <label>
                        Dirección
                    </label>

                    <input
                        id="ticketAddress"
                        type="text"
                        value="${
                            sale.address ||
                            "Ciudad"
                        }"
                    >

                </div>

            </div>


            <div
                class="ticket-options-card ${
                    showPriceSelector
                        ? ""
                        : "ticket-options-fel-only"
                }"
            >

                ${
                    showPriceSelector
                        ?
                        `
                            <div class="ticket-option-block">

                                <div class="ticket-option-title">
                                    Precio de venta
                                </div>


                                <div class="ticket-price-selector">

                                    <label class="ticket-price-option">

                                        <input
                                            type="radio"
                                            name="ticketPriceType"
                                            value="cash"
                                            checked
                                        >

                                        <span>
                                            Precio contado
                                        </span>

                                    </label>


                                    <label class="ticket-price-option">

                                        <input
                                            type="radio"
                                            name="ticketPriceType"
                                            value="credit"
                                        >

                                        <span>
                                            Precio crédito
                                        </span>

                                        <small>
                                            +3%
                                        </small>

                                    </label>

                                </div>


                                <span class="ticket-option-help price-help">
                                    El 3% se aplicará automáticamente cuando conectemos el backend.
                                </span>

                            </div>
                        `
                        :
                        ""
                }


                <div class="ticket-option-block fel-option-block">

                    <div>

                        <div class="ticket-option-title">
                            Certificación
                        </div>

                        <span class="ticket-option-help">
                            Desactive para imprimir un recibo no FEL.
                        </span>

                    </div>


                    <label class="fel-switch">

                        <input
                            type="checkbox"
                            id="ticketFelEnabled"
                            checked
                        >

                        <span class="fel-switch-slider">
                        </span>

                        <strong id="ticketFelLabel">
                            Certificar FEL
                        </strong>

                    </label>

                </div>

            </div>


            <div
                class="non-fel-warning"
                id="nonFelWarning"
                hidden
            >

                <strong>
                    RECIBO NO CERTIFICADO
                </strong>

                <span>
                    Este documento se imprimirá sin certificación FEL.
                </span>

            </div>


            <div class="ticket-section-title products-title">

                <div>

                    <h3>
                        Productos de la venta
                    </h3>

                    <p>
                        Puede aplicar descuento antes de imprimir.
                    </p>

                </div>

            </div>


            <div class="ticket-products-table-wrap">

                <table class="ticket-products-table">

                    <thead>

                        <tr>
                            <th>Cant.</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Descuento</th>
                            <th>Total</th>
                        </tr>

                    </thead>


                    <tbody>

                        ${
                            sale.items
                                .map(
                                    item => {

                                        const itemTotal =
                                            calculateItemTotal(
                                                item
                                            );

                                        return `
                                            <tr>

                                                <td>
                                                    ${item.quantity}
                                                </td>

                                                <td class="ticket-product-name">
                                                    ${item.description}
                                                </td>

                                                <td>
                                                    Q${item.price.toFixed(2)}
                                                </td>

                                                <td>

                                                    <div class="discount-input-wrap">

                                                        <span>
                                                            Q
                                                        </span>

                                                        <input
                                                            class="ticket-discount-input"
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value="${item.discount || 0}"
                                                            data-item-id="${item.id}"
                                                        >

                                                    </div>

                                                </td>

                                                <td
                                                    class="ticket-line-total"
                                                    id="ticketLineTotal-${item.id}"
                                                >
                                                    Q${itemTotal.toFixed(2)}
                                                </td>

                                            </tr>
                                        `;

                                    }
                                )
                                .join("")
                        }

                    </tbody>

                </table>

            </div>


            <div class="ticket-summary-row">

                <div class="ticket-summary-info">

                    <span>
                        Método de pago
                    </span>

                    <strong>
                        ${sale.paymentMethod}
                    </strong>

                </div>


                <div class="ticket-summary-totals">

                    <div>

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            Q${sale.subtotal.toFixed(2)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Descuento
                        </span>

                        <strong
                            id="ticketDiscountTotal"
                        >
                            Q${calculateSaleDiscount(
                                sale
                            ).toFixed(2)}
                        </strong>

                    </div>


                    <div class="ticket-summary-grand-total">

                        <span>
                            Total
                        </span>

                        <strong
                            id="ticketSummaryTotal"
                        >
                            Q${total.toFixed(2)}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="ticket-editor-actions">

                <button
                    class="ticket-clear-button"
                    id="clearTicketButton"
                    type="button"
                >
                    Limpiar cambios
                </button>


                ${
                    sale.felStatus ===
                    "certified"
                        ?
                        `
                            <button
                                class="ticket-main-print-button"
                                id="printTicketButton"
                                type="button"
                            >

                                <span id="ticketPrintButtonText">
                                    Reimprimir ticket
                                </span>

                            </button>
                        `
                        :
                        `
                            <button
                                class="ticket-main-print-button"
                                id="printTicketButton"
                                type="button"
                            >

                                <span id="ticketPrintButtonText">
                                    Certificar e imprimir ticket
                                </span>

                            </button>
                        `
                }

            </div>


            <div
                class="ticket-action-message"
                id="ticketActionMessage"
            >
            </div>

        </section>
    `;
}


/* =========================================================
   EVENTOS PÁGINA TICKETS
========================================================= */

function bindTicketPageEvents() {

    document
        .querySelectorAll(
            ".ticket-tab"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        currentTicketType =
                            button.dataset
                                .ticketType;

                        renderTickets();

                    }
                );

            }
        );


    document
        .getElementById(
            "ticketsRefreshButton"
        )
        .addEventListener(
            "click",
            () => {

                renderTickets();

            }
        );
}


/* =========================================================
   EVENTOS EDITOR TICKET
========================================================= */

function bindTicketEditorEvents(
    sale
) {

    /* =====================================================
       DESCUENTOS
    ===================================================== */

    document
        .querySelectorAll(
            ".ticket-discount-input"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    () => {

                        const itemId =
                            Number(
                                input.dataset
                                    .itemId
                            );

                        const item =
                            sale.items.find(
                                product =>
                                    product.id ===
                                    itemId
                            );


                        if (!item) {

                            return;

                        }


                        let discount =
                            Number(
                                input.value
                            );


                        if (
                            Number.isNaN(
                                discount
                            ) ||
                            discount < 0
                        ) {

                            discount = 0;

                        }


                        const maxDiscount =
                            item.quantity *
                            item.price;


                        if (
                            discount >
                            maxDiscount
                        ) {

                            discount =
                                maxDiscount;

                            input.value =
                                maxDiscount.toFixed(
                                    2
                                );

                        }


                        item.discount =
                            discount;


                        const itemTotal =
                            calculateItemTotal(
                                item
                            );


                        const line =
                            document.getElementById(
                                `ticketLineTotal-${item.id}`
                            );


                        if (
                            line
                        ) {

                            line.textContent =
                                `Q${itemTotal.toFixed(2)}`;

                        }


                        updateTicketTotals(
                            sale
                        );

                    }
                );

            }
        );


    /* =====================================================
       NIT
    ===================================================== */

    document
        .getElementById(
            "verifyNitButton"
        )
        .addEventListener(
            "click",
            () => {

                const nitInput =
                    document.getElementById(
                        "ticketNit"
                    );

                const invoiceNameInput =
                    document.getElementById(
                        "ticketInvoiceName"
                    );

                const addressInput =
                    document.getElementById(
                        "ticketAddress"
                    );

                const message =
                    document.getElementById(
                        "ticketActionMessage"
                    );


                const nit =
                    nitInput
                        .value
                        .trim();


                if (
                    !nit ||
                    nit.toUpperCase() ===
                    "CF"
                ) {

                    nitInput.value =
                        "CF";

                    invoiceNameInput.value =
                        "Consumidor Final";

                    addressInput.value =
                        "Ciudad";

                    message.textContent =
                        "Consumidor Final seleccionado.";

                    message.className =
                        "ticket-action-message success";

                    return;

                }


                message.textContent =
                    "Aquí verificaremos el NIT con Megaprint cuando conectemos el backend.";

                message.className =
                    "ticket-action-message information";

            }
        );


    /* =====================================================
       PRECIO CONTADO / CRÉDITO
       SOLO EXISTE EN VENTAS DE CRÉDITO
    ===================================================== */

    document
        .querySelectorAll(
            'input[name="ticketPriceType"]'
        )
        .forEach(
            radio => {

                radio.addEventListener(
                    "change",
                    () => {

                        const message =
                            document.getElementById(
                                "ticketActionMessage"
                            );


                        if (
                            radio.value ===
                            "credit" &&
                            radio.checked
                        ) {

                            message.textContent =
                                "Precio crédito seleccionado. El backend aplicará el aumento del 3%.";

                            message.className =
                                "ticket-action-message information";

                        }
                        else if (
                            radio.value ===
                            "cash" &&
                            radio.checked
                        ) {

                            message.textContent =
                                "Precio contado seleccionado.";

                            message.className =
                                "ticket-action-message information";

                        }

                    }
                );

            }
        );


    /* =====================================================
       FEL
    ===================================================== */

    const felCheckbox =
        document.getElementById(
            "ticketFelEnabled"
        );

    const felLabel =
        document.getElementById(
            "ticketFelLabel"
        );

    const buttonText =
        document.getElementById(
            "ticketPrintButtonText"
        );

    const warning =
        document.getElementById(
            "nonFelWarning"
        );


    if (
        sale.felStatus ===
        "certified"
    ) {

        felCheckbox.checked =
            true;

        felCheckbox.disabled =
            true;

        felLabel.textContent =
            "Ya certificada";

    }
    else {

        felCheckbox.addEventListener(
            "change",
            () => {

                if (
                    felCheckbox.checked
                ) {

                    felLabel.textContent =
                        "Certificar FEL";

                    buttonText.textContent =
                        "Certificar e imprimir ticket";

                    warning.hidden =
                        true;

                }
                else {

                    felLabel.textContent =
                        "Recibo no FEL";

                    buttonText.textContent =
                        "Imprimir recibo no FEL";

                    warning.hidden =
                        false;

                }

            }
        );

    }


    /* =====================================================
       LIMPIAR
    ===================================================== */

    document
        .getElementById(
            "clearTicketButton"
        )
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "ticketNit"
                    )
                    .value =
                    "CF";


                document
                    .getElementById(
                        "ticketInvoiceName"
                    )
                    .value =
                    "Consumidor Final";


                document
                    .getElementById(
                        "ticketAddress"
                    )
                    .value =
                    "Ciudad";


                sale.items.forEach(
                    item => {

                        item.discount =
                            0;

                    }
                );


                renderTickets();

            }
        );


    /* =====================================================
       IMPRIMIR
    ===================================================== */

    document
        .getElementById(
            "printTicketButton"
        )
        .addEventListener(
            "click",
            () => {

                const nit =
                    document
                        .getElementById(
                            "ticketNit"
                        )
                        .value
                        .trim() ||
                    "CF";


                const invoiceName =
                    document
                        .getElementById(
                            "ticketInvoiceName"
                        )
                        .value
                        .trim() ||
                    "Consumidor Final";


                const felEnabled =
                    document
                        .getElementById(
                            "ticketFelEnabled"
                        )
                        ?.checked ?? true;


                const priceSelector =
                    document.querySelector(
                        'input[name="ticketPriceType"]:checked'
                    );


                const selectedPriceType =
                    priceSelector
                        ? priceSelector.value
                        : "credit";


                const message =
                    document.getElementById(
                        "ticketActionMessage"
                    );


                if (
                    sale.felStatus ===
                    "certified"
                ) {

                    message.textContent =
                        `Listo para reimprimir la factura de ${invoiceName}.`;

                    message.className =
                        "ticket-action-message success";

                    return;

                }


                if (
                    felEnabled
                ) {

                    if (
                        sale.type ===
                        "Crédito"
                    ) {

                        message.textContent =
                            `Listo para certificar con NIT ${nit}, usando ${
                                selectedPriceType ===
                                "credit"
                                    ? "precio crédito"
                                    : "precio contado"
                            }, e imprimir el ticket.`;

                    }
                    else {

                        message.textContent =
                            `Listo para certificar con NIT ${nit} e imprimir el ticket.`;

                    }

                }
                else {

                    message.textContent =
                        `Listo para imprimir recibo no FEL para ${invoiceName}.`;

                }


                message.className =
                    "ticket-action-message success";

            }
        );
}


/* =========================================================
   CÁLCULOS
========================================================= */

function calculateItemTotal(
    item
) {

    const gross =
        item.quantity *
        item.price;

    return Math.max(
        0,
        gross -
        Number(
            item.discount || 0
        )
    );
}


function calculateSaleDiscount(
    sale
) {

    return sale.items.reduce(
        (
            total,
            item
        ) =>
            total +
            Number(
                item.discount || 0
            ),
        0
    );
}


function calculateSaleTotal(
    sale
) {

    return sale.items.reduce(
        (
            total,
            item
        ) =>
            total +
            calculateItemTotal(
                item
            ),
        0
    );
}


function updateTicketTotals(
    sale
) {

    const discount =
        calculateSaleDiscount(
            sale
        );

    const total =
        calculateSaleTotal(
            sale
        );


    const discountElement =
        document.getElementById(
            "ticketDiscountTotal"
        );

    const summaryTotal =
        document.getElementById(
            "ticketSummaryTotal"
        );

    const finalTotal =
        document.getElementById(
            "ticketFinalTotal"
        );


    if (
        discountElement
    ) {

        discountElement.textContent =
            `Q${discount.toFixed(2)}`;

    }


    if (
        summaryTotal
    ) {

        summaryTotal.textContent =
            `Q${total.toFixed(2)}`;

    }


    if (
        finalTotal
    ) {

        finalTotal.textContent =
            `Q${total.toFixed(2)}`;

    }
}


/* =========================================================
   VENTAS GENERALES
========================================================= */

function renderGeneralSales() {

    resetContentScroll();

    mainContent.innerHTML = `
        <section class="sales-page">

            <div class="page-header">

                <div>

                    <h1>
                        Ventas generales
                    </h1>

                    <p>
                        Consulta todas las ventas registradas.
                    </p>

                </div>

                <button
                    class="refresh-button"
                    id="salesRefreshButton"
                    type="button"
                >
                    ↻ Actualizar
                </button>

            </div>


            <div class="sales-filters">

                <div class="sales-search">

                    <input
                        type="text"
                        id="salesSearchInput"
                        placeholder="Buscar por documento, cliente o NIT..."
                    >

                </div>

            </div>


            <div class="sales-table-card">

                <div class="table-scroll">

                    <table class="sales-table">

                        <thead>

                            <tr>
                                <th>Fecha</th>
                                <th>Documento</th>
                                <th>Cliente</th>
                                <th>Tipo</th>
                                <th>Cajero</th>
                                <th>Total</th>
                                <th>FEL</th>
                                <th></th>
                            </tr>

                        </thead>


                        <tbody
                            id="salesTableBody"
                        >
                        </tbody>

                    </table>

                </div>

            </div>

        </section>
    `;


    renderSalesRows(
        mockSales
    );


    document
        .getElementById(
            "salesSearchInput"
        )
        .addEventListener(
            "input",
            event => {

                const value =
                    event.target
                        .value
                        .trim()
                        .toLowerCase();


                const filtered =
                    mockSales.filter(
                        sale =>

                            sale.document
                                .toLowerCase()
                                .includes(value) ||

                            sale.customer
                                .toLowerCase()
                                .includes(value) ||

                            sale.nit
                                .toLowerCase()
                                .includes(value)

                    );


                renderSalesRows(
                    filtered
                );

            }
        );


    document
        .getElementById(
            "salesRefreshButton"
        )
        .addEventListener(
            "click",
            () => {

                renderSalesRows(
                    mockSales
                );

            }
        );
}


/* =========================================================
   FILAS VENTAS GENERALES
========================================================= */

function renderSalesRows(
    sales
) {

    const tbody =
        document.getElementById(
            "salesTableBody"
        );


    if (
        !tbody
    ) {

        return;

    }


    tbody.innerHTML =
        sales
            .map(
                sale => `
                    <tr>

                        <td>
                            ${sale.date}
                        </td>

                        <td>
                            <strong>
                                ${sale.document}
                            </strong>
                        </td>

                        <td>
                            ${sale.customer}
                        </td>

                        <td>
                            ${sale.type}
                        </td>

                        <td>
                            ${sale.cashier}
                        </td>

                        <td class="money-cell">
                            Q${calculateSaleTotal(
                                sale
                            ).toFixed(2)}
                        </td>

                        <td>
                            ${getFelBadge(
                                sale.felStatus
                            )}
                        </td>

                        <td class="action-cell">

                            <button
                                class="view-sale-button general-sale-detail-button"
                                data-sale-id="${sale.id}"
                                type="button"
                            >
                                Ver detalle
                            </button>

                        </td>

                    </tr>
                `
            )
            .join("");


    document
        .querySelectorAll(
            ".general-sale-detail-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        currentDetailOrigin =
                            "ventas-generales";

                        renderSaleDetail(
                            Number(
                                button.dataset
                                    .saleId
                            )
                        );

                    }
                );

            }
        );
}


/* =========================================================
   FEL BADGES
========================================================= */

function getFelBadge(
    status
) {

    if (
        status ===
        "certified"
    ) {

        return `
            <span class="status-badge status-certified">
                Certificada
            </span>
        `;

    }


    if (
        status ===
        "pending"
    ) {

        return `
            <span class="status-badge status-pending">
                Pendiente
            </span>
        `;

    }


    return `
        <span class="status-badge status-error">
            Error
        </span>
    `;
}


/* =========================================================
   DETALLE VENTA
========================================================= */

function renderSaleDetail(
    saleId
) {

    resetContentScroll();

    const sale =
        mockSales.find(
            item =>
                item.id ===
                saleId
        );


    if (
        !sale
    ) {

        return;

    }


    mainContent.innerHTML = `
        <section class="sale-detail-page">

            <div class="detail-topbar">

                <button
                    class="back-button"
                    id="backToSalesButton"
                    type="button"
                >
                    ← Volver a ventas
                </button>

                ${getFelBadge(
                    sale.felStatus
                )}

            </div>


            <div class="detail-heading">

                <div>

                    <span class="detail-kicker">
                        DOCUMENTO ${sale.document}
                    </span>

                    <h1>
                        Detalle de venta
                    </h1>

                </div>


                <div class="detail-total-main">

                    <span>
                        Total
                    </span>

                    <strong>
                        Q${calculateSaleTotal(
                            sale
                        ).toFixed(2)}
                    </strong>

                </div>

            </div>


            <div class="detail-grid">

                <section class="detail-card">

                    <div class="detail-card-header">

                        <h2>
                            Cliente y facturación
                        </h2>

                    </div>


                    <div class="detail-fields">

                        ${detailField(
                            "Cliente",
                            sale.customer
                        )}

                        ${detailField(
                            "Nombre factura",
                            sale.invoiceName
                        )}

                        ${detailField(
                            "NIT",
                            sale.nit
                        )}

                        ${detailField(
                            "Dirección",
                            sale.address
                        )}

                    </div>

                </section>


                <section class="detail-card">

                    <div class="detail-card-header">

                        <h2>
                            Información de venta
                        </h2>

                    </div>


                    <div class="detail-fields">

                        ${detailField(
                            "Fecha",
                            sale.date
                        )}

                        ${detailField(
                            "Documento",
                            sale.document
                        )}

                        ${detailField(
                            "Tipo",
                            sale.type
                        )}

                        ${detailField(
                            "Cajero",
                            sale.cashier
                        )}

                        ${detailField(
                            "Método de pago",
                            sale.paymentMethod
                        )}

                    </div>

                </section>

            </div>


            <section class="detail-card fel-card">

                <div class="detail-card-header fel-header">

                    <div>

                        <h2>
                            Información FEL
                        </h2>

                        <p>
                            Datos de certificación electrónica.
                        </p>

                    </div>

                    ${getFelBadge(
                        sale.felStatus
                    )}

                </div>


                ${
                    sale.felStatus ===
                    "certified"
                        ?
                        `
                            <div class="fel-data-grid">

                                ${detailField(
                                    "Serie",
                                    sale.series
                                )}

                                ${detailField(
                                    "No. DTE",
                                    sale.dteNumber
                                )}

                                ${detailField(
                                    "Autorización",
                                    sale.authorization
                                )}

                                ${detailField(
                                    "Fecha certificación",
                                    sale.certificationDate
                                )}

                            </div>
                        `
                        :
                        `
                            <div class="fel-message fel-message-pending">

                                <strong>
                                    Pendiente de certificación
                                </strong>

                                <span>
                                    Esta venta aún no cuenta con información FEL.
                                </span>

                            </div>
                        `
                }

            </section>


            <section class="detail-card">

                <div class="detail-card-header">

                    <h2>
                        Productos
                    </h2>

                </div>


                <div class="table-scroll">

                    <table class="detail-products-table">

                        <thead>

                            <tr>
                                <th>Cantidad</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Total</th>
                            </tr>

                        </thead>


                        <tbody>

                            ${
                                sale.items
                                    .map(
                                        item => `
                                            <tr>

                                                <td>
                                                    ${item.quantity}
                                                </td>

                                                <td>
                                                    ${item.description}
                                                </td>

                                                <td>
                                                    Q${item.price.toFixed(2)}
                                                </td>

                                                <td>
                                                    Q${Number(
                                                        item.discount || 0
                                                    ).toFixed(2)}
                                                </td>

                                                <td class="money-cell">
                                                    Q${calculateItemTotal(
                                                        item
                                                    ).toFixed(2)}
                                                </td>

                                            </tr>
                                        `
                                    )
                                    .join("")
                            }

                        </tbody>

                    </table>

                </div>


                <div class="detail-totals">

                    <div>

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            Q${sale.subtotal.toFixed(2)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Descuento
                        </span>

                        <strong>
                            Q${calculateSaleDiscount(
                                sale
                            ).toFixed(2)}
                        </strong>

                    </div>


                    <div class="detail-grand-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            Q${calculateSaleTotal(
                                sale
                            ).toFixed(2)}
                        </strong>

                    </div>

                </div>

            </section>


            <section class="detail-actions-card">

                <div>

                    <h2>
                        Acciones
                    </h2>

                    <p>
                        Opciones disponibles para esta venta.
                    </p>

                </div>


                <div class="detail-actions">

                    ${renderSaleActions(
                        sale
                    )}

                </div>

            </section>

        </section>
    `;


    document
        .getElementById(
            "backToSalesButton"
        )
        .addEventListener(
            "click",
            renderGeneralSales
        );
}


/* =========================================================
   CAMPO DETALLE
========================================================= */

function detailField(
    label,
    value
) {

    return `
        <div class="detail-field">

            <span>
                ${label}
            </span>

            <strong>
                ${value || "—"}
            </strong>

        </div>
    `;
}


/* =========================================================
   ACCIONES DETALLE
========================================================= */

function renderSaleActions(
    sale
) {

    if (
        sale.felStatus ===
        "certified"
    ) {

        return `
            <button
                class="secondary-action-button"
                type="button"
            >
                Ver PDF
            </button>

            <button
                class="primary-action-button"
                type="button"
            >
                Reimprimir
            </button>

            <button
                class="danger-action-button"
                type="button"
            >
                Anular
            </button>
        `;

    }


    return `
        <button
            class="primary-action-button"
            type="button"
        >
            Reintentar certificación
        </button>

        <button
            class="secondary-action-button"
            type="button"
        >
            Imprimir recibo
        </button>
    `;
}


/* =========================================================
   SCROLL
========================================================= */

function resetContentScroll() {

    if (
        mainContent
    ) {

        mainContent.scrollTop =
            0;

    }
}


/* =========================================================
   CERRAR SESIÓN
========================================================= */

logoutButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/login.html";

    }
);