import { useContext, useState } from 'react'
import type { NextPage } from 'next'

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { IconButton, } from '@mui/material'
import { AddCircleOutlineOutlined } from '@mui/icons-material'

import { Layout } from '../components/layouts'
import { CardHeader, EntryList, NewEntryDialog } from '../components/ui'

import { BoardsContext } from '../context/boards'

import { Category } from '../interfaces'

import styles from './Home.module.css'

const HomePage: NextPage = () => {
  const { boards, updateEntry, updateBoards } = useContext(BoardsContext);
  const [activeBoard, setActiveBoard] = useState<Category | null>(null);
  const { addNewEntry } = useContext(BoardsContext);

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result

    if (!destination || (destination.droppableId === source.droppableId
      && destination.index === source.index)) return

    const boardSource = boards.find(entry => entry._id === source.droppableId);
    const boardDestination = boards.find(entry => entry._id === destination.droppableId);

    const newEntry = {
      ...boardSource!.tickets[source.index],
      categoryId: destination.droppableId
    }

    updateEntry(newEntry);

    if (destination.droppableId === source.droppableId) {
      const copyBoardSource = JSON.parse(JSON.stringify(boardSource)) as Category;
      copyBoardSource.tickets.splice(source.index, 1);
      copyBoardSource.tickets.splice(destination.index, 0, newEntry);

      updateBoards([copyBoardSource]);
    } else {
      const copyBoardSource = JSON.parse(JSON.stringify(boardSource)) as Category;
      copyBoardSource.tickets.splice(source.index, 1);

      const copyBoardDestination = JSON.parse(JSON.stringify(boardDestination)) as Category;
      copyBoardDestination.tickets.splice(destination.index, 0, newEntry);

      updateBoards([copyBoardSource, copyBoardDestination]);
    }
  };

  const openDialogNewEntry = (board: Category) => {
    setActiveBoard(board);
  };

  const cancelAddingEntryToBoard = () => {
    setActiveBoard(null);
  };

  const startAddingNewEntry = (value: string, boardId: string) => {
    addNewEntry(value, boardId);
    setActiveBoard(null);
  };

  return (
    <Layout title="Home - OpenJira">
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className={styles['home__context']}>
          {boards.map((board, i) => (
            <div className={styles['home__board']} key={board._id}>

              <CardHeader
                className={styles['home__header--container']}
                board={board}
                onClick={openDialogNewEntry}
              />

              <Droppable droppableId={board._id}>
                {
                  (droppableProvided, droppableSnapshot) => (
                    <div className={styles['home__list--container']}
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      <EntryList tickets={board.tickets} />
                      {droppableProvided.placeholder}
                    </div>
                  )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {
        activeBoard && (
          <NewEntryDialog
            isOpen={!!activeBoard}
            handleClose={cancelAddingEntryToBoard}
            handleConfirm={startAddingNewEntry}
            board={activeBoard}
          />

        )
      }
    </Layout>
  )
}

export default HomePage
