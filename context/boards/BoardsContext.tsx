import { createContext } from 'react';
import { Category, Entry } from '../../interfaces';

export interface ContextProps {
  boards: Category[];

  addNewEntry: (description: string, boardId: string) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (entry: Entry) => void;
  updateBoards: (boards: Category[]) => void;
}

export const BoardsContext = createContext({} as ContextProps);