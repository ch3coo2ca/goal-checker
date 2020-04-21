import React from "react";
import Calendar from "components/Calendar";

import "react-calendar/dist/Calendar.css";
import "styles/App.scss";

import * as FS from "util/fileSave.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const data = await FS.readFile();
    this.setState({ data });
  }

  handleUpdateData = (data) => {
    FS.saveFile(data);
    this.setState({ data });
  };

  handleLoadData = async (e) => {
    e.stopPropagation();
    const data = await FS.readFile();

    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <Calendar data={data} onUpdate={this.handleUpdateData} />
        <input
          type="button"
          value="load"
          onClick={(e) => this.handleLoadData(e)}
        />
      </div>
    );
  }
}

export default App;
