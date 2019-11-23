import React from 'react';
import './App.css';
import { isArray, isString } from 'util';

class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ['0'],
      operand: null,
      mininput: 0,
      last: null
    };

    this.calculate = this.calculate.bind(this);
    this.operator = this.operator.bind(this);
    this.ac = this.ac.bind(this);
    this.mini = this.mini.bind(this);

  };
//Inserts a number into display and checks for additional zeros.
  calculate(e) {
    if (isString(this.state.input)) {
      this.ac()
      let myArray = []
      myArray.push(e.target.innerHTML);
      this.setState({ input: myArray });
    } else if (isArray(this.state.input)) {
      if (this.state.input[0] === '0') {
        let myArray = this.state.input;
        myArray.pop();
        myArray.push(e.target.innerHTML);
        this.setState({ input: myArray });
      } else if (this.state.input[0] === '0' && this.state.input[1] === '0') {
        this.setState({ input: ['0'] });
      } else {
        let myArray = this.state.input;
        myArray.push(e.target.innerHTML);
        this.setState({ input: myArray });
      }
    }
  }
  
  // Adds the operator and calculates if "=" not clicked, uses mini function given below.
  operator(e) {
    let toArray = this.state.input;
    if (toArray[0] === '0' && toArray.length === 1) {
      let mini = this.state.mininput;
      this.setState({ operand: e.target.innerHTML })
      return this.setState({ mininput: mini });
    } else {
      this.setState({ operand: e.target.innerHTML });
    }
    if (e.target.innerHTML === "*") {
      this.setState({ last: "*" })
    }
    this.ac();
    this.mini();
  }
  
  // mini function. parses both float and int
  mini() {
    this.setState({ mininput: this.state.input });
    let second = this.state.input;
    if (isArray(second)) {
      if (second.includes('.'));
      second = parseFloat(second.join(''));
    }
    if (isArray(second)) {
      second = parseInt(second.join(''));
    }
    let first = this.state.mininput;
    if (isArray(first)) {
      if (first.includes('.'));
      first = parseFloat(first.join(''));
    }
    if (isArray(first)) {
      first = parseInt(first.join(''));
    }
    if (this.state.operand === '+') {
      let final = second + first;
      this.setState({ mininput: final });
    }
    else if (this.state.operand === '-') {
      let final
      if (first > second) {
        final = first - second;
      } else if (second > first) {
        final = - second + first;
      } else if (first === second) {
        final = first - second;
      }
      this.setState({ mininput: final });
    } else if (this.state.operand === '*') {
      if (this.state.last === '-') {
        let final = second * - first;
        this.setState({ mininput: final });
      } else {
        let final = second * first;
        this.setState({ mininput: final });
      }
    } else if (this.state.operand === '/') {
      if (first === 0) {
        let final = second / first;
        final = final.toPrecision(4);
        this.setState({ mininput: final });
      } else {
        let final = first / second;
        final = final.toPrecision(4);
        this.setState({ mininput: final });
      }
    }
  }

  //Triggers when "=" is clicked, 
  //parses both float and int
  eq() {
    if(this.state.operand === '-') {
      this.setState({last: "*"})
    } else {
      this.setState({last: null})
    }
    this.setState({ mininput: this.state.input });
    let second = this.state.input;
    let final = 0
    if (isArray(second)) {
      if (second.includes('.'));
      second = parseFloat(second.join(''));
    }
    if (isArray(second)) {
      second = parseInt(second.join(''));
    }
    let first = this.state.mininput;
    if (isArray(first)) {
      if (first.includes('.'));
      first = parseFloat(first.join(''));
    }
    if (isArray(first)) {
      first = parseInt(first.join(''));
    }
    if (this.state.operand === '+') {
      final = second + first;
      this.setState({ input: final });
    } else if (this.state.operand === '-') {
      let final
      if (first > second) {
        final = first - second;
      } else if (second > first) {
        final = - second + first;
      } else {
        final = first - second;
      }

      if (this.state.last === '*') {
        final = second * - first;
        this.setState({ input: final });
      } 

      if(this.state.last === '/') {
        final = second / - first
        this.setState({ input: final });
      }

      this.setState({ input: final });
    } else if (this.state.operand === '*') {
        final = second * first;
        this.setState({ input: final });
    } else if (this.state.operand === '/') {
      if (first === 0) {
        final = second / first;
        final = final.toPrecision(4);
        this.setState({ input: final });
      } else {
        final = first / second;
        this.setState({ input: final });
      }
    }
    this.setState({ mininput: final });
    this.setState({ operand: null });
    this.setState({ last: null });
  }

  //Does not allow multiple '.' 
  deci() {
    let dec = this.state.input
    if (dec.includes('.') === true) {
      this.setState({ input: dec })
    } else {
      dec.push('.')
      this.setState({ input: dec })
    }
  }

  //Clears the input and sets to default. 
  clear() {
    this.setState({ input: ['0'] });
    this.setState({ mininput: 0 });
    this.setState({ operand: null });
    this.setState({ last: null })
  }

  ac() {
    this.setState({ input: ['0'] });
  }

  render() {
    return (
      <div id="main">
        <div id="mini-display">
          {this.state.mininput}
        </div>
        <div id="display">
          {this.state.input}
        </div>
        <div className="cal-display">
          <button onClick={this.calculate} id={"nine"}>{9}</button>
          <button onClick={this.calculate} id={"eight"}>{8}</button>
          <button onClick={this.calculate} id={"seven"}>{7}</button>
          <button onClick={this.operator} id={"add"}>{'+'}</button>
          <br />
          <button onClick={this.calculate} id={"six"}>{6}</button>
          <button onClick={this.calculate} id={"five"}>{5}</button>
          <button onClick={this.calculate} id={"four"}>{4}</button>
          <button onClick={this.operator} id={"subtract"}>{'-'}</button>
          <br />
          <button onClick={this.calculate} id={"three"}>{3}</button>
          <button onClick={this.calculate} id={"two"}>{2}</button>
          <button onClick={this.calculate} id={"one"}>{1}</button>
          <button onClick={this.operator} id={"multiply"}>{'*'}</button>
          <br />
          <button onClick={() => this.clear()} id={"clear"}>{'C'}</button>
          <button onClick={this.calculate} id={"zero"}>{0}</button>
          <button onClick={() => this.eq()} id={"equals"}>{'='}</button>
          <button onClick={this.operator} id={"divide"}>{'/'}</button>
          <br />
          <button onClick={() => this.deci()} id={"decimal"}>{'.'}</button>
        </div>
      </div>
    );
  }
}

export default Cal;
