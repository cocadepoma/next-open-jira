import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import { Category } from "../../../interfaces";

interface Props {
  isOpen: boolean;
  board: Category | null;
  handleClose: () => void;
  handleConfirm: (value: string, boardId: string) => void;
}

export const NewEntryDialog = ({
  isOpen = true,
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
          fullWidth
          sx={{ marginTop: 2, marginBottom: 1, width: '20rem' }}
          autoFocus
          multiline
          label="Entry name"
          helperText={inputValue.length <= 0 && isTouched && "Insert a value"}
          error={inputValue.length <= 0 && isTouched}
          value={inputValue}
          onChange={onTextChange}
          onBlur={() => setIsTouched(true)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSave}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
