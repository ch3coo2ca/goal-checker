import React from "react";
import Calendar from "components/Calendar";

import "react-calendar/dist/Calendar.css";
import "styles/App.scss";

import * as FS from "util/fileSave.js";
import { getItem } from "util/localStorage.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getItem("dates"),
    };
  }

  updateData = (data) => {
    this.setState({ data }); 
  };
  
  render() { 
    const { data } = this.state;
    return (
      <div className="App">
        <Calendar data={data} onUpdate={this.updateData} />
        <input
          type="button"
          value="ddd"
          onClick={(e) => {
            e.stopPropagation();
            FS.saveFile(data);
          }}
        />
      </div>
    );
  }
}

export default App;
