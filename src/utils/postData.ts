import { delay } from "./delay";

async function postData<TInput, TOutput>(url: string, data: TInput): Promise<TOutput> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();

    await delay(1000);

    return json;
}

export { postData }