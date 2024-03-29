export interface ListQuestionSubmittedType {
  id: number;
  answersSubmittedId: number[];
}
// Generated by https://quicktype.io

export interface SubmitResponseDataType {
  listQuestionChecked: ListQuestionCheckedType[];
  totalScore: number;
}

export interface ListQuestionCheckedType {
  id: number;
  title: string;
  thumbnail_link: string;
  answers: AnswerType[];
  numberSubmitCorrect: number;
  numberSubmitIncorrect: number;
  numberAnswersCorrect: number;
  scoreThisQuestion: number;
}

export interface AnswerType {
  id: number;
  content: string;
  is_correct: boolean;
  is_submit_correct?: boolean;
}

// Generated by https://quicktype.io

export interface UserPlayingType {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  result: Result[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface Result {
  id: number;
  title: string;
  thumbnail_link: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  content: string;
}
