import { yupResolver } from '@hookform/resolvers/yup';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { colors } from '../../constants';
import {
  useAddNewAnswerMutation,
  useAddNewQuestionMutation,
} from '../../store/apis/ManagementAPI/managementApi';
import { formData } from './type';

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    answer1: yup.string().required('Answer 1 is required'),
    answer2: yup.string().required('Answer 1 is required'),
    answer3: yup.string().required('Answer 1 is required'),
    answer4: yup.string().required('Answer 1 is required'),
  })
  .required();

const AddQuestionModal = ({
  isModalAddQuestionOpen,
  setIsModalAddQuestionOpen,
}: any) => {
  const [correctAnswersChosen, setCorrectAnswersChosen] = useState({
    answer1: true,
    answer2: false,
    answer3: false,
    answer4: false,
  });
  const handleCorrectAnswersChosen = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorrectAnswersChosen({
      ...correctAnswersChosen,
      [event.target.name]: event.target.checked,
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [addNewQuestion, { isLoading: addNewQuestionLoading }] =
    useAddNewQuestionMutation();

  const [addNewAnswers, { isLoading: addNewAnswersLoading }] =
    useAddNewAnswerMutation();

  const onAddNewQuestion = async (data: formData) => {
    const {
      data: { id: questionId },
    } = await addNewQuestion({
      title: data.title,
      thumbnail_link: data.thumbnailLink || '',
    }).unwrap();

    console.log(data);

    const answers = [
      { content: data.answer1, is_correct: correctAnswersChosen.answer1 },
      { content: data.answer2, is_correct: correctAnswersChosen.answer2 },
      { content: data.answer3, is_correct: correctAnswersChosen.answer3 },
      { content: data.answer4, is_correct: correctAnswersChosen.answer4 },
    ];

    const promises = answers.map((answer) =>
      addNewAnswers({ ...answer, questionId })
    );

    await Promise.all(promises);
    toast('Add new question successuflly!');
    setIsModalAddQuestionOpen(false);
    reset({
      title: '',
      thumbnailLink: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
    });
    setCorrectAnswersChosen({
      answer1: true,
      answer2: false,
      answer3: false,
      answer4: false,
    });
    try {
    } catch (error) {
      toast.error('Failed to add new question');
      console.log(error);
    }
  };
  return (
    <Modal
      open={isModalAddQuestionOpen}
      onClose={() => setIsModalAddQuestionOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <TextField
            label="Title"
            type="string"
            fullWidth
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <TextField
            {...register('thumbnailLink')}
            name="thumbnailLink"
            label="Thumbnail Link"
            fullWidth
            autoComplete="true"
            sx={{ mb: 2 }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <TextField
            label="Answer 1"
            type="string"
            fullWidth
            {...register('answer1')}
            error={!!errors.answer1}
            helperText={errors.answer1?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer 2"
            type="string"
            fullWidth
            {...register('answer2')}
            error={!!errors.answer2}
            helperText={errors.answer2?.message?.toString()}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <TextField
            label="Answer 3"
            type="string"
            fullWidth
            {...register('answer3')}
            error={!!errors.answer3}
            helperText={errors.answer3?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer 4"
            type="string"
            fullWidth
            {...register('answer4')}
            error={!!errors.answer4}
            helperText={errors.answer4?.message?.toString()}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <FormLabel
            sx={{
              color: colors.black,
            }}
          >
            Correct Answer
          </FormLabel>
          <FormGroup
            sx={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="answer1"
                  checked={correctAnswersChosen.answer1}
                  onChange={handleCorrectAnswersChosen}
                />
              }
              label="answer 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="answer2"
                  checked={correctAnswersChosen.answer2}
                  onChange={handleCorrectAnswersChosen}
                />
              }
              label="answer 2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="answer3"
                  checked={correctAnswersChosen.answer3}
                  onChange={handleCorrectAnswersChosen}
                />
              }
              label="answer 3"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="answer4"
                  checked={correctAnswersChosen.answer4}
                  onChange={handleCorrectAnswersChosen}
                />
              }
              label="answer 4"
            />
          </FormGroup>
        </Box>
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            color: colors.white,
            borderRadius: 8,
            marginTop: 4,
            width: '400px',
            alignSelf: 'center',
          }}
          onClick={handleSubmit(onAddNewQuestion)}
        >
          {addNewQuestionLoading || addNewAnswersLoading ? (
            <CircularProgress color="success" size={30} />
          ) : (
            'Add new question'
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddQuestionModal;
