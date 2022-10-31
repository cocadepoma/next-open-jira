import { createContext } from 'react';
import { Category, Entry } from '../../interfaces';

export interface ContextProps {
  boards: Category[];

  addNewEntry: (description: string, boardId: string) => Promise<void>;
  updateEntry: (entry: Entry) => Promise<void>;
  deleteEntry: (entry: Entry) => Promise<void>;
  deleteBoard: (board: Category) => Promise<void>;
  addNewBoard: (name: string) => Promise<void>;
  updateBoards: (boards: Category[]) => Promise<void>;
}

export const BoardsContext = createContext({} as ContextProps);