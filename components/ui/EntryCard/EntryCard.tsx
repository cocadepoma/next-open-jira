import { FC, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from "@mui/material";

import { Category, Entry } from "../../../interfaces"

import styles from './EntryCard.module.css'
import { BoardsContext } from "../../../context/boards/BoardsContext";

interface Props {
  entry: Entry;
  index: number;
}

export const EntryCard: FC<Props> = ({ entry, index }) => {
  const { boards, deleteEntry, updateBoards } = useContext(BoardsContext);

  const onDelete = () => {
    const entryBoard = boards.find(board => board._id === entry.categoryId)!;
    const updatedTickets = entryBoard.tickets.filter(ticket => ticket._id !== entry._id);

    const updatedBoard: Category = {
      ...entryBoard,
      tickets: updatedTickets
    };

    deleteEntry(entry);
    updateBoards([updatedBoard]);
  }

  return (
    <Draggable draggableId={entry._id} index={index} key={entry._id}>
      {
        (draggableProvided, draggableSnapshot) => (
          <div
            className={styles.entrycard__container}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            ref={draggableProvided.innerRef}
          >
            <p className={styles.entrycard__text}>{entry.description}</p>

            <IconButton
              className={styles.entrycard__button}
              onClick={onDelete}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>

            <p className={styles.entrycard__time}>30 mins ago</p>
          </div>
        )
      }
    </Draggable>
  )
}
