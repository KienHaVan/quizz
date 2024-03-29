// Generated by https://quicktype.io

export interface SubmittedQuestionResponseType {
  statusCode: number;
  message: string;
  data: SubmittedQuestionResponseData;
}

export interface SubmittedQuestionResponseData {
  listQuestionChecked: ListQuestionChecked[];
  totalScore: number;
}

export interface ListQuestionChecked {
  id: number;
  title: string;
  thumbnail_link: string;
  answers: Answer[];
  numberSubmitCorrect: number;
  numberSubmitIncorrect: number;
  numberAnswersCorrect: number;
  scoreThisQuestion: number;
}

export interface Answer {
  id: number;
  content: string;
  is_correct: boolean;
  is_submit_correct?: boolean;
}
