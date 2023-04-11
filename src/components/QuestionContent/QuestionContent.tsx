import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MobileStepper from '@mui/material/MobileStepper';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Images } from '../../assets';
import { colors } from '../../constants';
import {
  useGetQuestionsQuery,
  useSubmitQuestionsMutation,
} from '../../store/apis/QuestionAPI/questionApi';
import {
  AnswerType,
  ListQuestionCheckedType,
  ListQuestionSubmittedType,
} from './type';
const QuestionContent = ({ number }: { number: number }) => {
  const { data, error, isLoading } = useGetQuestionsQuery(number);
  const listQuestions = data ? data.data : [];
  const [listAnswers, setListAnswers] = useState<number[]>([]);
  const [listQuestionSubmitted, setListQuestionSubmitted] = useState<
    ListQuestionSubmittedType[]
  >([]);

  const [openModalResults, setOpenModalResults] = useState(false);
  const handleOpenModal = () => setOpenModalResults(true);
  const handleClose = () => setOpenModalResults(false);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = listQuestions.length;
  const navigate = useNavigate();

  const playAgain = () => {
    navigate(0);
  };
  const [
    submitQuestions,
    {
      data: submitResponseData,
      isLoading: isSubmittingQuestions,
      isSuccess: isSubmitedSuccess,
    },
  ] = useSubmitQuestionsMutation();

  const theScore = () => {
    let theScore;
    if (!isSubmittingQuestions && isSubmitedSuccess) {
      theScore = submitResponseData.data.listQuestionChecked.reduce(
        (acc: number, item: ListQuestionCheckedType) => {
          console.log(item);

          if (item.scoreThisQuestion === 1) {
            return acc + 1;
          }
          return acc;
        },
        0
      );
    }
    return theScore;
  };

  // useEffect(() => {
  //   setListAnswers([]);
  // }, [activeStep]);

  const handleNext = (id: number) => {
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
      Swal.fire({
        title: 'Do you want to submit?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          submitQuestions({
            listQuestionSubmitted: [
              ...listQuestionSubmitted,
              {
                id,
                answersSubmittedId: listAnswers,
              },
            ],
          });
          handleOpenModal();
          setListQuestionSubmitted([
            ...listQuestionSubmitted,
            {
              id,
              answersSubmittedId: listAnswers,
            },
          ]);
        }
      });
    }
    setListAnswers([]);
  };

  const handleBack = (id: number) => {
    listQuestionSubmitted.forEach((item) => {
      if (item.id === id) {
        setListAnswers(item.answersSubmittedId);
      }
    });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (!!error) {
    return <div style={{ paddingTop: '100px' }}>Error...</div>;
  }

  return (
    <>
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
          <img
            src={listQuestions[activeStep].thumbnail_link || Images.LOGO}
            alt=""
            style={{
              width: 300,
              marginTop: 12,
              maxHeight: 300,
              objectFit: 'cover',
            }}
          />
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
            {listQuestions[activeStep].answers.map((item: AnswerType) => (
              <Button
                variant="contained"
                color={listAnswers.includes(item.id) ? 'primary' : 'info'}
                sx={{ px: 4, py: 2 }}
                key={nanoid()}
                onClick={() => {
                  setListAnswers([...listAnswers, item.id]);
                }}
              >
                {item.content}
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
            <Button
              size="small"
              onClick={() => handleBack(listQuestions[activeStep - 1].id)}
              disabled={activeStep === 0}
            >
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
      <Modal
        open={openModalResults}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Your Result
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {theScore()} / {maxSteps}
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{ px: 4, py: 2, minWidth: '150px', color: colors.white }}
              onClick={() => playAgain()}
              // component={Link}
              // to="/"
            >
              Play Again
            </Button>
            <Button
              variant="outlined"
              sx={{ px: 4, py: 2, minWidth: '150px' }}
              onClick={() =>
                navigate('/review', {
                  state: {
                    data: submitResponseData,
                  },
                })
              }
            >
              Review
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default QuestionContent;
