import React, { Component } from 'react';
import Gmail_API from './services/Gmail_API';
import WelcomePage from './component/WelcomePage';
import SortingViewPage from './component/SortingViewPage';
import ViewSortingPage from './component/ViewSortingPage';
import WriteEmail from './component/WriteEmail';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sessions: [],
      haveSession: false,
      numSessions: 0,
      currentSession: -1,
      currentViewState: -1,
    }
  }

  findSession = (email) => {
    const sessions = this.state.sessions;
    for(let index = 0; index < sessions.length; index++){
      if(sessions[index].email === email)
      {
        return [true,index];
      }
    }
    return [false, -1];
  }

  getProfile = async (pro) => {
    if(pro) {
      //console.log(pro);
      const tempEmail = pro.profileObj.email;
      const exist = this.findSession(tempEmail);
      const sessions = this.state.sessions;
      let currentSession = this.state.currentSession;
      let numSessions = this.state.numSessions;
      let haveSession = this.state.haveSession;
      if( !exist[0] ) {
        let tempToken = `Bearer ${pro.accessToken}`;
        let id = pro.profileObj.googleId;
        let name = pro.profileObj.name;
        haveSession = true;
        numSessions = ++numSessions;
        currentSession = ++currentSession;
        const messages = await Gmail_API.getInbox(id,tempToken);
        let messagesTotal = messages.data.resultSizeEstimate;
        let inbox = messages.data.messages;
        console.log(messages);

        sessions.push({
          id: id,
          email: tempEmail,
          accessToken: tempToken,
          name: name,
          messagesTotal: messagesTotal,
          inbox: inbox,
        });

      }
      this.setState({
        sessions: sessions,
        numSessions: numSessions,
        currentSession: currentSession,
        haveSession: haveSession,
        currentViewState: 'SortingView',

      })
    }
  }

  onView = () => {
    const currentState = this.state.currentViewState;
    switch (currentState) {
      case 'SortingView':
        return <SortingViewPage/>;
      case 'ViewSorting':
        return <ViewSortingPage/>;
      case 'WriteEmail':
        return <WriteEmail/>;
      default:
        return <WelcomePage handleProfile={this.getProfile}/>;
    }
  }

  render() {
    return (
      <div className="App">
        {this.onView()}
      </div>
    );
  }
}

export default App;
