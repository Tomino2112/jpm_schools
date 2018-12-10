import {fetchSchools, fetchSchoolSAT} from "./api/CityOfNYEduAPI";
import React, { Component } from 'react';
import Detail from './components/Detail';
import List from './components/List';

import './App.scss';


export default class App extends Component {
  state = {
      error: null,
      loading: false,
      schoolsArr: [],
      schoolsObj: {},
      selectedSchool: null,
  };

  async componentDidMount() {
      this.setState({loading: true});
      try {
          const result = await fetchSchools();
          this.setState({
              schoolsArr: result,
              schoolsObj: result.reduce((schools, school) => ({...schools, [school.dbn]: school}), {})
          });
      } catch {
          this.setState({error: 'Sorry, could not load schools at this time.'});
      } finally {
          this.setState({loading: false});
      }
  }

  selectSchool = async schoolDbn => {
      const selectedSchool = this.state.schoolsObj[schoolDbn];
      if (!selectedSchool) {
          this.setState({error: 'Sorry, the school you tried to select has not been loaded.'});
          return;
      }

      this.setState({loading: true});
      try {
          selectedSchool.sat_scores = await fetchSchoolSAT(schoolDbn);
          this.setState({selectedSchool});
      } catch {
          this.setState({error: 'Sorry, could not load SAT scores for the selected School.'});
      } finally {
          this.setState({loading: false});
      }
  };

  render() {
    const selectedSchoolId = (this.state.selectedSchool)
        ? this.state.selectedSchool.dbn
        : null;
    return (
      <div className="App container-fluid pl-0 pr-0">
          <div className="row no-gutters">
              <aside className="col-4">
                <List
                    items={this.state.schoolsArr}
                    selected={selectedSchoolId}
                    onClick={this.selectSchool}
                />
              </aside>
              <div className="content col-8">
                <Detail data={this.state.selectedSchool} />
              </div>
          </div>
      </div>
    );
  }
}
