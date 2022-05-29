import { firestore } from './firebase';

//* Users
export const createUser = (uid, name, imageUrl) => {
  return firestore.collection('Users').doc(uid).set({
    uid,
    name,
    imageUrl,
    role: 'user'
  });
};

// Create new question for current quiz
export const addQuizForUser = (uid, currentQuizId, data) => {
  return firestore
    .collection('Users')
    .doc(uid)
    .collection('Quizzes')
    .doc(currentQuizId)
    .set(data);
};

// Get All Users
export const getUsers = () => {
  return firestore.collection('Users').get();
};

// Get Users Details by id
export const getUserById = uid => {
  return firestore.collection('Users').doc(uid).get();
};

// Get data of user by uid
export const getDataByUid = uid => {
  return firestore
    .collection('Users')
    .doc(uid)
    .collection('Quizzes')
    .get();
};

// Get data of user by uid and quizId
export const getDataByUidAndQuizId = (uid, currentQuizId) => {
  return firestore
    .collection('Users')
    .doc(uid)
    .collection('Quizzes')
    .doc(currentQuizId)
    .get();
};

//* Quizzes
export const createQuiz = (currentQuizId, title, description, imageUrl) => {
  return firestore.collection('Quizzes').doc(currentQuizId).set({
    title,
    description,
    imageUrl,
  });
};

// Create new question for current quiz
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return firestore
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .doc(currentQuestionId)
    .set(question);
};

// Get All Quizzes
export const getQuizzes = () => {
  return firestore.collection('Quizzes').get();
};

// Get Quiz Details by id
export const getQuizById = currentQuizId => {
  return firestore.collection('Quizzes').doc(currentQuizId).get();
  };

export const getQuizById2 = currentQuizId => {
  return firestore.collection('Quizzes').doc('123456');
  };

// Get Questions by currentQuizId
export const getQuestionsByQuizId = currentQuizId => {
  return firestore
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .get();
};
