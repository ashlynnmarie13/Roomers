import React, { Component } from "react";
import "./Cities.css";
import b1 from "./imgs/b1.jpg";
import b2 from "./imgs/b2.jpg";
import b3 from "./imgs/b3.jpg";
import b4 from "./imgs/b4.jpg";
import b5 from "./imgs/b5.jpg";
import b6 from "./imgs/b6.jpg";
import b7 from "./imgs/b7.jpg";
import b8 from "./imgs/b8.jpg";
import b9 from "./imgs/b9.jpg";
import b10 from "./imgs/b10.jpg";
import b11 from "./imgs/b11.jpg";
import b12 from "./imgs/b12.png";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 0,
      cities: ['Newyork City',"Staten Island","Brooklyn","Queens","Long Island"],
      input: '',
    };
    this.images = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12];
  }

  componentDidMount() {
    window.setInterval(this.run, 6000);
  }


  onChangeHandler(e){
    this.setState({
      input: e.target.value,
    })
  }



  run = () => {
    console.log("hello");
    if (this.state.img < 11) {
      this.setState({
        img: this.state.img + 1
      });
    } else {
      this.setState({
        img: 0
      });
    }
  };

  render() {
    const list = this.state.cities
        .filter(d => this.state.input === '' || d.includes(this.state.input))
        .map((d, index) => <li key={index}>{d}</li>);
    return (
      <div className="cities">
        <img className="background" src={this.images[this.state.img]} />
        <div className="ny">
        <input value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
        <ul>{list}</ul>
        </div>
      </div>
    );
  }
}

export default Cities;
