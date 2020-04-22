import React from "react";
import Calendar from "components/Calendar";

import * as FS from "util/fileSave.js";

import "react-calendar/dist/Calendar.css";
import "styles/App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const data = await FS.readFile();
    if (!data) data = [];
    this.setState({ data });
  }

  handleUpdateData = async (data) => {
    await FS.saveFile(data);
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
      </div>
    );
  }
}

export default App;
