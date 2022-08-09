import { useState } from "react"

export const useLoading = (value: boolean = false) => {
    const [loading, setLoading] = useState(value);

    return {
        loading,
        showLoading() { setLoading(true) },
        hideLoading() { setLoading(false) }
    }
}