// src/data/student.js

const student = {
    personalDetails: {
      id: 1,
      name: 'Testing Student',
      age: 16,
      grade: 12,
      contact: {
        email: 'jo@example.com',
        phone: '+270',
        address: '123',
      },
    },
    
    paymentInformation: [
      {
        paymentId: 1,
        sessionType: '1 Month Session',
        amountPaid: 0,
        datePaid: '2024-09-01',
        sessionsCovered: [
          {
            sessionId: 1,
            subject: 'Mathematics',
            topic: 'Algebra',
            startDate: '2024-09-02',
            endDate: '2024-09-02',
          },
          {
            sessionId: 2,
            subject: 'Biology',
            topic: 'Cell Structure',
            startDate: '2024-09-03',
            endDate: '2024-09-03',
          },
        ],
      },
      {
        paymentId: 2,
        amountPaid: 0,
        datePaid: '2024-09-10',
        sessionsCovered: [
          {
            sessionId: 3,
            sessionType: '1 Month Session',
            subject: 'Physics',
            topic: "Newton's Laws",
            startDate: '2024-09-11',
            endDate: '2024-09-11',
          },
          {
            sessionId: 4,
            subject: 'Chemistry',
            topic: 'Periodic Table',
            startDate: '2024-09-13',
            endDate: '2024-09-13',
          },
          {
            sessionId: 5,
            subject: 'English',
            topic: 'Essay Writing',
            startDate: '2024-09-15',
            endDate: '2024-09-15',
          },
        ],
      },
    ],
    tutoringHistory: [
      { id: 1, date: '2024-09-02', subject: 'Mathematics', topic: 'Algebra', feedback: 'Good', comments: 'Solid understanding of algebraic equations.', improvements: 'Practice word problems.', moreTimeNeeded: false },
      
    ],
    quizHistory: [
      { date: '2024-09-05', subject: 'Fuck wrong', topic: 'Mechanics', numQuestions: 10, score: 8, feedback: 'Great job! You\'re doing really well!' },
      
    ]
  };
  
  export default student;
  // upcomingSessions] = useState([
   //  { id: 1, date: '2024-09-18', subject: 'Mathematics' },
  //   { id: 2, date: '2024-09-20', subject: 'Physics' },
   // { id: 3, date: '2024-09-22', subject: 'Biology' },
  //  { id: 4, date: '2024-09-24', subject: 'Chemistry' },
  //  { id: 5, date: '2024-09-26', subject: 'English' },