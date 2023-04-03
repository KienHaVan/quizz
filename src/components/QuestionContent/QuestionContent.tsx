import React from 'react';
import { useGetQuestionsQuery } from '../../store/apis/QuestionAPI/questionApi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { colors } from '../../constants';
import Stack from '@mui/material/Stack';

const list = [
  {
    title: 'cau hoi 1',
    answers: [
      {
        answer: 'dap an 1',
      },
      {
        answer: 'dap an 2',
      },
      {
        answer: 'dap an 3',
      },
      {
        answer: 'dap an 4',
      },
    ],
  },
  {
    title: 'cau hoi 2',
    answers: [
      {
        answer: 'dap an 1',
      },
      {
        answer: 'dap an 2',
      },
      {
        answer: 'dap an 3',
      },
      {
        answer: 'dap an 4',
      },
    ],
  },
  {
    title: 'cau hoi 3',
    answers: [
      {
        answer: 'dap an 1',
      },
      {
        answer: 'dap an 2',
      },
      {
        answer: 'dap an 3',
      },
      {
        answer: 'dap an 4',
      },
    ],
  },
  {
    title: 'cau hoi 4',
    answers: [
      {
        answer: 'dap an 1',
      },
      {
        answer: 'dap an 2',
      },
      {
        answer: 'dap an 3',
      },
      {
        answer: 'dap an 4',
      },
    ],
  },
  {
    title: 'cau hoi 5',
    answers: [
      {
        answer: 'dap an 1',
      },
      {
        answer: 'dap an 2',
      },
      {
        answer: 'dap an 3',
      },
      {
        answer: 'dap an 4',
      },
    ],
  },
  {
    title: 'cau hoi 6',
    answers: [
      {
        answer: 'dap an 1',
      },
      {
        answer: 'dap an 2',
      },
      {
        answer: 'dap an 3',
      },
      {
        answer: 'dap an 4',
      },
    ],
  },
];

const QuestionContent = ({ number }: { number: number }) => {
  const { data, error, isLoading } = useGetQuestionsQuery(number);
  return (
    <Box sx={{ paddingTop: '64px', display: 'inline-block' }}>
      <Box
        sx={{
          my: 2,
          borderRadius: 2,
          bgcolor: colors.primary,
          width: '100%',
          padding: 4,
          display: 'inline-block',
        }}
      >
        <Typography variant="h4" sx={{ color: colors.white }}>
          An interface design application that runs in the browser with
          team-based collaborative design projects
        </Typography>
      </Box>
      <Box sx={{ px: 6, py: 4, bgcolor: colors.primary }}>
        <Stack
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          alignItems={{ xs: 'center', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Typography>Item 1</Typography>
          <Typography>Item 2</Typography>
          <Typography>Item 3</Typography>
          <Typography>Item 4</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default QuestionContent;
