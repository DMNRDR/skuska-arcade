export type SubjectId = 'fyz' | 'mat';

export type Question = {
  id: string;
  subject: SubjectId;
  topic: string;
  diff: 1 | 2 | 3;
  q: string;
  /** options[0] je vždy správna odpoveď, poradie sa mieša pri zobrazení */
  options: string[];
  explain: string;
  /** odkiaľ otázka pochádza (prednáška, cvičenie…) */
  src: string;
};

export type Topic = {
  id: string;
  subject: SubjectId;
  name: string;
  icon: string;
  src: string;
};

export type Generator = {
  topic: string;
  subject: SubjectId;
  make: () => Omit<Question, 'id' | 'subject' | 'topic'>;
};

export type Mode = 'campaign' | 'arcade' | 'boss' | 'review';
