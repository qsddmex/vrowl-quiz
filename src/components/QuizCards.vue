<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-window v-model="currentStep">
            <v-window-item
              v-for="(question, index) in questions"
              :key="index"
              :value="index"
            >
              <v-card-title class="text-h6 font-weight-regular text-wrap">
                {{ currentQuestion.statement }}
              </v-card-title>

              <v-card-text>
                <v-checkbox
                  v-for="alternative in currentQuestion.alternatives"
                  :key="alternative.alternative_id"
                  v-model="selectedAlternativeId"
                  :label="alternative.text"
                  :value="alternative.alternative_id"
                ></v-checkbox>
              </v-card-text>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              v-if="isLastQuestion"
              :disabled="!selectedAlternativeId"
              color="primary"
              variant="flat"
              block
              @click="nextQuestion()"
            >
              Próxima
            </v-btn>
            <v-btn
              v-else
              color="success"
              variant="flat"
              block
              @click="nextQuestion()"
            >
              Finalizar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuizStore } from '@/store/quiz';
import axios from 'axios';

const quizStore = useQuizStore();

const questions = computed(() => quizStore.questions);

const currentStep = ref(0);
const currentQuestion = ref(questions.value[currentStep.value]);
const selectedAlternativeId = ref(null);
const completeAnswers = ref([]);

const emit = defineEmits(['quiz-success']);

const isLastQuestion = computed(() => {
  return currentStep.value < questions.value.length - 1;
});

const nextQuestion = () => {
  if (selectedAlternativeId.value !== null && isLastQuestion) {
    completeAnswers.value.push({
      question_id: currentQuestion.value.question_id,
      alternative_id: selectedAlternativeId.value
    });

    selectedAlternativeId.value = null;
    currentStep.value++;
    currentQuestion.value = questions.value[currentStep.value];

    if(!currentQuestion.value) finishQuiz();
  }
};

const finishQuiz = async () => {
  try {
    await axios.post('http://localhost:3000/api/answers', completeAnswers.value);

    emit('quiz-success');
  } catch (error) {
    console.log('Erro ao finalizar prova', error);
  }
};
</script>
