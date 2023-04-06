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
