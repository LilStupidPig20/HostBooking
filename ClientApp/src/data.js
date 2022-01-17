export async function GetTableInfo(id, date) {
    let API_URL = "https://localhost:5001/api/Entries/SearchTableInfoByIdTable?idTable=";
    API_URL = API_URL.concat(id)
    API_URL = API_URL.concat('&date=')
    let tempDate = (date.toISOString().slice(0,-13)).concat('00:00:00')
    API_URL = API_URL.concat(tempDate);

    const response = await fetch(API_URL);
    if(response.ok) {
        return await response.json()
    } else {
        throw new Error('Ошибка HTTP: ' + response.status);
    }
}

export async function GetEntriesForUser(id) {
    let API_URL = "https://localhost:5001/api/Entries/GetEntriesForUser?idUser=";
    API_URL = API_URL.concat(id)

    const response = await fetch(API_URL);
    if(response.ok) {
        return await response.json()
    } else {
        throw new Error('Ошибка HTTP: ' + response.status);
    }
}