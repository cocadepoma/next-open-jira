import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next'

import { Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, Autocomplete, TextField } from "@mui/material"
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Box } from "@mui/system";
import { SaveOutlined } from "@mui/icons-material";
import UndoIcon from '@mui/icons-material/Undo';

import { BoardsContext } from '../../context/boards/BoardsContext';

import { Layout } from "../../components/layouts"
import { DeleteEntryDialog } from "../../components/ui";

import { Category, Entry } from "../../interfaces";
import { dbEntries } from "../../database";
import { getTicketTime } from '../../utils/utils';

interface Props {
  ticket: Entry;
}

const EntryView = ({ ticket }: Props) => {
  const router = useRouter();

  const { boards, updateBoards, deleteEntry, updateEntry } = useContext(BoardsContext);

  const [form, setForm] = useState({
    description: ticket.description,
    content: ticket.content || '',
  });

  const [isTouched, setIsTouched] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Category | null>(null);
  const [activeDeleteTicket, setActiveDeleteTicket] = useState<boolean>(false);

  const isNotValid = useMemo(() => form.description.length <= 0 && isTouched, [isTouched, form]);

  useEffect(() => {
    if (!boards.length) return;

    setSelectedBoard(boards.find(board => board._id === ticket.categoryId)!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards])

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const onBoardChange = (event: any, value: Category | null) => {
    if (!value) {
      setSelectedBoard(null);
      return;
    }

    setSelectedBoard(value);
  };

  const onSaveForm = async () => {
    if (!selectedBoard || form.description.trim().length === 0 || form.description.length <= 2) return;

    const newTicket = {
      ...ticket,
      content: form.content,
      description: form.description,
      categoryId: selectedBoard._id
    };

    const boardsToUpdate = [];

    if (selectedBoard._id !== ticket.categoryId) {
      const sourceBoard = boards.find(board => board._id === ticket.categoryId)!;
      const updatedSourceBoardTicket = sourceBoard.tickets.filter(boardTicket => boardTicket._id !== newTicket._id);

      const updatedSourceBoard = {
        ...sourceBoard,
        tickets: updatedSourceBoardTicket,
      };

      boardsToUpdate.push(updatedSourceBoard);

      const entryBoard = boards.find(board => board._id === selectedBoard._id)!;

      const ticketBoard: Category = {
        ...entryBoard,
        tickets: [...entryBoard.tickets, newTicket]
      };

      boardsToUpdate.push(ticketBoard);
    } else {
      const entryBoard = boards.find(board => board._id === selectedBoard._id)!;
      const updatedTickets = entryBoard.tickets.map(boardTicket => boardTicket._id === newTicket._id ? newTicket : boardTicket);

      const ticketBoard: Category = {
        ...entryBoard,
        tickets: updatedTickets
      };

      boardsToUpdate.push(ticketBoard);
    }

    await updateEntry(newTicket, true);
    await updateBoards(boardsToUpdate);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push('/');
  };

  const onCloseDeleteTicket = () => {
    setActiveDeleteTicket(false);
  };

  const handleConfirmDeleteTicket = () => {
    const entryBoard = boards.find(board => board._id === ticket.categoryId)!;
    const updatedTickets = entryBoard.tickets.filter(ticket => ticket._id !== ticket._id);

    const updatedBoard: Category = {
      ...entryBoard,
      tickets: updatedTickets
    };

    deleteEntry(ticket);
    updateBoards([updatedBoard]);

    onCloseDeleteTicket();
    router.push('/');
  };

  return (
    <Layout title={`Ticket: ${ticket.description.substring(0, 15)} ...`}>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 14 }}
      >
        <Grid item xs={11} sm={8} md={6} xl={4}>
          <Card>
            <CardHeader
              title={`Ticket: ${form.description}`}
              subheader={`Created ${getTicketTime(ticket.createdAt)}`}
              titleTypographyProps={{ style: { fontSize: 16 } }}
              subheaderTypographyProps={{ style: { fontSize: 10 } }}
            />

            <CardContent>

              <TextField
                sx={{ marginBottom: 4, fontSize: 10 }}
                fullWidth
                multiline
                label="Name"
                name="description"
                onChange={onFieldChange}
                value={form.description}
                onBlur={() => setIsTouched(true)}
                helperText={isNotValid && 'The name is mandatory'}
                error={isNotValid}
              />

              <FormControl fullWidth>
                <Autocomplete
                  clearOnEscape
                  selectOnFocus
                  fullWidth
                  id="combo-box-demo"
                  options={boards}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      {option.name}
                    </Box>
                  )}
                  value={selectedBoard}
                  renderInput={(params) => <TextField {...params} label="Board" />}
                  onChange={onBoardChange}
                  defaultValue={boards.find(board => board._id === ticket.categoryId)}
                />
              </FormControl>

              <TextField
                sx={{ marginBottom: 4, marginTop: 4 }}
                fullWidth
                placeholder="Description"
                multiline
                rows={10}
                label="Description"
                name="content"
                onChange={onFieldChange}
                value={form.content}
              />
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
              <Button
                variant="outlined"
                color="info"
                startIcon={<UndoIcon />}
                onClick={() => router.push('/')}>
                Back
              </Button>

              <div>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutline />}
                  onClick={() => setActiveDeleteTicket(true)}>
                  Delete
                </Button>

                <Button
                  sx={{ marginLeft: '1rem' }}
                  variant="outlined"
                  color="info"
                  startIcon={<SaveOutlined />}
                  onClick={onSaveForm}
                  disabled={form.description.length <= 0 || !selectedBoard}
                >
                  Save
                </Button>
              </div>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {
        activeDeleteTicket && (
          <DeleteEntryDialog
            isOpen={!!activeDeleteTicket}
            handleClose={onCloseDeleteTicket}
            handleDelete={handleConfirmDeleteTicket}
          />
        )
      }
    </Layout>
  )
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const ticket = await dbEntries.getTicketById(id);
  if (!ticket) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      ticket
    }
  }
}

export default EntryView;
