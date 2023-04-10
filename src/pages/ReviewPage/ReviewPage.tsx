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
            {listQuestionChecked[activeStep].scoreThisQuestion === 1
              ? 'True'
              : 'False'}
          </Typography>
          <Typography variant="h4" sx={{ color: colors.white }}>
            {listQuestionChecked[activeStep].title}
          </Typography>
          <img
            src={listQuestionChecked[activeStep].thumbnail_link || Images.LOGO}
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
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            gap: 2,
          }}
        >
          <Stack
            justifyContent={{ xs: 'center', sm: 'space-between' }}
            alignItems={{ xs: 'center', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {listQuestionChecked[activeStep].answers.map((item) => (
              <Button
                variant="contained"
                color={item.is_correct ? 'success' : 'info'}
                sx={{ px: 4, py: 2 }}
                key={nanoid()}
              >
                {item.content}
              </Button>
            ))}
          </Stack>
          <Stack
            justifyContent={{ xs: 'center', sm: 'space-between' }}
            alignItems={{ xs: 'center', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {listQuestionChecked[activeStep].answers.map((item) => (
              <Button
                variant="contained"
                color={
                  item.is_submit_correct === true ||
                  item.is_submit_correct === false
                    ? 'primary'
                    : 'info'
                }
                sx={{ px: 4, py: 2 }}
                key={nanoid()}
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
      </Box>
    </Box>
  );
};

export default ReviewPage;
