const API_ORIGIN = process.env.API_ORIGIN;

export async function fetchWrapper(apiKey, path, data) {
    const url = new URL(path, API_ORIGIN).toString();
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-NFTPass-Token': apiKey
        },
        body: JSON.stringify(data)
    });
    const respData = await resp.json();
    if (resp.ok) {
        return respData;
    } else {
        const e = new Error(respData?.error?.message) as any;
        e.code = respData?.error?.code || resp.status;
        throw e;
    }
}
