
export type Step = 'LANDING' | 'QUIZ' | 'ANALYZING' | 'RESULT' | 'OFFER';

export interface QuestionOption {
  label: string;
  value: string;
}

export type InputType = 'text' | 'email' | 'radio' | 'slider';

export interface QuizInput {
  id: string; // Chave para salvar a resposta (ex: 'nome', 'peso_atual')
  type: InputType;
  label?: string; // Label acima do input específico (opcional)
  placeholder?: string;
  options?: QuestionOption[]; // Para radio
  min?: number; // Para slider
  max?: number;
  step?: number;
  unit?: string;
}

export interface QuizPage {
  id: string; // ID da página
  title: string; // Pergunta principal ou Título da página
  inputs: QuizInput[];
}

export interface UserAnswers {
  [key: string]: string | number;
}

export interface AnalysisScores {
  energia: number;
  sono: number;
  inflamacao: number;
  autoestima: number;
}

export interface AnalysisResult {
  tipo_metabolico: 'A' | 'B' | 'C';
  titulo_perfil: string;
  foco_principal: string;
  recomendacoes: string[];
  expectativa_kg: number;
  descricao_detalhada: string;
  scores: AnalysisScores;
}

export interface QuizState {
  currentStep: Step;
  questionIndex: number;
  answers: UserAnswers;
  result: AnalysisResult | null;
}
