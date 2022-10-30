import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import { IconButton } from "@mui/material";

import { Entry } from "../../../interfaces"

import styles from './EntryCard.module.css'

interface Props {
  entry: Entry;
  index: number;
  setActiveDeleteTicket: (entry: Entry) => void;
  setActiveEditTicket: (entry: Entry) => void;
}

export const EntryCard: FC<Props> = ({ entry, index, setActiveDeleteTicket, setActiveEditTicket }) => {
  const onDelete = () => {
    setActiveDeleteTicket(entry)
  };

  const onEdit = () => {
    setActiveEditTicket(entry)
  };

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
            <div className={styles['entrycard__actions--container']}>
              <p className={styles.entrycard__text}>{entry.description}</p>

              <div className={styles['entrycard__buttons--container']}>
                <IconButton
                  className={styles['entrycard__button--edit']}
                  onClick={onEdit}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  className={styles['entrycard__button--delete']}
                  onClick={onDelete}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>

              </div>

            </div>

            <p className={styles.entrycard__time}>30 mins ago</p>
          </div>
        )
      }
    </Draggable>
  )
}
