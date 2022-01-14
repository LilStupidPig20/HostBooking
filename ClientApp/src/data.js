export async function TablesColors(date) {
    let API_URL = "https://localhost:5001/api/Entries/GetHowBusyEachTableOnDate?date=";
    let tempDate = (date.toISOString().slice(0,-13)).concat('00:00:00');
    API_URL = API_URL.concat(tempDate);

    const response = await fetch(API_URL);
    const data =  await response.json()
    return data;
}