export const randomizeRepo = (listRepo) => {
    let randomIndex = Math.floor(Math.random() * listRepo?.length);

    return listRepo[randomIndex];
}

export const fetchData = async (uri) => {
    try {
        let res = await fetch(uri);
        if (!res.ok)
            throw new Error(`Erreur: ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
