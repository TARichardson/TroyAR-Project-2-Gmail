import React, { Component } from 'react';
import Gmail_API from './services/Gmail_API';
import SortsList from './component/SortsList';
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
      selected: [],
      sortStack: [[],],
    }
  }

  addToSort = async (arr) => {
    let arrSort = this.state.sortStack;
    arrSort.push(arr);
    this.setState({
      sortStack: arrSort,
    })
  }

  decodeInbox = async () => {
    let  toRender = []
    let rawAllInboxs = this.state.rawAllInboxs;
    for(let i = 0; i < this.state.rawAllInboxs.length; i ++)
    {
      let elem = rawAllInboxs[i];
      const msg = await Gmail_API.getMessage(elem.userId,elem.id,elem.token)
      msg.userIdURL = elem.userIdURL;
      toRender.push( msg );
    }
    return toRender;
  }

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
    let arrSort = [];
    arrSort.push(result);
    console.log(result);
    this.setState({
      allInboxs: result,
      sortStack: arrSort,
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
        let idURL = pro.profileObj.imageUrl;
        let name = pro.profileObj.name;
        haveSession = true;
        numSessions = ++numSessions;
        currentSession = ++currentSession;
        const messages = await Gmail_API.getInbox(id,tempToken);
        let messagesTotal = messages.data.resultSizeEstimate;
        let inbox = messages.data.messages;
        for(let index = 0; index < inbox.length; index++){
          inbox[index].token = tempToken;
          inbox[index].userId = id;
          inbox[index].userIdURL = idURL;
        }

        sessions.push({
          id: id,
          idURL: idURL,
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
  onRefreshInbox = async () => {
    let messagesTotal = 0;
    let rawInbox = [];
    const updatedSessions = [];
    for(let index = 0; index < this.state.numSessions; index++) {
      let tempToken = this.state.sessions[index].accessToken;
      let id = this.state.sessions[index].id;
      let name = this.state.sessions[index].name;
      let tempEmail = this.state.sessions[index].email;
      let idURL = this.state.sessions[index].imageUrl;
      const messages = await Gmail_API.getInbox(id,tempToken);
      let currentMessagesTotal = messages.data.messages.length;
      let inbox = messages.data.messages;

      for(let index = 0; index < inbox.length; index++){
        inbox[index].token = tempToken;
        inbox[index].userId = id;
        inbox[index].userIdURL = idURL;
      }

      updatedSessions.push({
        id: id,
        email: tempEmail,
        accessToken: tempToken,
        name: name,
        messagesTotal: currentMessagesTotal,
        inbox: inbox,
      });
      messagesTotal += currentMessagesTotal;
      rawInbox.push(...inbox);
    }
    this.setState({
      sessions: updatedSessions,
      rawAllInboxs: rawInbox,
    })
    const result = await this.decodeInbox();
    let arrSort = [];
    arrSort.push(result);
    console.log(result);
    this.setState({
      allInboxs: result,
      sortStack: arrSort,
    })
  }

  onRefresh = () => {
    this.onRefreshInbox();
  }
  onDelete = async (evt) => {
    debugger
    let email = evt.target;
    console.log(email);
    let resp = await Gmail_API.deleteMessage(email.id,email.title,email.slot)
    .then(msg => console.log(msg));
    this.onRefreshInbox();
  }

  onView = () => {
    const currentState = this.state.currentViewState;
    switch (currentState) {
      case 'SortingView':
      return <SortingViewPage handleProfile={this.getProfile}
        allInboxs={this.state.allInboxs}
        deleteHandle={this.onDelete}/>;
        case 'ViewSorting':
        return <ViewSortingPage handleProfile={this.getProfile}
          allInboxs={this.state.allInboxs}
          deleteHandle={this.onDelete}/>;
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
