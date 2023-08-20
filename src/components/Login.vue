<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">Preencha os campos</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="studentName"
                label="Nome"
                :rules="nameRules"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="inviteCode"
                label="Código"
                :rules="codeRules"
                required
                outlined
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn :disabled="!valid" color="primary" @click="fetchQuiz">Iniciar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { createMock } from './mock';
import { useQuizStore } from '@/store/quiz';

const quizStore = useQuizStore();

const studentName = ref('');
const inviteCode = ref('');
const valid = ref(false);

const emit = defineEmits(['login-success']);

const nameRules = [
  value => !!value || 'Nome é obrigatório'
];

const codeRules = [
  value => !!value || 'Código é obrigatório'
]

async function fetchQuiz() {
  try {
    const params = {
      invite_code: inviteCode.value,
      student_name: studentName.value
    };

    const response = await axios.get('https://meu-server.com/api/quizzes', params);

    quizStore.setQuestions(response.data.questions);
    quizStore.setStudentId(response.data.student_id)

    emit('login-success');
  } catch (error) {;
    console.log('Erro ao resgatar quiz: ', error);
  }
}
</script>