import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Images } from '../../assets';
import { Header } from '../../components/Header';
import { colors } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { ListQuestionChecked } from './type';
import {
  StyledAnswerButton,
  StyledBox,
  StyledBoxAnswers,
  StyledBoxContainer,
  StyledBoxImg,
  StyledBoxTitle,
  StyledBoxUpper,
  StyledImg,
  StyledMobileStepper,
  StyledTitle,
} from './styles';

const ReviewPage = () => {
  const { state } = useLocation();
  const listQuestionChecked: ListQuestionChecked[] =
    state.data.data.listQuestionChecked;
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = listQuestionChecked.length;
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Header />
      <StyledBoxContainer>
        <StyledBoxUpper>
          <StyledBoxTitle>
            <Typography variant="h4" sx={{ color: colors.white }}>
              Result:{' '}
              {listQuestionChecked[activeStep].scoreThisQuestion === 1
                ? 'True'
                : 'False'}
            </Typography>
            <Typography
              variant="h3"
              display={{ xs: 'none', sm: 'block' }}
              fontWeight={'700'}
            >
              Question:
            </Typography>
            <StyledTitle variant="h4">
              {listQuestionChecked[activeStep].title}
            </StyledTitle>
          </StyledBoxTitle>
          <StyledBoxImg>
            <StyledImg
              src={
                listQuestionChecked[activeStep].thumbnail_link || Images.LOGO
              }
              alt=""
            />
          </StyledBoxImg>
        </StyledBoxUpper>

        <StyledBox marginTop={'20px'}>
          <Typography variant="h4">Answers: </Typography>
          <StyledBoxAnswers>
            {listQuestionChecked[activeStep].answers.map((item) => (
              <StyledAnswerButton
                variant="contained"
                color={item.is_correct ? 'success' : 'info'}
                key={nanoid()}
              >
                {item.content}
              </StyledAnswerButton>
            ))}
          </StyledBoxAnswers>
        </StyledBox>

        <StyledBox marginTop={{ md: '80px' }}>
          <Typography variant="h4">Your Choice: </Typography>

          <StyledBoxAnswers>
            {listQuestionChecked[activeStep].answers.map((item) => (
              <StyledAnswerButton
                variant="contained"
                color={
                  item.is_submit_correct === true ||
                  item.is_submit_correct === false
                    ? 'primary'
                    : 'info'
                }
                key={nanoid()}
              >
                {item.content}
              </StyledAnswerButton>
            ))}
          </StyledBoxAnswers>
        </StyledBox>

        <StyledMobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            activeStep !== maxSteps - 1 ? (
              <Button size="small" onClick={handleNext}>
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            ) : (
              <Button size="small" onClick={() => navigate('/')}>
                Play Again
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            )
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
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
    </Box>
  );
};

export default ReviewPage;
