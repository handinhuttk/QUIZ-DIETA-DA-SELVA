
import { QuizPage } from './types';

export const QUIZ_FLOW: QuizPage[] = [
  {
    id: 'intro',
    title: 'Para começarmos, qual seu nome e email?',
    inputs: [
      { id: 'nome', type: 'text', placeholder: 'Seu primeiro nome' },
      { id: 'email', type: 'email', placeholder: 'Seu melhor e-mail' }
    ]
  },
  {
    id: 'objetivo',
    title: 'Olá, qual seu principal objetivo hoje?',
    inputs: [
      {
        id: 'objetivo_principal',
        type: 'radio',
        options: [
          { label: 'Emagrecer e definir o corpo', value: 'emagrecer_definir' },
          { label: 'Melhorar saúde e disposição', value: 'saude_disposicao' },
          { label: 'Reduzir inflamação e inchaço', value: 'reduzir_inflamacao' },
          { label: 'Ter mais energia e vitalidade', value: 'energia_vitalidade' }
        ]
      }
    ]
  },
  {
    id: 'dificuldade',
    title: 'Como você descreveria sua dificuldade para emagrecer?',
    inputs: [
      {
        id: 'nivel_dificuldade',
        type: 'radio',
        options: [
          { label: 'Muito difícil - nada funciona', value: 'muito_dificil' },
          { label: 'Difícil - consigo pouco, depois volto', value: 'dificil_sanfona' },
          { label: 'Moderado - preciso de orientação certa', value: 'moderado' },
          { label: 'Fácil - só preciso de um plano', value: 'facil' }
        ]
      }
    ]
  },
  {
    id: 'historico_peso',
    title: 'Quanto tempo faz desde que você esteve no peso dos sonhos?',
    inputs: [
      {
        id: 'tempo_peso_ideal',
        type: 'radio',
        options: [
          { label: 'Menos de 1 ano', value: '<1ano' },
          { label: '1-3 anos', value: '1-3anos' },
          { label: 'Mais de 3 anos', value: '>3anos' },
          { label: 'Nunca estive', value: 'nunca' }
        ]
      }
    ]
  },
  {
    id: 'perfil_dieta',
    title: 'Qual desses perfis mais se parece com você?',
    inputs: [
      {
        id: 'perfil_historico',
        type: 'radio',
        options: [
          { label: 'Sempre fiz dieta, pouco resultado', value: 'resistente' },
          { label: 'Já emagreci, mas engordei tudo de novo', value: 'sanfona' },
          { label: 'Nunca consegui seguir dieta até o fim', value: 'inconstante' },
          { label: 'Novo no mundo do emagrecimento', value: 'iniciante' }
        ]
      }
    ]
  },
  {
    id: 'regiao',
    title: 'Qual região mais te incomoda?',
    inputs: [
      {
        id: 'regiao_gordura',
        type: 'radio',
        options: [
          { label: 'Barriga e cintura', value: 'abdominal' },
          { label: 'Coxas e culote', value: 'inferior' },
          { label: 'Braços e costas', value: 'superior' },
          { label: 'Todo o corpo', value: 'geral' }
        ]
      }
    ]
  },
  {
    id: 'conhecimento_carnivora',
    title: 'Você conhece a Dieta Carnívora?',
    inputs: [
      {
        id: 'nivel_consciencia',
        type: 'radio',
        options: [
          { label: 'Nunca ouvi falar', value: 'nenhum' },
          { label: 'Já ouvi, mas não conheço', value: 'baixo' },
          { label: 'Conheço pouco', value: 'medio' },
          { label: 'Já experimentei', value: 'alto' }
        ]
      }
    ]
  },
  {
    id: 'cafe',
    title: 'Como é sua rotina de refeições? Horário do café:',
    inputs: [
      {
        id: 'horario_cafe',
        type: 'radio',
        options: [
          { label: 'Antes das 7h', value: 'cedo' },
          { label: '7h-9h', value: 'medio' },
          { label: 'Depois das 9h', value: 'tarde' },
          { label: 'Não tomo café', value: 'jejum' }
        ]
      }
    ]
  },
  {
    id: 'almoco',
    title: 'Horário do almoço:',
    inputs: [
      {
        id: 'horario_almoco',
        type: 'radio',
        options: [
          { label: '11h-13h', value: 'cedo' },
          { label: '13h-15h', value: 'medio' },
          { label: 'Depois das 15h', value: 'tarde' },
          { label: 'Almoço irregular', value: 'irregular' }
        ]
      }
    ]
  },
  {
    id: 'janta',
    title: 'Horário da janta:',
    inputs: [
      {
        id: 'horario_janta',
        type: 'radio',
        options: [
          { label: '18h-20h', value: 'cedo' },
          { label: '20h-22h', value: 'medio' },
          { label: 'Depois das 22h', value: 'tarde' },
          { label: 'Janto muito tarde', value: 'muito_tarde' }
        ]
      }
    ]
  },
  {
    id: 'trabalho',
    title: 'Qual sua rotina de trabalho?',
    inputs: [
      {
        id: 'rotina_trabalho',
        type: 'radio',
        options: [
          { label: 'Horário comercial (9h-18h)', value: 'comercial' },
          { label: 'Turnos/noturno', value: 'turnos' },
          { label: 'Home office flexível', value: 'home_office' },
          { label: 'Não trabalho atualmente', value: 'livre' }
        ]
      }
    ]
  },
  {
    id: 'exercicios',
    title: 'Frequência de exercícios?',
    inputs: [
      {
        id: 'freq_exercicios',
        type: 'radio',
        options: [
          { label: '4+ vezes/semana', value: 'alta' },
          { label: '2-3 vezes/semana', value: 'media' },
          { label: '1 vez/semana ou menos', value: 'baixa' },
          { label: 'Não faço exercícios', value: 'sedentario' }
        ]
      }
    ]
  },
  {
    id: 'gatilho',
    title: 'Qual desses eventos contribuiu para seu ganho de peso?',
    inputs: [
      {
        id: 'evento_gatilho',
        type: 'radio',
        options: [
          { label: 'Gravidez/maternidade', value: 'maternidade' },
          { label: 'Estresse/trabalho', value: 'estresse' },
          { label: 'Relacionamento', value: 'relacionamento' },
          { label: 'Menopausa/hormônios', value: 'hormonal' },
          { label: 'Nenhum especificamente', value: 'indefinido' }
        ]
      }
    ]
  },
  {
    id: 'altura',
    title: 'Qual sua altura? (para cálculo de IMC)',
    inputs: [
      {
        id: 'altura_cm',
        type: 'slider',
        min: 140,
        max: 190,
        unit: 'cm',
        step: 1
      }
    ]
  },
  {
    id: 'peso',
    title: 'Metas de Peso',
    inputs: [
      {
        id: 'peso_atual',
        type: 'slider',
        label: 'Qual seu peso atual?',
        min: 40,
        max: 120,
        unit: 'kg',
        step: 1
      },
      {
        id: 'peso_desejado',
        type: 'slider',
        label: 'Qual peso deseja alcançar?',
        min: 40,
        max: 100,
        unit: 'kg',
        step: 1
      }
    ]
  }
];

export const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v3/sPDQ5kqBSRHTYFCjJN1v";
