import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState {
  entries: Entry[];
}

interface EntriesProviderProps {
  children: React.ReactNode
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pending: Prospd dasdasdas asrewropkvn asawsewqijc ewoieq mdcawqeqwo asd',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'In Progress: Juasd Yuitl impusum providersu trulolile adsad',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: 'Finished: Asaraum jalcatone uisloitum prodsd qeeutilpsum',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    };

    dispatch({ type: '[Entries] - Add-Entry', payload: newEntry });
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