import { useEffect, useState } from "react";
import { List } from "../types";
import { api } from "../api/axios";

export const useLists = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lists, setLists] = useState<List[]>([]);

    const fetchLists = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<List[]>("/list");
            setLists(response.data);
        } catch (err: any) {
            console.log(err.response.status);
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const addList = async (title: string) => {
        if (!title.trim()) return null;
        try {
            const response = await api.post<List>("/list", { title });
            setLists(prev => [...prev, response.data]);
            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create list");
            return null;
        }
    };

    const deleteList = async (id: string) => {
        try {
            await api.delete(`/list/${id}`);
            setLists(prev => prev.filter(list => list._id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete list");
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    return {
        lists,
        loading,
        error,
        addList,
        deleteList,
        refresh: fetchLists,
    };
};
