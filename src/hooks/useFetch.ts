import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T>({} as T);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    return { data, loading };
}