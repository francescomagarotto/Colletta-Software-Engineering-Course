import React, { Component } from 'react';
import { connect } from 'react-redux';

import LanguageStructure from '../../helpers/LanguageIterator';
import SolutionMapper from '../../helpers/SolutionMapper';
import { updateWordState } from '../../actions/ExerciseActions';

class Word extends Component {
  constructor(props) {
    super(props);
    const { gerarchy, updateWordStateDispatch, solutionTag } = props;
    const languageIterator = new LanguageStructure(gerarchy).getBaseIterator(); // NON VA BENE, VA CAMBIATO

    updateWordStateDispatch({
      languageIterator,
      buttons: languageIterator.getCurrentButtonList(),
      solution:
        solutionTag.charAt(0) !== 'F'
          ? new SolutionMapper(solutionTag, gerarchy).getVerboseSolution()
          : '',
      index: props.index,
      showButton: props.showButton
    });
  }

  /**
   *
   * Generates the first set of buttons given by the user choice
   *
   * @param {*} item Selected item (level 0)
   */

  backOne = () => {
    try {
      const { updateWordStateDispatch, newExercise, index } = this.props;
      const state = newExercise.userSolution[index];
      const { languageIterator } = state;
      languageIterator.prevLevel();

      updateWordStateDispatch({
        ...state,
        languageIterator,
        buttons: languageIterator.getCurrentButtonList(),
        solution: languageIterator.getVerboseSolution()
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Genrates next list of buttons
   *
   * @param {*} item  Selected elementend (level 1+)
   */
  generateNext = button => {
    try {
      const { updateWordStateDispatch, newExercise, index } = this.props;
      const state = newExercise.userSolution[index];
      const { languageIterator } = state;
      languageIterator.nextLevel(button);
      updateWordStateDispatch({
        ...state,
        buttons: languageIterator.getCurrentButtonList(),
        solution: languageIterator.getVerboseSolution(),
        languageIterator
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Reset the word solution and buttons
   */
  reset = () => {
    const { updateWordStateDispatch, newExercise, index } = this.props;
    const state = newExercise.userSolution[index];
    const { languageIterator } = state;
    languageIterator.setBaseLevel();
    updateWordStateDispatch({
      ...state,
      buttons: languageIterator.getCurrentButtonList(),
      solution: languageIterator.getVerboseSolution(),
      languageIterator
    });
  };

  edit = () => {
    const { updateWordStateDispatch, newExercise, index } = this.props;
    const state = newExercise.userSolution[index];
    updateWordStateDispatch({
      ...state,
      showButton: true
    });
  };

  render() {
    const {
      parola,
      solutionTag,
      showSolution,
      gerarchy,
      newExercise,
      index
    } = this.props;
    const state = newExercise.userSolution[index];
    const { buttons, solution, showButton } = state;
    const allowedPunctuation = /[,.?!"'<>;:]/g;

    if (parola.match(allowedPunctuation) !== null) {
      return <React.Fragment />;
    }

    return (
      <li
        className="list-group-item"
        ref={liElement => {
          this.liElement = liElement;
        }}
      >
        <div>
          <div className="container-fluid">
            <div className="row ">
              <div className="pt-2  col-md-auto">
                {buttons && showButton && (
                  <React.Fragment>
                    <button
                      type="button"
                      className="border-0 btn btn-outline-danger btn-sm"
                      onClick={this.backOne}
                      disabled={solution.length === 0}
                    >
                      <i className="fa fa-fw fa-undo" />
                    </button>
                    <button
                      type="button"
                      className="border-0 btn btn-outline-danger btn-sm"
                      onClick={this.reset}
                      disabled={solution.length === 0}
                    >
                      <i className="fa fa-fw fa-trash" />
                    </button>
                  </React.Fragment>
                )}
                {buttons && showButton === false && showSolution === false && (
                  <button
                    type="button"
                    className="border-0 btn btn-outline-danger btn-sm"
                    onClick={this.edit}
                  >
                    MODIFICA
                  </button>
                )}

                <strong className="p-2 text-uppercase">{parola}</strong>
              </div>

              <div className=" col-md-auto text-uppercase shwo-tooltip">
                {solution && (
                  <p title="La tua soluzione" className="bg-light p-2 mb-2">
                    {solution}
                  </p>
                )}

                {!showButton &&
                  solutionTag &&
                  new SolutionMapper(
                    solutionTag,
                    gerarchy
                  ).getVerboseSolution() && (
                    <p
                      title="La soluzione automatica"
                      className=" text-warning my-2 text-uppercase"
                    >
                      {new SolutionMapper(
                        solutionTag,
                        gerarchy
                      ).getVerboseSolution()}
                    </p>
                  )}
              </div>
            </div>
            {/* <div className="row justify-content-end">
              <div className=" col-md-9 col-12 text-warning text-uppercase">
                {showSolution === true && usefulFields}
              </div>
            </div> */}
          </div>
        </div>

        {buttons &&
          showSolution === false &&
          showButton &&
          buttons.map((button, index) => {
            return (
              <button
                type="button"
                className="btn btn-outline-primary m-1"
                key={`index${index}`}
                onClick={() => this.generateNext(button)}
              >
                {button.full}
              </button>
            );
          })}
      </li>
    );
  }
}
const mapStateToProps = store => {
  return {
    newExercise: store.exercise.newExercise
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateWordStateDispatch: word => dispatch(updateWordState(word))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Word);
