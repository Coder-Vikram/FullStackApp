export const baseUrl = "http://localhost:5058/api";

export const postRequest = async (endpoint, body) => {
    try {
        const url = `${baseUrl}${endpoint}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get("content-type");
        let data;

        if (contentType?.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            return { error: true, message: data?.message || data || "Unknown error" };
        }

        return { error: false, data };
    } catch (error) {
        return { error: true, message: error.message || "Network error" };
    }
};
