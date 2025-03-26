import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';

interface CacheContextType {
  concertCache: Record<string, any>;
  musicianCache: Record<string, any>;
  repertoireCache: Record<string, any>;
  setConcertCache: (orchestraId: string, concertId: string, data: any) => void;
  setMusicianCache: (orchestraId: string, data: any) => void;
  setRepertoireCache: (orchestraId: string, concertId: string, data: any) => void;
  getConcertFromCache: (orchestraId: string, concertId: string) => any | null;
  getMusicianFromCache: (orchestraId: string) => any | null;
  getRepertoireFromCache: (orchestraId: string, concertId: string) => any | null;
  preloadAllData: (orchestraId: string, concertId: string) => Promise<void>;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export function CacheProvider({ children }: { children: React.ReactNode }) {
  const [concertCache, setConcertCacheState] = useState<Record<string, any>>({});
  const [musicianCache, setMusicianCacheState] = useState<Record<string, any>>({});
  const [repertoireCache, setRepertoireCacheState] = useState<Record<string, any>>({});
  
  // Use refs to maintain the latest cache state
  const concertCacheRef = useRef(concertCache);
  const musicianCacheRef = useRef(musicianCache);
  const repertoireCacheRef = useRef(repertoireCache);
  const preloadInProgressRef = useRef<Set<string>>(new Set());

  // Update refs when state changes
  useEffect(() => {
    concertCacheRef.current = concertCache;
  }, [concertCache]);

  useEffect(() => {
    musicianCacheRef.current = musicianCache;
  }, [musicianCache]);

  useEffect(() => {
    repertoireCacheRef.current = repertoireCache;
  }, [repertoireCache]);

  // Load cached data from localStorage on mount
  useEffect(() => {
    try {
      const savedConcertCache = localStorage.getItem('concertCache');
      const savedMusicianCache = localStorage.getItem('musicianCache');
      const savedRepertoireCache = localStorage.getItem('repertoireCache');

      if (savedConcertCache) {
        const parsed = JSON.parse(savedConcertCache);
        setConcertCacheState(parsed);
        concertCacheRef.current = parsed;
      }

      if (savedMusicianCache) {
        const parsed = JSON.parse(savedMusicianCache);
        setMusicianCacheState(parsed);
        musicianCacheRef.current = parsed;
      }

      if (savedRepertoireCache) {
        const parsed = JSON.parse(savedRepertoireCache);
        setRepertoireCacheState(parsed);
        repertoireCacheRef.current = parsed;
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
  }, []);

  // Save cache to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('concertCache', JSON.stringify(concertCache));
      localStorage.setItem('musicianCache', JSON.stringify(musicianCache));
      localStorage.setItem('repertoireCache', JSON.stringify(repertoireCache));
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }, [concertCache, musicianCache, repertoireCache]);

  const setConcertCache = useCallback((orchestraId: string, concertId: string, data: any) => {
    const cacheKey = `${orchestraId}-${concertId}`;
    console.log('setConcertCache called with:', { cacheKey, data });
    setConcertCacheState(prev => {
      const newState = {
        ...prev,
        [cacheKey]: data
      };
      console.log('New concert cache state:', newState);
      return newState;
    });
  }, []);

  const setMusicianCache = useCallback((orchestraId: string, data: any) => {
    console.log('Caching musicians for orchestra:', orchestraId, data);
    setMusicianCacheState(prev => ({
      ...prev,
      [orchestraId]: data
    }));
  }, []);

  const setRepertoireCache = useCallback((orchestraId: string, concertId: string, data: any) => {
    const cacheKey = `${orchestraId}-${concertId}`;
    console.log('Caching repertoire:', cacheKey, data);
    setRepertoireCacheState(prev => ({
      ...prev,
      [cacheKey]: data
    }));
  }, []);

  const getConcertFromCache = useCallback((orchestraId: string, concertId: string) => {
    const cacheKey = `${orchestraId}-${concertId}`;
    console.log('getConcertFromCache called with:', { cacheKey, currentCache: concertCacheRef.current });
    const cached = concertCacheRef.current[cacheKey];
    console.log('Cache lookup result:', cached);
    return cached || null;
  }, []);

  const getMusicianFromCache = useCallback((orchestraId: string) => {
    const cached = musicianCacheRef.current[orchestraId];
    console.log('Getting musicians from cache:', orchestraId, cached);
    return cached || null;
  }, []);

  const getRepertoireFromCache = useCallback((orchestraId: string, concertId: string) => {
    const cacheKey = `${orchestraId}-${concertId}`;
    const cached = repertoireCacheRef.current[cacheKey];
    console.log('Getting repertoire from cache:', cacheKey, cached);
    return cached || null;
  }, []);

  const preloadAllData = useCallback(async (orchestraId: string, concertId: string) => {
    const preloadKey = `${orchestraId}-${concertId}`;
    
    // Check if preload is already in progress
    if (preloadInProgressRef.current.has(preloadKey)) {
      console.log('Preload already in progress for:', preloadKey);
      return;
    }

    // Special case for acknowledgments page
    if (concertId === 'acks') {
      try {
        preloadInProgressRef.current.add(preloadKey);
        console.log('Preloading acknowledgments data for:', orchestraId);
        
        // Fetch musicians for this orchestra
        const { data: musicians, error: musiciansError } = await supabase
          .from('orchestra_musicians')
          .select('*')
          .eq('orchestra_id', orchestraId);

        if (musiciansError) {
          console.error('Error fetching musicians:', musiciansError);
          throw musiciansError;
        }

        if (musicians) {
          console.log('Found musicians:', musicians);
          // Sort musicians by ID before caching
          const sortedMusicians = [...musicians].sort((a, b) => a.id - b.id);
          setMusicianCache(orchestraId, sortedMusicians);
        }

        // Cache an empty object for acknowledgments to indicate it's been loaded
        setConcertCache(orchestraId, concertId, {});
        setRepertoireCache(orchestraId, concertId, []);

        console.log('Acknowledgments preload completed successfully');
      } catch (error) {
        console.error('Error in acknowledgments preload:', error);
        throw error;
      } finally {
        preloadInProgressRef.current.delete(preloadKey);
      }
      return;
    }

    // Check if data is already in cache
    const existingConcert = getConcertFromCache(orchestraId, concertId);
    const existingMusicians = getMusicianFromCache(orchestraId);
    const existingRepertoire = getRepertoireFromCache(orchestraId, concertId);

    if (existingConcert && existingMusicians && existingRepertoire) {
      console.log('All data already in cache for:', preloadKey);
      return;
    }

    try {
      preloadInProgressRef.current.add(preloadKey);
      console.log('Starting preload for concert:', { orchestraId, concertId });
      console.log('Current concert cache state:', concertCacheRef.current);
      
      // Fetch the specific concert
      const { data: concert, error: concertError } = await supabase
        .from('concerts')
        .select('*')
        .eq('orchestra_id', orchestraId)
        .eq('id', concertId)
        .single();

      if (concertError) {
        console.error('Error fetching concert:', concertError);
        throw concertError;
      }

      if (!concert) {
        console.error('Concert not found:', { orchestraId, concertId });
        throw new Error('Concert not found');
      }

      console.log('Found concert:', concert);

      // Cache the concert
      const cacheKey = `${orchestraId}-${concertId}`;
      setConcertCache(orchestraId, concertId, concert);

      // Fetch musicians for this orchestra
      const { data: musicians, error: musiciansError } = await supabase
        .from('orchestra_musicians')
        .select('*')
        .eq('orchestra_id', orchestraId);

      if (musiciansError) {
        console.error('Error fetching musicians:', musiciansError);
        throw musiciansError;
      }

      if (musicians) {
        console.log('Found musicians:', musicians);
        // Sort musicians by ID before caching
        const sortedMusicians = [...musicians].sort((a, b) => a.id - b.id);
        setMusicianCache(orchestraId, sortedMusicians);
      }

      // Fetch repertoire for this concert
      const { data: repertoire, error: repertoireError } = await supabase
        .from('programs')
        .select('*')
        .eq('concert_id', concertId)
        .eq('orchestra_id', orchestraId);

      if (repertoireError) {
        console.error('Error fetching repertoire:', repertoireError);
        throw repertoireError;
      }

      if (repertoire) {
        console.log('Found repertoire:', repertoire);
        setRepertoireCache(orchestraId, concertId, repertoire);
      }

      // Fetch artists for this concert
      const { data: artists, error: artistsError } = await supabase
        .from('artists')
        .select('*')
        .eq('concert_id', concertId)
        .eq('orchestra_id', orchestraId);

      if (artistsError) {
        console.error('Error fetching artists:', artistsError);
        throw artistsError;
      }

      if (artists) {
        console.log('Found artists:', artists);
        // Cache artists by their name for easy lookup
        const artistsCache: Record<string, any> = {};
        artists.forEach(artist => {
          artistsCache[artist.name] = artist;
        });
        setConcertCache(orchestraId, `${concertId}-artists`, artistsCache);
      }

      console.log('Preload completed successfully');
      console.log('Final concert cache state:', concertCacheRef.current);
    } catch (error) {
      console.error('Error in preloadAllData:', error);
      throw error;
    } finally {
      preloadInProgressRef.current.delete(preloadKey);
    }
  }, [getConcertFromCache, getMusicianFromCache, getRepertoireFromCache, setConcertCache, setMusicianCache, setRepertoireCache]);

  return (
    <CacheContext.Provider value={{
      concertCache,
      musicianCache,
      repertoireCache,
      setConcertCache,
      setMusicianCache,
      setRepertoireCache,
      getConcertFromCache,
      getMusicianFromCache,
      getRepertoireFromCache,
      preloadAllData
    }}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
} 