export const getData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Falha ao obter dados do gateway");
        }

        return data;
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
};