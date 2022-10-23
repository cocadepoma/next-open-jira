import { FC, useEffect, useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

export interface EntriesState {
  entries: Entry[];
}

interface EntriesProviderProps {
  children: React.ReactNode
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  useEffect(() => {
    refreshEntries();
  }, []);

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>('/entries');

      dispatch({ type: '[Entries] - Refresh-data', payload: data });
    } catch (error) {
      console.log(error, 'An error ocurred while getting the entries');
    }
  };

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({ type: '[Entries] - Add-Entry', payload: data });
    } catch (error) {
      console.log(error, 'An error ocurred while adding a new entriy');
    }
  };

  const updateEntry = (entry: Entry) => {

    dispatch({ type: '[Entries] - Entry-Updated', payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};