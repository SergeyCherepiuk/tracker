export async function fetchElement(id) {
    const response = await fetch(`http://localhost:4321/api/element/${id}`)
    return await response.json()
}

export async function fetchElementsBy(timespan) {
    const response = await fetch(`http://localhost:4321/api/elements/${timespan}`)
    return await response.json()
}

export async function fetchElementsFromPreviousMonth() {
    const response = await fetch(`http://localhost:4321/api/elements/previous-month`)
    return await response.json()
}

export async function updateElement(elementToUpdate) {
    const response = await fetch("http://localhost:4321/api/element", {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(elementToUpdate)
    })
    return { data: await response.json(), isOk: response.ok }
}
  
export async function addElement(elementToAdd) {
    const response = await fetch("http://localhost:4321/api/element", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(elementToAdd)
    })
    return { data: await response.json(), isOk: response.ok }
}
  
export async function deleteElement(elementToDelete) {
    const response = await fetch("http://localhost:4321/api/element", {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ "_id": elementToDelete["_id"] })
    })
    return { isOk: response.ok }
}