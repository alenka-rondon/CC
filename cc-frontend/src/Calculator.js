    
import './App.css';
import './Form.css';
import React from 'react';
import {Component} from 'react';
import {variables} from './Variables.js';


//Constants
const TOT_QS = 12;

const questions = [
  {
    question: 'How many people live in your household?',
    answers: [
      {answerText: '1', addVal: 25.57},
      {answerText: '2', addVal: 21.39},
      {answerText: '3', addVal: 18.84},
      {answerText: '4', addVal: 17.56},
      {answerText: '5', addVal: 16.71},
      {answerText: '6+', addVal: 15.58},
    ],
  }, {
    question: 'Do you recycle frequently?',
    answers: [
      {answerText: 'Yes', addVal: -0.13},
      {answerText: 'No', addVal: 0}
    ],
  }, {
    question: 'Do you use energy star appliances?',
    answers: [
      {answerText: 'Yes', addVal: -0.6},
      {answerText: 'No', addVal: 0}
    ],
  }, {
    question: 'Do you use energy efficient lightbulbs?',
    answers: [
      {answerText: 'Yes', addVal: -0.6},
      {answerText: 'No', addVal: 0}
    ],
  }, {
    question: 'Do you have and use a programmable thermostat?',
    answers: [
      {answerText: 'Yes', addVal: -0.8},
      {answerText: 'No', addVal: 0}
    ],
  }, {
    question: 'How much of your energy is from clean energy sources?',
    answers: [
      {answerText: 'All', addVal: -2.8},
      {answerText: 'Most', addVal: -1.85},
      {answerText: 'Some', addVal: -0.9},
      {answerText: 'None', addVal: 0},
    ],
  }, {
    question: 'How is your diet?',
    answers: [
      {answerText: 'Overly meat heavy', addVal: 0.8},
      {answerText: 'Average omnivore', addVal: 0},
      {answerText: 'No beef', addVal: -0.6},
      {answerText: 'Vegetarian', addVal: -0.8},
      {answerText: 'Vegan', addVal: -1},
    ],
  }, {
    question: 'How often do you use a non-electric car annually?',
    answers: [
      {answerText: 'Do not travel with a car', addVal: 0},
      {answerText: '0 - 1500 km a year', addVal: 0.2},
      {answerText: '1500 - 4000 km a year', addVal: 0.7},
      {answerText: '4000 - 8000 km a year', addVal: 1.5},
      {answerText: '8000 - 16000 km a year', addVal: 3.05},
      {answerText: '16000 - 24000 km a year', addVal: 5.05},
      {answerText: 'Over 24000 km a year', addVal: 7.05},
    ],
  }, {
    question: 'How often do you use public transit weekly?',
    answers: [
      {answerText: 'Do not travel with public transit', addVal: 0},
      {answerText: '0 - 10km a week', addVal: 0.02},
      {answerText: '10 - 15 km a week', addVal: 0.03},
      {answerText: '15 - 25 km a week', addVal: 0.06},
      {answerText: '25 - 50 km a week', addVal: 0.1},
      {answerText: 'Over 50 km a week', addVal: 0.15},
    ],
  }, {
    question: 'How often do you travel in planes for over 4000km distances?',
    answers: [
      {answerText: 'Never', addVal: 0},
      {answerText: '1 round-trips a year', addVal: 0.85},
      {answerText: '2 round-trips a year', addVal: 1.7},
      {answerText: '3 round-trips a year', addVal: 2.55},
      {answerText: '4+ round-trips a year', addVal: 4},
    ],
  }, {
    question: 'How often do you travel in planes for distances of 500 - 4000km?',
    answers: [
      {answerText: 'Never', addVal: 0},
      {answerText: '1 round-trips a year', addVal: 0.4},
      {answerText: '2 round-trips a year', addVal: 0.8},
      {answerText: '3 round-trips a year', addVal: 1.2},
      {answerText: '4+ round-trips a year', addVal: 2},
    ],
  }, {
    question: 'How often do you travel in planes for distances of < 500 km?',
    answers: [
      {answerText: 'Never', addVal: 0},
      {answerText: '1 round-trips a year', addVal: 0.07},
      {answerText: '2 round-trips a year', addVal: 0.14},
      {answerText: '3 round-trips a year', addVal: 0.21},
      {answerText: '4+ round-trips a year', addVal: 0.3},
    ],
  }
]


export class Calculator extends Component{

  constructor(props){
    super(props);

    this.state={
      number:0,
      score: 0,
      quizOver: false,
      startPage: true,
      trees: 0,


      // now this is stuff we would be needing for the adding of this into our database :D,
      show: false, // for whether or not we want to show modal 
      gender: "",
      age: 0,
      country: ""

    }
  }

  changeFootprintAge =(e) =>{
    this.setState({age: e.target.value});

  }

  changeFootprintCountry =(e) =>{
    this.setState({country: e.target.value});

  }

  changeFootprintGender =(e) =>{
    this.setState({gender: e.target.value});

  }

  showModal = () => {
    this.setState({ show: true });
  };

  nextQuestion (param) {
    if (this.state.number === TOT_QS - 1) {
      this.setState({
        trees:(Math.round ((this.state.score / 0.07) * 100)/100)
      });
      this.showModal();
    }

    this.setState((prevState=>({
      number: prevState.number + 1,
      score: Math.round((prevState.score + param) * 100) / 100
    })))
  }

  addToDatabase() {
    fetch(variables.API_URL+'footprint',{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          FootprintValue:this.state.score,
          FootprintGender: this.state.gender,
          FootprintAge: this.state.age,
          FootprintCountry: this.state.country
      })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    }, (error)=>{
        alert('Did not add your data to our database'); 
    })
  }


  render(){
    const {
      age,
      gender,
      country,
      number,
      score,
      show,
      trees
    }= this.state; 

    return (
      <>
      {show
      ?
      
      <div className="vertical-div">
        <p style={{width: "85vw", alignSelf: "center", backgroundColor: "#e7f6fa", border: "2px solid #e7f6fa", borderRadius: "20px", textAlign: "center"}}>
            Your total Carbon Footprint was: <b> {score} tons </b> of carbon dioxide annually<br/>
            In order to offset your carbon footprint, you would need {trees} trees to recycle the carbon dioxide.</p>
        <div className='form'>
            <h3 className="form-title">Fill out the following information to submit your information to our database to see how you compare!</h3>
            <h4>Otherwise, feel free to go back to our compare site</h4>

          <div className="form-body">
            
            <div className="form-qs">
              <span className="form-text">What is your current age?</span>
              <input type="number" className="form-control"
              value={age}
              onChange={this.changeFootprintAge}/>
            </div>

            <div className="form-qs">
              <span className="form-text">What country do you reside in?</span>
              <input type="text" className="form-control"
              value={country}
              onChange={this.changeFootprintCountry}/>
            </div>

            <div className="form-qs">
              <span className="form-text">What is your gender?</span>
              <input type="text" className="form-control"
              value={gender}
              onChange={this.changeFootprintGender}/>
            </div>

          </div>

          <button type="button"
          className="submit-form"
          onClick={()=>this.addToDatabase()}
          >Add yourself to our database!</button>

        </div>
        </div>
        :
        <div className='vertical-div'>
          <p>Question: {number + 1} / {TOT_QS}</p>
          <div className='question-banner'>
            <p className = 'question'> {questions[number].question}</p>
            <div className='vertical-div'>
              {questions[number].answers.map((ans) => (
                <button className = "option-btn" onClick={() => this.nextQuestion(ans.addVal)}> {ans.answerText}</button>
              ))}
            </div>
          </div>
          <p style={{width: "85vw", alignSelf: "center", backgroundColor: "#e7f6fa", border: "2px solid #e7f6fa", borderRadius: "20px", textAlign: "center"}}>
          Carbon Footprint: <b> {score} tons </b> of carbon dioxide annually</p>
        </div>
        }
      </>
      
    )
  }
      
}