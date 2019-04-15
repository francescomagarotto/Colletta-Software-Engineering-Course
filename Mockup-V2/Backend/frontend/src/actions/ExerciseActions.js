// import axios from 'axios';
import axios from 'axios';
import { store } from '../index';

export const innerLoaderOn = () => {
  return dispatch => {
    dispatch({ type: 'INNER_LOADER_ON' });
  };
};
export const innerLoaderOff = () => {
  return dispatch => {
    dispatch({ type: 'INNER_LOADER_OFF' });
  };
};

export const initializeNewExercise = () => {
  return dispatch => {
    dispatch({ type: 'INIT_EXERCISE' });
  };
};

export const initNewExerciseState = newExercise => {
  // const allowedPunctuation = /[a-zA-Z]/g;
  return dispatch => {
    dispatch({
      type: 'INIT_NEW_EXERCISE',
      newExercise: {
        ...newExercise,
        userSolution: newExercise.sentence
          // .filter(word => word.match(allowedPunctuation))
          .map(() => {
            return {};
          })
      }
    });
  };
};

export const updateNewExerciseState = newExercise => {
  return dispatch => {
    dispatch({ type: 'UPDATE_EXERCISE', newExercise });
  };
};

export const updateStudentList = studentList => {
  return dispatch => {
    dispatch({ type: 'UPDATE_STUDENT_LIST', studentList });
  };
};

export const changeNewInputSentence = data => {
  return dispatch => {
    dispatch({ type: 'CHANGE_INPUT_SENTENCE_DATA', data });
  };
};

export const updateWordState = word => {
  return dispatch => {
    dispatch({ type: 'UPDATE_WORD_STATE', word });
  };
};

export const saveFreeExercise = newExercise => {
  return dispatch => {
    dispatch(innerLoaderOn());
    const { id } = store.getState().auth.user;

    axios
      .post(
        'http://localhost:8081/exercises/student/insert-free-exercise',
        {
          assignedUsersIds: null,
          phraseText: newExercise.sentenceString,
          mainSolution: JSON.stringify(newExercise.codeSolution),
          alternativeSolution: '',
          visibility: true,
          author: id,
          date: new Date().getTime(),
          language: 'it'
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: store.getState().auth.token
          }
        }
      )
      .then(res => {
        dispatch({ type: 'SAVE_EXERCISE_SUCCESS', newExercise });
      })
      .catch(() => dispatch({ type: '' }));
  };
};

export const saveSolution = newExercise => {
  return dispatch => {
    dispatch(innerLoaderOn());
    axios
      .post(
        'http://localhost:8081/exercises/student/do',
        {
          solutionFromStudent: JSON.stringify(newExercise.codeSolution),
          exerciseId: newExercise.id
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: store.getState().auth.token
          }
        }
      )
      .then(res => {
        const { exercise } = store.getState();
        const { doneExercises, todoExercises } = exercise;
        const { solutionText, mark, reliability } = res.data;
        const objSolution = JSON.parse(solutionText);

        const indexNewExercise = todoExercises.findIndex(
          element => element.id === newExercise.id
        );

        /* if (indexNewExercise > -1) {
          todoExercises.splice(indexNewExercise, 1);
          doneExercises.push(res.data);

          // dispatch({ type: 'LOAD_TODO_SUCCESS', todo: todoExercises });
        } */
        dispatch({
          type: 'SAVE_EXERCISE_SUCCESS',
          newExercise: {
            response: objSolution.map(item => {
              return { tag: item };
            }),
            mark,
            reliability
          }
        });
      })
      .catch(() => dispatch({ type: '' }));
  };
};

export const saveExerciseSolution = newExercise => {
  return dispatch => {
    dispatch(innerLoaderOn());
    const { id } = store.getState().auth.user;
    // prelevo dal response la soluzione della punteggiatuera

    axios
      .put(
        'http://localhost:8081/exercises/insert-exercise',
        {
          assignedUsersIds: store
            .getState()
            .exercise.studentList.filter(student => student.check)
            .map(student => student.id),
          phraseText: newExercise.sentenceString,
          mainSolution: JSON.stringify(newExercise.codeSolution),
          alternativeSolution: '',
          visibility: true,
          author: id,
          date: new Date().getTime(),
          language: 'it' // //////////////////////////////DA CAMBIARE
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: store.getState().auth.token
          }
        }
      )
      .then(res => {
        dispatch({ type: 'SAVE_EXERCISE_SUCCESS', newExercise });
      })
      .catch(() => dispatch({ type: '' }));
  };
};

export const loadTodoExercises = () => {
  return dispatch => {
    dispatch(innerLoaderOn());
    axios
      .get('http://localhost:8081/exercises/user-todo', {
        headers: {
          Authorization: store.getState().auth.token
        }
      })
      .then(res => {
        dispatch({ type: 'LOAD_TODO_SUCCESS', todo: res.data });
      })
      .catch(() => dispatch({ type: '' }));
  };
};

export const loadDoneExercises = () => {
  return dispatch => {
    dispatch(innerLoaderOn());
    axios
      .get('http://localhost:8081/exercises/done', {
        headers: {
          Authorization: store.getState().auth.token
        }
      })
      .then(res => {
        dispatch({ type: 'LOAD_DONE_SUCCESS', todo: res.data });
      })
      .catch(() => dispatch({ type: '' }));
  };
};

export const getAutomaticSolution = sentenceString => {
  return dispatch => {
    axios
      .post(
        `http://localhost:8081/exercises/automatic-solution`,
        {
          text: sentenceString.trim()
        },
        {
          headers: {
            Authorization: store.getState().auth.token
          }
        }
      )
      .then(res => {
        dispatch(
          updateNewExerciseState({
            response: JSON.parse(res.data.solutionText).sentences[0].tokens // .filter(token => token.tag.charAt(0) !== 'F')
          })
        );
        dispatch(innerLoaderOff());
      })
      .catch(e => console.error(e));
  };
};

export const getAllStudents = () => {
  return dispatch => {
    axios
      .get('http://localhost:8081/users/get-students', {
        headers: {
          Authorization: store.getState().auth.token
        }
      })
      .then(resGetStudent => {
        dispatch(updateStudentList(resGetStudent.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};
/* {
  "assignedUsersIds": [
    "demoData"
  ],
  "phraseText": "demoData",
  "mainSolution": "demoData",
  "alternativeSolution": "demoData",
  "visibility": true,
  "author": "demoData",
  "date": 1,
  "language": "demoData"
  } */