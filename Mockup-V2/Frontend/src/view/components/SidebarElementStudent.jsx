import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import _translator from '../../helpers/Translator';

class SidebarElementStudent extends Component {
  state = {};

  render() {
    const { language } = this.props;
    return (
      <React.Fragment>
        <li>
          <a href="#root">
            <i className="metismenu-icon pe-7s-pen" />
            {_translator('sidebarElementStudent_exercise', language)}
            <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
          </a>
          <ul>
            <li>
              <NavLink to="/exercise" activeClassName="mm-active">
                {_translator('sidebarElementStudent_freeExercise', language)}
              </NavLink>
            </li>
            <li>
              <NavLink to="/homework" activeClassName="mm-active">
                {_translator('sidebarElementStudent_exercises', language)}
              </NavLink>
            </li>
            <li>
              <NavLink to="/grades" activeClassName="mm-active">
                {_translator('sidebarElementStudent_marks', language)}
              </NavLink>
            </li>
          </ul>
        </li>
      </React.Fragment>
    );
  }
}

export default SidebarElementStudent;
