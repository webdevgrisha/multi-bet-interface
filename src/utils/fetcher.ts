import { delay } from "./delay";


async function fetcher<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const json = await response.json();

    await delay(1000);

    // throw new Error();
    // return [] as T;
    return json;
}

export {
    fetcher
}