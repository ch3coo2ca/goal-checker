import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";

import * as TYPE from "const/dataType.js";

import {
  RadioButtonUnchecked,
  Close,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";

class ReactCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      dataMap: {},
      currentMonth: moment().month() + 1,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    let nextState = {};
    if (prevState.data !== data) {
      let dataMap = {};
      (data || []).forEach((d) => {
        dataMap[d.date] = d.type;
      });

      nextState.dataMap = dataMap;
    }
    return nextState;
  }

  componentDidMount() {
    this.colorSelectedDates();
  }

  componentDidUpdate() {
    this.colorSelectedDates();
  }

  handleChange = (date) => {
    this.showOptionSelector();
    this.setState({ date }, () => this.colorSelectedDates());
  };

  handleChangeMonth = (type) => {
    let { currentMonth } = this.state;
    if (type === "PREV") {
      currentMonth = currentMonth - 1;
      currentMonth = currentMonth > 0 ? currentMonth : 12;
    } else if (type === "NEXT") {
      currentMonth = currentMonth + 1;
      currentMonth = currentMonth < 13 ? currentMonth : 1;
    }

    this.setState({ currentMonth }, () => this.colorSelectedDates());
  };

  colorSelectedDates = () => {
    const { data } = this.props;
    const { currentMonth } = this.state;

    const filteredData = data.filter(
      (d) => moment(d.date).month() + 1 == currentMonth
    );

    filteredData.forEach(({ date, type }) => {
      const buttons = document.getElementsByClassName(
        "react-calendar__month-view__days__day"
      );
      for (let i = 0; i < buttons.length; i++) {
        const childElem = buttons[i].children[0];
        const time = childElem.attributes["aria-label"].value;
        const formattedTime = moment(time).format("YYYY-MM-DD");
        if (date == formattedTime) {
          if (type === TYPE.SOLVED) {
            childElem.classList.remove("not-solved");
            childElem.classList.add("solved");
          }
          if (type === TYPE.NOT_SOLVED) {
            childElem.classList.remove("solved");
            childElem.classList.add("not-solved");
          }
        }
      }
    });
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
    button1.innerHTML = "O";
    button1.addEventListener("click", (e) =>
      this.handleSelectType(e, TYPE.SOLVED)
    );

    const button2 = document.createElement("div");
    button2.innerHTML = "X";
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
    let { data, onUpdate } = this.props;
    let { dataMap, date } = this.state;
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

    if (hasDate) {
      const idx = data.findIndex((d) => d.date === formattedData);
      if (idx >= 0) data[idx] = { ...data[idx], type };
    } else {
      data.push(obj);
    }

    this.colorSelectedDates();
    onUpdate(data);

    this.setState({ dataMap }, () => this.hideOptionSelector());
  };

  render() {
    return (
      <div>
        <Calendar
          locale={"en-US"}
          minDetail={"month"}
          onChange={this.handleChange}
          showNeighboringMonth={false}
          prevLabel={
            <div
              className="navigator"
              onClick={() => this.handleChangeMonth("PREV")}
            >
              <NavigateBefore />
            </div>
          }
          nextLabel={
            <div
              className="navigator"
              onClick={() => this.handleChangeMonth("NEXT")}
            >
              <NavigateNext />
            </div>
          }
        />
      </div>
    );
  }
}

export default ReactCalendar;
