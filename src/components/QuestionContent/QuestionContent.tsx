import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Images } from '../../assets';
import { colors } from '../../constants';
import {
  useGetQuestionsQuery,
  useSubmitQuestionsMutation,
} from '../../store/apis/QuestionAPI/questionApi';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

const list = [
  {
    id: 'ch1',
    title: 'cau hoi 1',
    answers: [
      {
        id: 1,
        answer: 'dap an 1',
      },
      {
        id: 2,
        answer: 'dap an 2',
      },
      {
        id: 3,
        answer: 'dap an 3',
      },
      {
        id: 4,
        answer: 'dap an 4',
      },
    ],
  },
  {
    id: 'ch2',
    title: 'cau hoi 2',
    answers: [
      {
        id: 5,
        answer: 'dap an 1',
      },
      {
        id: 6,
        answer: 'dap an 2',
      },
      {
        id: 7,
        answer: 'dap an 3',
      },
      {
        id: 8,
        answer: 'dap an 4',
      },
    ],
  },
  {
    id: 'ch3',
    title: 'cau hoi 3',
    answers: [
      {
        id: 9,
        answer: 'dap an 1',
      },
      {
        id: 10,
        answer: 'dap an 2',
      },
      {
        id: 11,
        answer: 'dap an 3',
      },
      {
        id: 12,
        answer: 'dap an 4',
      },
    ],
  },
  {
    id: 'ch4',
    title: 'cau hoi 4',
    answers: [
      {
        id: 13,
        answer: 'dap an 1',
      },
      {
        id: 14,
        answer: 'dap an 2',
      },
      {
        id: 15,
        answer: 'dap an 3',
      },
      {
        id: 16,
        answer: 'dap an 4',
      },
    ],
  },
  {
    id: 'ch5',
    title: 'cau hoi 5',
    answers: [
      {
        id: 17,
        answer: 'dap an 1',
      },
      {
        id: 18,
        answer: 'dap an 2',
      },
      {
        id: 19,
        answer: 'dap an 3',
      },
      {
        id: 20,
        answer: 'dap an 4',
      },
    ],
  },
  {
    id: 'ch6',
    title: 'cau hoi 6',
    answers: [
      {
        id: 21,
        answer: 'dap an 1',
      },
      {
        id: 22,
        answer: 'dap an 2',
      },
      {
        id: 23,
        answer: 'dap an 3',
      },
      {
        id: 24,
        answer: 'dap an 4',
      },
    ],
  },
];

const QuestionContent = ({ number }: { number: number }) => {
  const { data, error, isLoading } = useGetQuestionsQuery(number);
  const listQuestions = data ? data.data : [];
  const [listAnswers, setListAnswers] = useState<any>([]);
  const [listQuestionSubmitted, setListQuestionSubmitted] = useState<any>([]);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = listQuestions.length;
  const [
    submitQuestions,
    {
      data: submitResponseData,
      isLoading: isSubmittingQuestions,
      isSuccess: isSubmitedSuccess,
    },
  ] = useSubmitQuestionsMutation();
  // const [submitQuestions, result] = useSubmitQuestionsMutation();
  console.log(
    '🚀 ~ file: QuestionContent.tsx:167 ~ QuestionContent ~ result:',
    submitResponseData
  );

  useEffect(() => {
    setListAnswers([]);
  }, [activeStep]);

  const handleNext = (id: any) => {
    if (listAnswers.length === 0) {
      toast.error('Choose at least 1 answer!');
      return;
    }
    if (activeStep < maxSteps - 1) {
      setListQuestionSubmitted([
        ...listQuestionSubmitted,
        {
          id,
          answersSubmittedId: listAnswers,
        },
      ]);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      submitQuestions({
        listQuestionSubmitted: [
          ...listQuestionSubmitted,
          {
            id,
            answersSubmittedId: listAnswers,
          },
        ],
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (isLoading) {
    return <div style={{ paddingTop: '100px' }}>Loading...</div>;
  }
  if (!!error) {
    return <div style={{ paddingTop: '100px' }}>Error...</div>;
  }

  return (
    <Box
      sx={{
        paddingTop: '64px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          my: 2,
          borderRadius: 2,
          bgcolor: colors.primary,
          width: '100%',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ color: colors.white }}>
          {listQuestions[activeStep].title}
        </Typography>
        <img src={Images.LOGO} alt="" style={{ width: 300, marginTop: 12 }} />
      </Box>

      <Box
        sx={{
          px: 6,
          py: 4,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Stack
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          alignItems={{ xs: 'center', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          {listQuestions[activeStep].answers.map((item: any) => (
            <Button
              variant="contained"
              color={listAnswers.includes(item.id) ? 'primary' : 'info'}
              sx={{ px: 4, py: 2 }}
              key={nanoid()}
              onClick={() => setListAnswers([...listAnswers, item.id])}
            >
              {item.content || item.answer}
            </Button>
          ))}
        </Stack>
      </Box>

      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ px: 20, marginTop: 'auto', mb: 2 }}
        nextButton={
          <Button
            size="small"
            onClick={() => handleNext(listQuestions[activeStep].id)}
          >
            {activeStep !== maxSteps - 1 ? 'Next' : 'Submit'}
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default QuestionContent;
