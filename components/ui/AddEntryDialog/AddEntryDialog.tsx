import { ChangeEvent, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
// import { Category } from "../../../interfaces";

import styles from './AddEntryDialog.module.css';

interface Props {
  isOpen: boolean;
  board: any | null;
  handleClose: () => void;
  handleConfirm: (value: string, boardId: string) => void;
}

export const AddEntryDialog = ({
  isOpen,
  board,
  handleClose,
  handleConfirm,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (!inputValue.length) return;

    handleConfirm(inputValue, board?._id!);
    resetForm();
  };

  const resetForm = () => {
    setIsTouched(false);
    setInputValue('');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>New ticket</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add new Ticket to the board: <strong style={{ color: '#41ff00' }}>{board?.name}</strong>
        </DialogContentText>
        <TextField
          className={styles['new-entry-dialog__textfield']}
          fullWidth
          autoFocus
          multiline
          label="Ticket name"
          helperText={inputValue.length <= 0 && isTouched && "Insert a value"}
          error={inputValue.length <= 0 && isTouched}
          value={inputValue}
          onChange={onTextChange}
          onBlur={() => setIsTouched(true)}
        />
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button color="primary" variant="outlined" onClick={onSave}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
