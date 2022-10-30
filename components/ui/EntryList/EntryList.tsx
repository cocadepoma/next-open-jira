import { FC } from "react";
import { EntryCard } from ".."
import { Entry } from "../../../interfaces";

interface Props {
  tickets: Entry[];
}

export const EntryList: FC<Props> = ({ tickets }) => {
  return (
    <>
      {
        tickets.map((entry, index) => (
          <EntryCard key={entry._id} entry={entry} index={index} />
        ))
      }
    </>
  )
}
