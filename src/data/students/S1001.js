const S1001 = {
  personalDetails: {
    id: 'S1001',
    name: 'test',
    age: 17,
    grade: 12,
    contact: {
      email: 'testi@email.com',
      phone: '+27 123 456 7890',
      address: 'Blovk test, Soshanguve, Pretoria, Gauteng, South Africa',
    },
  },

  paymentInformation: [
    {
      sessionId: 1,
      sessionType: '1 Month Session',
      amountPaid: 1200,
      datePaid: '2024-09-01',
      startDate: '2024-09-02',
      endDate: '2024-09-02',
    },
    {
      sessionId: 2,
      sessionType: 'Regular Session',
      amountPaid: 1500,
      datePaid: '2024-09-10',
      startDate: '2024-09-11',
      endDate: '2024-09-10', // Note: Check this end date, as it may need correction
    },
    {
      sessionId: 3,
      sessionType: 'Regular Session',
      amountPaid: 1500,
      datePaid: '2024-09-10',
      startDate: '2024-09-13',
      endDate: '2025-09-01',
    },
    {
      sessionId: 4,
      sessionType: '1 Month Session',
      amountPaid: 1000,
      datePaid: '2024-09-10',
      startDate: '2024-09-15',
      endDate: '2024-09-29',
    },
  ],
  tutoringHistory: [
    // { id: 1, date: '2024-09-02', subject: 'Math', topic: 'Algebra', feedback: 'Good', comments: 'Solid understanding of algebraic equations.', improvements: 'Practice word problems.', moreTimeNeeded: false },
    // { id: 2, date: '2024-09-03', subject: 'Biology', topic: 'Cell Structure', feedback: 'Average', comments: 'Needs to focus on organelle functions.', improvements: 'Revise cell organelles.', moreTimeNeeded: true },
    // { id: 3, date: '2024-09-05', subject: 'Science', topic: "Newton's Laws", feedback: 'Good', comments: 'Great understanding of the concepts.', improvements: 'Practice more on application of Newton’s Laws.', moreTimeNeeded: false },
    
  ],
  quizHistory: [
    // { date: '2024-09-05', subject: 'Teas', topic: 'Test one', numQuestions: 10, score: 8, feedback: 'Great job! You\'re doing really well!' },
    
  ],
  comingSessions: [
    // { id: 1, date: '2024-09-22', subject: 'Mathematics', topic: 'Algebra' },
    
  ],

  academicPerformance: {
    averageGrade: '50', // No data provided for average grade
    bestSubject: 'N/A', // No data for best performing subject
    subjectNeedingImprovement: 'All', // No data for subject needing improvement
  }
};

export default S1001;
