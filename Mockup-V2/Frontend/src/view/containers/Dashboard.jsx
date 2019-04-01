import React, { Component } from 'react';
import { connect } from 'react-redux';
import _translator from '../../helpers/Translator';

class Dashboard extends Component {
  render() {
    console.log(this.props.user);
    const { firstName } = this.props.user;
    return (
      <div className="app-main__inner full-height-mobile">
        <div className="row justify-content-center">
          <div className="py-5 text-center">
            <h2>{_translator('gen_userDashboard')}</h2>
            <p className="lead">
              {_translator('dashboard_hiUser')}
              {firstName}
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-11">
            <div className="card">
              <h5 className="card-header">
                {_translator('gen_userDashboard')}
              </h5>
              <div className="card-body">
                Pagina con varie carte, praticamente un riassunto delle varie
                pagine
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user
  };
};

export default connect(mapStateToProps)(Dashboard);
