<template>
  <Login v-if="currentStep === 'login'" @login-success="nextStep()" />
  <QuizCards v-else-if="currentStep === 'quiz'" @quiz-success="finishQuiz()" />
</template>

<script setup>
import Login from '@/components/Login.vue';
import QuizCards from '@/components/QuizCards.vue';
import { ref } from 'vue';

const currentStep = ref('login');

function nextStep() {
  currentStep.value = 'quiz';
};
</script>
