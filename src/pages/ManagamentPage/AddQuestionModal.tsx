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
import { colors } from '../../constants';

const AddQuestionModal = ({
  isModalAddQuestionOpen,
  setIsModalAddQuestionOpen,
  register,
  errors,
  correctAnswersChosen,
  handleCorrectAnswersChosen,
  handleSubmit,
  onAddNewQuestion,
  addNewQuestionLoading,
  addNewAnswersLoading,
}: any) => {
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
