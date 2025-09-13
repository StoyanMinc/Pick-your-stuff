import { useEffect, useState } from "react";
import { List } from "../types";
import { api } from "../api/axios";

export const useLists = () => {
    const [listsLoading, setListsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ownedLists, setOwnedLists] = useState<List[]>([]);
    const [sharedLists, setSharedLists] = useState<List[]>([]);

    const fetchLists = async () => {
        setListsLoading(true);
        setError(null);
        try {
            const [ownedRes, sharedRes] = await Promise.all([
                api.get<List[]>("/list"),
                api.get<List[]>("/list/shared"),
            ]);
            setOwnedLists(ownedRes.data);
            setSharedLists(sharedRes.data);
        } catch (error: any) {
            console.log(error.response?.status);
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setListsLoading(false);
        }
    };

    const addList = async (title: string) => {
        if (!title.trim()) return null;
        setActionLoading(true);
        setError(null);
        try {
            const response = await api.post<List>("/list", { title });
            setOwnedLists(prev => [...prev, response.data]);
            return response.data;
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to create list");
            return null;
        } finally {
            setActionLoading(false);
        }
    };

    const deleteList = async (id: string) => {
        setActionLoading(true);
        setError(null);
        try {
            await api.delete(`/list/${id}`);
            setOwnedLists(prev => prev.filter(list => list._id !== id));
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to delete list");
        } finally {
            setActionLoading(false);
        }
    };

    const deleteSharedList = async (id: string) => {
        setActionLoading(true);
        setError(null);
        try {
            await api.delete(`/list/shared/${id}`);
            setSharedLists(prev => prev.filter(list => list._id !== id));
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to delete list");
        } finally {
            setActionLoading(false);
        }
    };

    const shareList = async (listId: string, email: string) => {
        if (email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            return { success: false, message: "Invalid email address" };
        }
        try {
            setActionLoading(true);
            await api.post(`/list/share`, { listId, email });
            return { success: true, message: "List shared successfully" };
        } catch (error: any) {
            const msg = error.response?.data?.message || "Failed to share list";
            setError(msg);
            return { success: false, message: msg };
        } finally {
            setActionLoading(false);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    return {
        ownedLists,
        sharedLists,
        listsLoading,
        actionLoading,
        error,
        addList,
        deleteList,
        deleteSharedList,
        shareList,
        refresh: fetchLists,
    };
};
