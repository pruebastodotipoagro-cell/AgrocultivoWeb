require("dotenv").config();

const readline =
    require("readline");

const bcrypt =
    require("bcryptjs");

const pool =
    require("../config/database");


const users = [

    {
        username:
            "Ashlyn",

        fullName:
            "Ashlyn Gonzales",

        branch:
            "TIUCAL",

        cashierName:
            null
    },

    {
        username:
            "Rocio ramos",

        fullName:
            "Rocio",

        branch:
            "TIUCAL",

        cashierName:
            "ROCIO RAMOS"
    },

    {
        username:
            "Adan hernandez",

        fullName:
            "Adan Hernandez",

        branch:
            "TIUCAL",

        cashierName:
            "ADAN HERNANDEZ"
    },

    {
        username:
            "Fernando",

        fullName:
            "Fernando Gomez",

        branch:
            "TIUCAL",

        cashierName:
            "FERNANDO GOMEZ"
    },

    {
        username:
            "Paola",

        fullName:
            "Paola Valladares",

        branch:
            "ATESCATEMPA",

        cashierName:
            "PAOLA VALLADARES"
    },

    {
        username:
            "Carlos",

        fullName:
            "Carlos Lorenzana",

        branch:
            "ATESCATEMPA",

        cashierName:
            "CARLOS LORENZANA"
    }

];


const rl =
    readline.createInterface({
        input:
            process.stdin,

        output:
            process.stdout
    });


function askPassword(
    username
) {

    return new Promise(
        resolve => {

            rl.question(
                `Contraseña nueva para ${username}: `,
                answer => {

                    resolve(
                        answer
                    );

                }
            );

        }
    );

}


async function main() {

    try {

        console.log("");
        console.log(
            "USUARIOS AGROCULTIVO"
        );
        console.log(
            "===================="
        );
        console.log("");


        for (
            const user
            of users
        ) {

            let password =
                "";


            while (
                password.length < 8
            ) {

                password =
                    await askPassword(
                        user.username
                    );


                if (
                    password.length < 8
                ) {

                    console.log(
                        "La contraseña debe contener por lo menos 8 caracteres."
                    );

                }

            }


            const [branches] =
                await pool.query(
                    `
                    SELECT id
                    FROM branches
                    WHERE code = ?
                    LIMIT 1
                    `,
                    [
                        user.branch
                    ]
                );


            if (
                branches.length === 0
            ) {

                throw new Error(
                    `No existe la sucursal ${user.branch}`
                );

            }


            const passwordHash =
                await bcrypt.hash(
                    password,
                    12
                );


            await pool.query(
                `
                INSERT INTO users
                (
                    username,
                    full_name,
                    password_hash,
                    role,
                    branch_id,
                    quickbooks_cashier_name,
                    active
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    'CAJERO',
                    ?,
                    ?,
                    TRUE
                )

                ON DUPLICATE KEY UPDATE

                    full_name =
                        VALUES(full_name),

                    password_hash =
                        VALUES(password_hash),

                    role =
                        'CAJERO',

                    branch_id =
                        VALUES(branch_id),

                    quickbooks_cashier_name =
                        VALUES(
                            quickbooks_cashier_name
                        ),

                    active =
                        TRUE
                `,
                [
                    user.username,
                    user.fullName,
                    passwordHash,
                    branches[0].id,
                    user.cashierName
                ]
            );


            console.log(
                `✓ ${user.username}`
            );

        }


        console.log("");
        console.log(
            "Usuarios creados correctamente."
        );

    }
    catch (error) {

        console.error(
            "Error creando usuarios:",
            error
        );

    }
    finally {

        rl.close();

        await pool.end();

    }

}


main();