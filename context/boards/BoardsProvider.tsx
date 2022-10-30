import { FC, useEffect, useReducer } from 'react';

import { BoardsContext, boardsReducer } from '.';
import { Category, Entry, EntryResponse } from '../../interfaces';
import { boardsApi } from '../../apis';

export interface BoardsState {
  boards: Category[];
}

interface BoardsProviderProps {
  children: React.ReactNode
}

const Boards_INITIAL_STATE: BoardsState = {
  boards: [],
};

export const BoardsProvider: FC<BoardsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(boardsReducer, Boards_INITIAL_STATE);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      const { data } = await boardsApi.get<Category[]>('/category');
      dispatch({ type: '[Boards] - Load data', payload: data });
    } catch (error) {
      console.log(error, 'An error ocurred while getting the Boards');
    }
  };

  const addNewEntry = async (description: string, boardId: string) => {
    try {
      const { data } = await boardsApi.post<EntryResponse>('/entries', { description, categoryId: boardId });

      dispatch({ type: '[Boards] - Add-Entry', payload: data.entry });
    } catch (error) {
      console.log(error, 'An error ocurred while adding a new entriy');
    }
  };

  const updateEntry = async ({ _id, description, categoryId }: Entry) => {
    try {
      const { data } = await boardsApi.put<Entry>(`/entries/${_id}`, { description, categoryId });

      dispatch({ type: '[Boards] - Entry-Updated', payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const updateBoards = async (boards: Category[]) => {

    try {
      dispatch({ type: '[Boards] - Update Boards', payload: boards });

      const requests = boards.map(({ _id, name, tickets, indexOrder }) =>
        boardsApi.put<Entry>(`/category/${_id}`, { name, tickets, indexOrder }));

      await Promise.all(requests);
    } catch (error) {
      console.log({ error });
    }

  };

  const deleteEntry = async ({ _id }: Entry) => {
    try {
      await boardsApi.delete(`/entries/${_id}`);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <BoardsContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
        updateBoards,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};