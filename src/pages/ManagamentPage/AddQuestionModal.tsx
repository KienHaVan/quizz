import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, FormLabel, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { LoadingModal } from '../../components/LoadingModal';
import { colors } from '../../constants';
import {
  useAddNewAnswerMutation,
  useAddNewQuestionMutation,
} from '../../store/apis/ManagementAPI/managementApi';
import { useUploadThumbnailMutation } from '../../store/apis/QuestionAPI/questionApi';
import {
  StyledAddButton,
  StyledAvatar,
  StyledBoxContainer,
  StyledBoxDown,
  StyledBoxMiddle,
  StyledBoxUpper,
  StyledFormGroup,
} from './styles/AddQuestionModalStyles';
import { formData } from './type';
import { ImagePreview } from '../../components/ImagePreview';

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    answer1: yup.string().required('Answer 1 is required'),
    answer2: yup.string().required('Answer 1 is required'),
    answer3: yup.string().required('Answer 1 is required'),
    answer4: yup.string().required('Answer 1 is required'),
  })
  .required();

interface AddQuestionModalPropType {
  isModalAddQuestionOpen: boolean;
  setIsModalAddQuestionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddQuestionModal = ({
  isModalAddQuestionOpen,
  setIsModalAddQuestionOpen,
}: AddQuestionModalPropType) => {
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
    setValue,
    reset,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [addNewQuestion, { isLoading: isAddNewQuestionLoading }] =
    useAddNewQuestionMutation();

  const [addNewAnswers, { isLoading: isAddNewAnswersLoading }] =
    useAddNewAnswerMutation();

  const onAddNewQuestion = async (data: formData) => {
    try {
      const {
        data: { id: questionId },
      } = await addNewQuestion({
        title: data.title,
        thumbnail_link: data.thumbnailLink || '',
      }).unwrap();

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
      handleCloseModalAddQuestion();
    } catch (error) {
      toast.error('Failed to add new question');
      console.log(error);
    }
  };
  const [uploadThumbnail] = useUploadThumbnailMutation();
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadThumbnail = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append('thumbnail', files[0]);

    try {
      const response = await toast.promise(
        () => uploadThumbnail(formData).unwrap(),
        {
          pending: 'Uploading...',
          success: 'Uploaded thumbnail successfully',
          error: 'Failed to upload thumbnail',
        }
      );

      setValue('thumbnailLink', response.data);
      setThumbnailUrl(response.data);
    } catch (error) {
      toast.error('Faild to upload thumbnail');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCloseModalAddQuestion = () => {
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
    setThumbnailUrl('');
    setIsModalAddQuestionOpen(false);
  };

  const [openImagePreview, setOpenImagePreview] = useState({
    open: false,
    imageUrl: '',
  });

  return (
    <>
      <Modal
        open={isModalAddQuestionOpen}
        onClose={handleCloseModalAddQuestion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBoxContainer>
          <StyledBoxUpper>
            <TextField
              label="Title"
              type="string"
              fullWidth
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
            />
            <Stack flexDirection={'row'} alignItems={'center'}>
              <Box display="flex" justifyContent="center">
                <Button
                  onClick={() =>
                    setOpenImagePreview({
                      open: true,
                      imageUrl:
                        thumbnailUrl ||
                        'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360',
                    })
                  }
                >
                  <StyledAvatar alt="thumbnail" src={thumbnailUrl} />
                </Button>
              </Box>
              <Button component="label">
                <FaCloudUploadAlt size={56} color={colors.primary} />
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleUploadThumbnail}
                  ref={fileInputRef}
                />
              </Button>
            </Stack>
          </StyledBoxUpper>
          <StyledBoxMiddle>
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
          </StyledBoxMiddle>
          <StyledBoxMiddle>
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
          </StyledBoxMiddle>
          <StyledBoxDown>
            <FormLabel>Correct Answer</FormLabel>
            <StyledFormGroup>
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
            </StyledFormGroup>
          </StyledBoxDown>

          <StyledAddButton
            variant="contained"
            onClick={handleSubmit(onAddNewQuestion)}
          >
            Add new question
          </StyledAddButton>
        </StyledBoxContainer>
      </Modal>
      <LoadingModal
        isOpen={isAddNewQuestionLoading || isAddNewAnswersLoading}
      />
      <ImagePreview
        openImagePreview={openImagePreview}
        setOpenImagePreview={setOpenImagePreview}
      />
    </>
  );
};

export default AddQuestionModal;
