import { yupResolver } from '@hookform/resolvers/yup';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Avatar,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { colors } from '../../constants';
import {
  useGetQuestionQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
} from '../../store/apis/ManagementAPI/managementApi';
import { formData } from './type';
import { useUploadThumbnailMutation } from '../../store/apis/QuestionAPI/questionApi';

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    answer1: yup.string().required('Answer 1 is required'),
    answer2: yup.string().required('Answer 1 is required'),
    answer3: yup.string().required('Answer 1 is required'),
    answer4: yup.string().required('Answer 1 is required'),
  })
  .required();

const EditQuestionModal = ({
  isModalEditQuestionOpen,
  setIsModalEditQuestionOpen,
  editQuestionId,
}: any) => {
  const { data: questionData } = useGetQuestionQuery({
    questionId: editQuestionId,
  });

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

  const [defaultValues, setDefaultValues] = useState({
    title: '',
    thumbnailLink: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (questionData) {
      const newDefaultValues = {
        title: questionData?.data?.title || '',
        thumbnailLink: questionData?.data?.thumbnail_link || '',
        answer1: questionData?.data?.answers[0]?.content || '',
        answer2: questionData?.data?.answers[1]?.content || '',
        answer3: questionData?.data?.answers[2]?.content || '',
        answer4: questionData?.data?.answers[3]?.content || '',
      };
      const newCorrectAnswersChosen = {
        answer1: questionData?.data?.answers[0]?.is_correct,
        answer2: questionData?.data?.answers[1]?.is_correct,
        answer3: questionData?.data?.answers[2]?.is_correct,
        answer4: questionData?.data?.answers[3]?.is_correct,
      };
      setCorrectAnswersChosen(newCorrectAnswersChosen);
      setDefaultValues(newDefaultValues);
      setThumbnailUrl(questionData?.data?.thumbnail_link);
      reset(newDefaultValues);
    }
  }, [questionData, reset]);

  const [updateQuestion, { isLoading: updateQuestionLoading }] =
    useUpdateQuestionMutation();
  const [updateAnswer, { isLoading: updateAnswerLoading }] =
    useUpdateAnswerMutation();

  const onEditQuestion = async (data: formData) => {
    try {
      const {
        data: { answers },
      } = await updateQuestion({
        title: data.title,
        thumbnail_link: data.thumbnailLink || '',
        questionId: editQuestionId,
      }).unwrap();

      const updateAnswerPromises = [
        updateAnswer({
          content: data.answer1,
          is_correct: correctAnswersChosen.answer1,
          answerId: answers[0].id,
          questionId: editQuestionId,
        }).unwrap(),
        updateAnswer({
          content: data.answer2,
          is_correct: correctAnswersChosen.answer2,
          answerId: answers[1].id,
          questionId: editQuestionId,
        }).unwrap(),
        updateAnswer({
          content: data.answer3,
          is_correct: correctAnswersChosen.answer3,
          answerId: answers[2].id,
          questionId: editQuestionId,
        }).unwrap(),
        updateAnswer({
          content: data.answer4,
          is_correct: correctAnswersChosen.answer4,
          answerId: answers[3].id,
          questionId: editQuestionId,
        }).unwrap(),
      ];

      await Promise.all(updateAnswerPromises);
      toast('Edit question successuflly!');
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
      setIsModalEditQuestionOpen(false);
    } catch (error) {
      toast.error('Failed update question!');
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
  return (
    <Modal
      open={isModalEditQuestionOpen}
      onClose={() => setIsModalEditQuestionOpen(false)}
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
            autoFocus
          />
          {/* <TextField
            {...register('thumbnailLink')}
            name="thumbnailLink"
            label="Thumbnail Link"
            fullWidth
            autoComplete="true"
            sx={{ mb: 2 }}
            autoFocus
          /> */}
          <Box display="flex" justifyContent="center">
            <Avatar
              alt="thumbnail"
              sx={{
                width: '50px',
                height: '50px',
              }}
              src={thumbnailUrl}
            />
          </Box>
          <Button
            variant="contained"
            component="label"
            sx={{ width: '300px', height: '56px', color: colors.white }}
          >
            Upload image
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleUploadThumbnail}
              ref={fileInputRef}
            />
          </Button>
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
            autoFocus
          />
          <TextField
            label="Answer 2"
            type="string"
            fullWidth
            {...register('answer2')}
            error={!!errors.answer2}
            helperText={errors.answer2?.message?.toString()}
            sx={{ mb: 2 }}
            autoFocus
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
            autoFocus
          />
          <TextField
            label="Answer 4"
            type="string"
            fullWidth
            {...register('answer4')}
            error={!!errors.answer4}
            helperText={errors.answer4?.message?.toString()}
            sx={{ mb: 2 }}
            autoFocus
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
          onClick={handleSubmit(onEditQuestion)}
        >
          {updateQuestionLoading || updateAnswerLoading ? (
            <CircularProgress color="error" size={30} />
          ) : (
            'Edit the question'
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditQuestionModal;
