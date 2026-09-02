// Central helper for talking to the OJAS backend.
// Every component that needs real data should go through apiFetch()

const SERVER_BASE =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

const API_BASE = `${SERVER_BASE}/api`;

export function getFileUrl(relativePath) {
    if (!relativePath) return "";
    return `${SERVER_BASE}${relativePath}`;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function isLoggedIn() {
    return !!getToken();
}

export function getStoredUser() {
    return {
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
        fullName: localStorage.getItem("fullName"),
        email: localStorage.getItem("email"),
        userId: localStorage.getItem("userId"),
        patientId: localStorage.getItem("patientId"),
    };
}

export function saveSession(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("fullName", data.fullName);
    localStorage.setItem("email", data.email);
    localStorage.setItem("userId", data._id);
}

export function clearSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("patientId");
}

export async function apiFetch(path, options = {}) {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let res;

    try {
        res = await fetch(`${API_BASE}${path}`, {
            ...options,
            headers,
        });
    } catch (networkError) {
        throw new Error(
            "Could not reach the server. Make sure the backend is running on port 5000."
        );
    }

    let data = {};

    try {
        data = await res.json();
    } catch (parseError) {
        data = {};
    }

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export async function apiUpload(path, formData, method = "POST") {
    const token = getToken();

    const headers = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let res;

    try {
        res = await fetch(`${API_BASE}${path}`, {
            method,
            headers,
            body: formData,
        });
    } catch (networkError) {
        throw new Error(
            "Could not reach the server. Make sure the backend is running on port 5000."
        );
    }

    let data = {};

    try {
        data = await res.json();
    } catch (parseError) {
        data = {};
    }

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export async function ensurePatientProfile() {
    let patientId = localStorage.getItem("patientId");

    if (patientId) return patientId;

    const existing = await apiFetch("/patients");

    if (existing && existing.length > 0) {
        patientId = existing[0]._id;
    } else {
        const created = await apiFetch("/patients", {
            method: "POST",
            body: JSON.stringify({}),
        });

        patientId = created._id;
    }

    localStorage.setItem("patientId", patientId);

    return patientId;
}
// Vercel deployment updates the API_BASE every time.