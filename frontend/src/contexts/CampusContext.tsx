'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Campus, CampusCreate, CampusUpdate, campusService } from '@/api';

interface CampusContextType {
  campuses: Campus[];
  loading: boolean;
  error: string | null;
  fetchCampuses: () => Promise<void>;
  addCampus: (data: CampusCreate) => Promise<Campus>;
  editCampus: (id: string, data: CampusUpdate) => Promise<Campus>;
  removeCampus: (id: string) => Promise<void>;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampuses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await campusService.listAll();
      setCampuses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch campuses');
      console.error('Error fetching campuses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCampus = useCallback(
    async (data: CampusCreate): Promise<Campus> => {
      try {
        const newCampus = await campusService.create(data);
        setCampuses((prev) => [...prev, newCampus]);
        return newCampus;
      } catch (err: any) {
        setError(err.message || 'Failed to add campus');
        throw err;
      }
    },
    []
  );

  const editCampus = useCallback(
    async (id: string, data: CampusUpdate): Promise<Campus> => {
      try {
        const updatedCampus = await campusService.update(id, data);
        setCampuses((prev) =>
          prev.map((campus) => (campus.id === id ? updatedCampus : campus))
        );
        return updatedCampus;
      } catch (err: any) {
        setError(err.message || 'Failed to edit campus');
        throw err;
      }
    },
    []
  );

  const removeCampus = useCallback(async (id: string) => {
    try {
      await campusService.delete(id);
      setCampuses((prev) => prev.filter((campus) => campus.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete campus');
      throw err;
    }
  }, []);

  return (
    <CampusContext.Provider
      value={{ campuses, loading, error, fetchCampuses, addCampus, editCampus, removeCampus }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = (): CampusContextType => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within CampusProvider');
  }
  return context;
};
