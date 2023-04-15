import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CustomText } from '../../components/CustomText';
import { Header } from '../../components/Header';
import { QuestionContent } from '../../components/QuestionContent';
import {
  StyledBoxContainer,
  StyledBoxModal,
  StyledButton,
  StyledTextField,
} from './styles';

interface formData {
  number: number;
}

const schema = yup
  .object({
    number: yup
      .number()
      .min(1, 'More than 1 questions')
      .max(10, 'Less than 10 questions')
      .required(),
  })
  .required();

const PlayPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberQuestion, setNumberQuestion] = useState<number>(0);
  const [userPlaying, setUserPlaying] = useState({
    userPlayingData: [],
    userPlayingQuestions: {},
  });
  console.log(
    '🚀 ~ file: PlayPage.tsx:37 ~ PlayPage ~ userPlaying:',
    userPlaying
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<formData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    const userPlayingDataString = localStorage.getItem('userPlayingData');
    const userPlayingQuestionsString = localStorage.getItem(
      'userPlayingQuestions'
    );

    if (userPlayingDataString && userPlayingQuestionsString) {
      const userPlayingData = JSON.parse(userPlayingDataString);
      const userPlayingQuestions = JSON.parse(userPlayingQuestionsString) || {};

      setUserPlaying({
        userPlayingData,
        userPlayingQuestions,
      });
    }
  }, []);

  const onSubmit = (data: formData) => {
    setNumberQuestion(data.number);
    setIsModalOpen(false);
  };
  return (
    <StyledBoxContainer>
      <Header />
      {Object.keys(userPlaying.userPlayingQuestions).length === 0 && (
        <Modal
          open={isModalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <StyledBoxModal>
            <CustomText variant="h6" extraStyles={{ marginTop: 2, mb: 4 }}>
              Choose the number of questions?
            </CustomText>
            <StyledTextField
              label="The number of questions"
              type="number"
              fullWidth
              {...register('number')}
              error={!!errors.number}
              helperText={errors.number?.message?.toString()}
            />
            <StyledButton
              variant="contained"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Start
            </StyledButton>
          </StyledBoxModal>
        </Modal>
      )}
      {(numberQuestion ||
        Object.keys(userPlaying.userPlayingQuestions).length > 0) && (
        <QuestionContent number={numberQuestion} userPlaying={userPlaying} />
      )}
    </StyledBoxContainer>
  );
};

export default PlayPage;
