export interface answerFace {
  questionId: string
  answer: number
  title: string
  choices: string
  tag: string
}

export interface questionFace {
  answer: number
  title: string
  choices: string
  tag: string
}

export interface pageSize {
  size: number
  page: number
}
export interface ISiteInfo {
  companyName: string;
  siteNo: string;
  contactTel: string;
  address: string;
  tag: string[];
  theme: string;
  themeList: string[];
}
