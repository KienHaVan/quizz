import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Images } from '../../assets';
import {
  useGetQuestionsQuery,
  useSubmitQuestionsMutation,
} from '../../store/apis/QuestionAPI/questionApi';
import {
  StyledAnswerButton,
  StyledBoxAnswers,
  StyledBoxContainer,
  StyledBoxImg,
  StyledBoxModal,
  StyledBoxModalButton,
  StyledBoxTitle,
  StyledBoxUpper,
  StyledImg,
  StyledMobileStepper,
  StyledModalButton,
  StyledTitle,
} from './styles';
import {
  AnswerType,
  ListQuestionCheckedType,
  ListQuestionSubmittedType,
  UserPlayingType,
} from './type';
import { LoadingModal } from '../LoadingModal';

const QuestionContent = ({
  number,
  userPlaying,
}: {
  number: number;
  // userPlaying: {
  //   userPlayingData: ListQuestionSubmittedType[];
  //   userPlayingQuestions: UserPlayingType;
  // };
  userPlaying: any;
}) => {
  const { data, error, isLoading } = useGetQuestionsQuery(number);

  const listQuestions =
    Object.keys(userPlaying.userPlayingQuestions).length > 0
      ? userPlaying.userPlayingQuestions.data
      : data
      ? data.data
      : [];

  console.log(listQuestions);

  const [listAnswers, setListAnswers] = useState<number[]>(
    userPlaying?.userPlayingData[0]?.answersSubmittedId || []
  );
  const [listQuestionSubmitted, setListQuestionSubmitted] = useState<
    ListQuestionSubmittedType[]
  >(userPlaying.userPlayingData);

  const [openModalResults, setOpenModalResults] = useState(false);
  const handleOpenModal = () => setOpenModalResults(true);
  const handleClose = () => setOpenModalResults(false);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(
    userPlaying?.userPlayingData?.length || 0
  );
  const maxSteps = listQuestions.length;
  const navigate = useNavigate();

  const playAgain = () => {
    localStorage.removeItem('listQuestionSubmitted');
    localStorage.removeItem('userPlayingQuestions');
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

  const handleNext = (id: number) => {
    if (listAnswers.length === 0) {
      toast.error('Choose at least 1 answer!');
      return;
    }
    if (activeStep < maxSteps - 1) {
      const index = listQuestionSubmitted.findIndex((item) => item.id === id);
      console.log(index);

      if (index > -1) {
        setListQuestionSubmitted([
          ...listQuestionSubmitted.slice(0, index),
          {
            id,
            answersSubmittedId: listAnswers,
          },
          ...listQuestionSubmitted.slice(index + 1),
        ]);
      } else {
        setListQuestionSubmitted([
          ...listQuestionSubmitted,
          {
            id,
            answersSubmittedId: listAnswers,
          },
        ]);
      }

      setListAnswers([]);
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
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
          setListAnswers([]);
        }
      });
    }
    if (activeStep < maxSteps - 1) {
      listQuestionSubmitted.forEach((item) => {
        if (item.id === listQuestions[activeStep + 1].id) {
          setListAnswers(item.answersSubmittedId);
        }
      });
    }
  };

  const handleBack = (id: number) => {
    listQuestionSubmitted.forEach((item) => {
      if (item.id === id) {
        setListAnswers(item.answersSubmittedId);
      }
    });
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  useEffect(() => {
    localStorage.setItem(
      'userPlayingData',
      JSON.stringify(listQuestionSubmitted)
    );
    localStorage.setItem(
      'userPlayingQuestions',
      JSON.stringify(
        Object.keys(userPlaying.userPlayingQuestions).length > 0
          ? userPlaying.userPlayingQuestions
          : data
      )
    );
  }, [data, listQuestionSubmitted, userPlaying.userPlayingQuestions]);

  if (isLoading) {
    return <LoadingModal isOpen={isLoading} />;
  }

  if (!!error) {
    return <div style={{ paddingTop: '100px' }}>Error...</div>;
  }

  return (
    <>
      <StyledBoxContainer>
        <StyledBoxUpper>
          <StyledBoxTitle>
            <Typography
              variant="h3"
              display={{ xs: 'none', sm: 'block' }}
              fontWeight={'700'}
            >
              Question:
            </Typography>
            <StyledTitle variant="h4" className="textClampQuestion">
              {listQuestions[activeStep].title}
            </StyledTitle>
          </StyledBoxTitle>
          <StyledBoxImg>
            <StyledImg
              src={listQuestions[activeStep].thumbnail_link || Images.LOGO}
              alt=""
            />
          </StyledBoxImg>
        </StyledBoxUpper>

        <StyledBoxAnswers>
          {listQuestions[activeStep].answers.map((item: AnswerType) => (
            <StyledAnswerButton
              variant="contained"
              color={listAnswers.includes(item.id) ? 'primary' : 'info'}
              key={nanoid()}
              onClick={() => {
                let updatedListAnswers;
                if (listAnswers.includes(item.id)) {
                  updatedListAnswers = listAnswers.filter(
                    (answer) => answer !== item.id
                  );
                } else {
                  updatedListAnswers = [...listAnswers, item.id];
                }
                setListAnswers(updatedListAnswers);
              }}
            >
              <Typography
                className="textClampAnswer"
                sx={{ textTransform: 'none' }}
              >
                {item.content}
              </Typography>
            </StyledAnswerButton>
          ))}
        </StyledBoxAnswers>

        <StyledMobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
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
      </StyledBoxContainer>
      <Modal
        open={isSubmitedSuccess && openModalResults}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBoxModal>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Your Result
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {theScore()} / {maxSteps}
          </Typography>
          <StyledBoxModalButton>
            <StyledModalButton variant="contained" onClick={() => playAgain()}>
              Play Again
            </StyledModalButton>
            <StyledModalButton
              variant="outlined"
              onClick={() =>
                navigate('/review', {
                  state: {
                    data: submitResponseData,
                  },
                })
              }
            >
              Review
            </StyledModalButton>
          </StyledBoxModalButton>
        </StyledBoxModal>
      </Modal>
      {isSubmittingQuestions && <LoadingModal isOpen={true} />}
    </>
  );
};

export default QuestionContent;
