import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react'
import { Category } from '../../../interfaces';

interface Props {
  className: string;
  board: Category;

  onClick: (board: Category) => void;
}

export const CardHeader = ({ className = '', board, onClick }: Props) => {
  return (
    <div className={className}>
      <h3>{board.name}</h3>

      <IconButton onClick={() => onClick(board)}>
        <AddCircleOutlineOutlined />
      </IconButton>
    </div>
  )
}
