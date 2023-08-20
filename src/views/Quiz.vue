<template>
  <Login v-if="currentStep === 'login'" @login-success="nextStep()" />
  <QuizCards v-else-if="currentStep === 'quiz'" @quiz-success="finishQuiz()" />
  <Finish v-else />
</template>

<script setup>
import Finish from '@/components/Finish.vue';
import Login from '@/components/Login.vue';
import QuizCards from '@/components/QuizCards.vue';
import { ref } from 'vue';

const currentStep = ref('login');

function nextStep() {
  currentStep.value = 'quiz';
};

function finishQuiz() {
  currentStep.value = 'finished';
};
</script>
