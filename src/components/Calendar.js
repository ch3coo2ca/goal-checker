import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";

// import { data } from "data/data.js";

import * as TYPE from "const/dataType.js";

import { RadioButtonUnchecked, Close } from "@material-ui/icons";

import { getItem, setItem } from "util/localStorage.js";

// let data = getItem('dates');
class ReactCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      dataMap: {},
      data: getItem("dates"),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(prevState.data, getItem("datas"));

    const data = getItem("dates");
    let nextState = {};
    if (prevState.data !== data) {
      let dataMap = {} ;
      (data || []).forEach((d) => {  
        dataMap[d.date] = d.type;  
      });

      nextState.dataMap = dataMap;
    }
    return nextState;
  }

//   componentDidMount() {
//     let { dataMap, data } = this.state;
//     (data || []).forEach((d) => {
//       dataMap = { ...dataMap, [d.date]: d.type };
//     });

//     this.setState({ dataMap });
//   }

  handleChange = (date) => {
    console.log("click", date);
    this.showOptionSelector();
    this.setState({ date });
  };

  hideOptionSelector = () => {
    const optionEl = document.getElementById("optionSelector");
    if (optionEl) optionEl.parentNode.removeChild(optionEl);
  };

  showOptionSelector = () => {
    this.hideOptionSelector();

    const elem = document.createElement("div");
    elem.id = "optionSelector";
    elem.className = "option flex flex-center";

    const button1 = document.createElement("div");
    button1.innerHTML = "1";
    button1.addEventListener("click", (e) =>
      this.handleSelectType(e, TYPE.SOLVED)
    );

    const button2 = document.createElement("div");
    button2.innerHTML = "2";
    button2.addEventListener("click", (e) =>
      this.handleSelectType(e, TYPE.NOT_SOLVED)
    );

    elem.appendChild(button1);
    elem.appendChild(button2);

    let selectedEl = document.getElementsByClassName(
      "react-calendar__tile--active"
    );
    selectedEl = selectedEl && selectedEl[0];

    if (selectedEl) selectedEl.appendChild(elem);
  };

  handleSelectType = (e, type) => {
    e.stopPropagation();
    let { dataMap, date, data } = this.state;
    let obj = {};

    if (data.length < 1) data = [];

    if (type === TYPE.SOLVED) {
      obj.date = moment(date).format("YYYY-MM-DD");
      obj.type = TYPE.SOLVED;
    } else if (type === TYPE.NOT_SOLVED) {
      obj.date = moment(date).format("YYYY-MM-DD");
      obj.type = TYPE.NOT_SOLVED;
    }

    const formattedData = moment(date).format("YYYY-MM-DD");
    const hasDate = dataMap[formattedData];

    console.log("hasDate", hasDate, dataMap[formattedData]); 

    if (hasDate) {
      dataMap[formattedData] = type; 
    } else {
      data.push(obj);
    }
    console.log("datamap", dataMap, data);

    setItem("dates", data);

    this.setState({ data, dataMap });
  };

  render() {
    return (
      <div>
        <Calendar onChange={this.handleChange} />
      </div>
    );
  }
}

export default ReactCalendar;
