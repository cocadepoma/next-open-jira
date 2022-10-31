import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';

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

  const getTime = (time: number) => {
    const currentDate = new Date().getTime();
    const ticketDate = new Date(time).getTime();

    const diff = ((currentDate - ticketDate) / 1000) / 60;

    if (diff > 518400) {
      return `${Math.round(diff / 43200)} year/s ago`;
    } else if (diff > 43200) {
      return `${Math.round(diff / 43200)} month/s ago`;
    } else if (diff > 1440) {
      return `${Math.round(diff / 1440)} day/s ago`;
    } else if (diff > 60) {
      return `${Math.round(diff / 60)} hour/s ago`;
    } else {
      return `${Math.abs(Math.round(diff))} minutes ago`;
    }
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


            <p className={styles.entrycard__time}>
              <HourglassTopOutlinedIcon />
              {getTime(entry.createdAt)}
            </p>
          </div>
        )
      }
    </Draggable>
  )
}
