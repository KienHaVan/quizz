export interface QuestionRowType {
  id: number;
  number: number;
  title: string;
  dateCreated: string;
  thumbnail: string;
}

export interface formData {
  title: string;
  thumbnailLink?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

export interface userFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface userEditFormData {
  name: string;
  email: string;
}

// Generated by https://quicktype.io

export interface AllQuestionType {
  id: number;
  title: string;
  thumbnail_link: string;
  answers: AllQuestionAnswerType[];
  createdAt: Date;
}

export interface AllQuestionAnswerType {
  id: number;
  content: string;
  is_correct: boolean;
}

// Generated by https://quicktype.io

export interface AllUserType {
  message: string;
  data: AllUserDataType;
  statusCode: number;
}

export interface AllUserDataType {
  result: AllUserResultType[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface AllUserResultType {
  email: string;
  name: string;
  password: string;
  roles: string[];
  id: number;
  avatar_link: string;
  created_at: Date;
}

export interface ResponseUsersDataGridRowType {
  id: number;
  number: number;
  name: string;
  email: string;
  roles: string[];
  dateCreated: Date;
  avatar: string;
}
