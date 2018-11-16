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
      rawAllInboxs: [],
      allInboxs: [{},],
    }
  }

  decodeInbox = async () => {
    let  toRender = []
    let rawAllInboxs = this.state.rawAllInboxs;
    for(let i = 0; i < this.state.rawAllInboxs.length; i ++)
    {
      let elem = rawAllInboxs[i];
      const msg = await Gmail_API.getMessage(elem.userId,elem.id,elem.token)

      toRender.push( msg);
    }
    return toRender;
  }


  // componentDidUpdate(data) {
  //   if(this.props.allInboxs)
  //   if(this.props.allInboxs[0] !== this.state.allInboxs[0])
  //   {
  //     this.setState({
  //       allInboxs: data,
  //     })
  //   }
  // }

  addInbox = async () => {
      let rawAllInboxs = this.state.rawAllInboxs;
      let index = this.state.currentSession;
      rawAllInboxs.push(...this.state.sessions[index].inbox);

      this.setState({
        rawAllInboxs: rawAllInboxs,
      })
      if(rawAllInboxs.lenght > 50) {
        console.log(...rawAllInboxs.slice(51) );
      }
      const result = await this.decodeInbox();
      console.log(result);
      this.setState({
        allInboxs: result,
      })
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
        for(let index = 0; index < inbox.length; index++){
          inbox[index].token = tempToken;
          inbox[index].userId = id
        }

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
      await this.addInbox();
    }
  }

  onView = () => {
    const currentState = this.state.currentViewState;
    switch (currentState) {
      case 'SortingView':
        return <SortingViewPage handleProfile={this.getProfile}
                                allInboxs={this.state.allInboxs}
                                />;
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
