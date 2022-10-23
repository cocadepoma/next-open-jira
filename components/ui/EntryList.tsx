import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material"

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import { EntryCard } from "./EntryCard"
import { EntryStatus } from "../../interfaces"

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { isDragging, onEndDragging } = useContext(UIContext);
  const { entries, updateEntry } = useContext(EntriesContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');

    const entryToMove = entries.find(entry => entry._id === id)!;
    updateEntry({
      ...entryToMove,
      status,
    });

    onEndDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 5px' }}>
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all 0.3s' }}>
          {
            entriesByStatus.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
