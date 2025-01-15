import { getToken } from "./handleToken";

async function home() {

}

async function branches() {
    try {
        const token = getToken();
        const response = await fetch("http://localhost:5050/api/router/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {

    }
}

function users() {
    return (<></>);
}

export default function enroute(root: string) {
    if (root === "home") {

    }
    else if (root === "users") {

    }
    else if (root === "branches") {

    }
    else if (root === "exit") {

    }
    else {

    }
    return;
}