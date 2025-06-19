import { delay } from "./delay";

async function deleteData(url: string): Promise<void> {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete: ${response.status} - ${errorText}`);
    }

    await delay(1000);
}

export { deleteData };
