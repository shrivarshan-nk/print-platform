'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Shop, ShopCreate, ShopUpdate, shopService } from '@/api';

interface ShopContextType {
  shops: Shop[];
  loading: boolean;
  error: string | null;
  fetchShops: () => Promise<void>;
  addShop: (data: ShopCreate) => Promise<Shop>;
  editShop: (id: string, data: ShopUpdate) => Promise<Shop>;
  removeShop: (id: string) => Promise<void>;
  getShopsByCampus: (campusId: string) => Shop[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await shopService.listAll();
      setShops(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch shops');
      console.error('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addShop = useCallback(
    async (data: ShopCreate): Promise<Shop> => {
      try {
        const newShop = await shopService.create(data);
        setShops((prev) => [...prev, newShop]);
        return newShop;
      } catch (err: any) {
        setError(err.message || 'Failed to add shop');
        throw err;
      }
    },
    []
  );

  const editShop = useCallback(
    async (id: string, data: ShopUpdate): Promise<Shop> => {
      try {
        const updatedShop = await shopService.update(id, data);
        setShops((prev) => prev.map((shop) => (shop.id === id ? updatedShop : shop)));
        return updatedShop;
      } catch (err: any) {
        setError(err.message || 'Failed to edit shop');
        throw err;
      }
    },
    []
  );

  const removeShop = useCallback(async (id: string) => {
    try {
      await shopService.delete(id);
      setShops((prev) => prev.filter((shop) => shop.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete shop');
      throw err;
    }
  }, []);

  const getShopsByCampus = useCallback(
    (campusId: string) => {
      return shops.filter((shop) => shop.campus_id === campusId);
    },
    [shops]
  );

  return (
    <ShopContext.Provider
      value={{ shops, loading, error, fetchShops, addShop, editShop, removeShop, getShopsByCampus }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
};
