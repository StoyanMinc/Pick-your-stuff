import { useEffect, useState } from 'react';
import { ListItem } from '../types';
import { api } from '../api/axios';

export const useListItems = (listId: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<ListItem[]>([]);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<ListItem[]>(`/list-item?listId=${listId}`);
            setItems(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (title: string) => {
        if (!title.trim()) return null;
        try {
            const response = await api.post<ListItem>('/list-item', { title, listId });
            setItems(prev => [...prev, response.data]);
            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add item');
            return null;
        }
    };

    const deleteItem = async (id: string) => {
        try {
            await api.delete(`/list-item/${id}`);
            setItems(prev => prev.filter(item => item._id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete item');
        }
    };

    const toggleItem = async (id: string, isChecked: boolean) => {
        try {
            await api.put(`/list-item/${id}`, { isChecked });
            setItems(prev => prev.map(item => item._id === id ? { ...item, isChecked } : item));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update item status');
        }
    };

    const checkAll = async (id: string) => {
        try {
            await api.patch(`/list-item/check-all/${id}`);
            setItems(prev => prev.map(i => ({ ...i, isChecked: true })));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to check all items');
        }
    };

    const uncheckAll = async (id: string) => {
        try {
            await api.patch(`/list-item/uncheck-all/${id}`);
            setItems(prev => prev.map(i => ({ ...i, isChecked: false })));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to uncheck all items');
        }
    };

    useEffect(() => {
        fetchItems();
    }, [listId]);

    return {
        items,
        loading,
        error,
        addItem,
        deleteItem,
        toggleItem,
        checkAll,
        uncheckAll,
        refresh: fetchItems,
    };
};
