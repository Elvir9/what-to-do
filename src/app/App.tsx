import React, {FC} from 'react';

import './app.scss';
import Header from '../components/Header';
import TaskForm from '../components/Task';

import 'semantic-ui-css/semantic.min.css'


const App: FC = () => {
  return (
    <div className="todo-wrapper">
        <Header/>
        <TaskForm/>
    </div>
  );
}

export default App;
