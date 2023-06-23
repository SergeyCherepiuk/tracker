export async function fetchUserById(id) {
    const response = await fetch(`http://localhost:4321/user/${id}`)
    return { data: await response.json(), isOk: response.ok }
}

export async function signUp(signUpData) {
    const response = await fetch("http://localhost:4321/auth/signup", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(signUpData)
    })
    return { data: await response.json(), isOk: response.ok }
}

export async function logIn(logInData) {
    const response = await fetch("http://localhost:4321/auth/login", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(logInData)
    })
    return { data: await response.json(), isOk: response.ok }
}

export async function deleteUser(userId) {
     const response = await fetch("http://localhost:4321/auth/delete", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ id: userId })
     })
     return { data: await response.json(), isOk: response.ok }
}