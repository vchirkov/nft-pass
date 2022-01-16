const VERIFY_URL = process.env.VERIFY_URL;

export async function fetchNFTS(apiKey, data) {
    const resp = await fetch(VERIFY_URL, {
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
