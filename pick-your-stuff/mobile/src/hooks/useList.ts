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
        } catch (error: any) {
            console.log(error.response.status);
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const addList = async (title: string) => {
        if (!title.trim()) return null;
        setLoading(true);
        setError(null);
        try {
            const response = await api.post<List>("/list", { title });
            setLists(prev => [...prev, response.data]);
            return response.data;
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to create list");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteList = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/list/${id}`);
            setLists(prev => prev.filter(list => list._id !== id));
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to delete list");
        } finally {
            setLoading(false);
        }
    };

    const shareList = async (listId: string, email: string) => {
        setError(null);
        if (email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return setError("Invalid email address");
        try {
            setLoading(true);
            const response = await api.post(`/list/share`, { listId, email });
            console.log(response.data);
            return response.data
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to share list");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLists();
    }, []);

    return {
        lists,
        loading,
        error,
        addList,
        deleteList,
        shareList,
        refresh: fetchLists,
    };
};
