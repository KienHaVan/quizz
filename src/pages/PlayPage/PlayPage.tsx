import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CustomText } from '../../components/CustomText';
import { Header } from '../../components/Header';
import { QuestionContent } from '../../components/QuestionContent';
import { colors } from '../../constants';

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

  const onSubmit = (data: formData) => {
    setNumberQuestion(data.number);
    setIsModalOpen(false);
  };
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Header />
      <Modal
        open={isModalOpen}
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
          }}
        >
          <CustomText variant="h6" extraStyles={{ marginTop: 2, mb: 4 }}>
            Choose the number of questions?
          </CustomText>
          <TextField
            label="The number of questions"
            type="number"
            fullWidth
            {...register('number')}
            error={!!errors.number}
            helperText={errors.number?.message?.toString()}
            sx={{ marginY: 2 }}
          />
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              color: colors.white,
              width: '100%',
              borderRadius: 8,
              marginTop: 4,
            }}
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Start
          </Button>
        </Box>
      </Modal>
      {numberQuestion && <QuestionContent number={numberQuestion} />}
    </Box>
  );
};

export default PlayPage;
