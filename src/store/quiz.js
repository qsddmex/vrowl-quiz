// Utilities
import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quizStore', {
  state: () => ({
    questions: [],
    studentId: null,
  }),
  actions: {
    setQuestions(questions) {
      this.questions = questions;
    },
    setStudentId(studentId) {
      this.studentId = studentId;
    },
  },
})
