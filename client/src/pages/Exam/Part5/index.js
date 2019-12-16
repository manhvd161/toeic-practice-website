import React, { useState, useEffect } from 'react';
import {Row, Col, Radio, Button} from 'antd';
import ReactAudioPlayer from 'react-audio-player';
import { services} from "../../../services"
import { config } from '../../../utils/config'
import { connect } from "react-redux"; 
import './style.scss'
const prefixCls = 'home';

const Intro = (props) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const [dataPart1, setDataPart1] = useState([
  
]);
  useEffect(() => {
    if(props.exam.part1 == undefined) {
      services.getExamTestById({id : props.location.search.substring(4)})
        .then(res => {
          var part5 = [];
          res.data.questions.part5.map(function(part, i) {
            part5.push(part.question)
          })
          setDataPart1(part5);
          var question = {};
          var data_part1 = [], data_part2 = [], data_part3 = [], data_part4 = [], data_part5 = [], data_part6 = [], data_part7 = [];
          res.data.questions.part1.map(function(part, i) {
            data_part1.push(part.question);
          })
          res.data.questions.part2.map(function(part, i) {
            data_part2.push(part.question);
          })
          res.data.questions.part3.map(function(part, i) {
            data_part3.push(part.question);
          })
          res.data.questions.part4.map(function(part, i) {
            data_part4.push(part.question);
          })
          res.data.questions.part5.map(function(part, i) {
            data_part5.push(part.question);
          })
          res.data.questions.part6.map(function(part, i) {
            data_part6.push(part.question);
          })
          res.data.questions.part7.map(function(part, i) {
            data_part7.push(part.question);
          })
          question.part1 = data_part1;
          question.part2 = data_part2;
          question.part3 = data_part3;
          question.part4 = data_part4;
          question.part5 = data_part5;
          question.part6 = data_part6;
          question.part7 = data_part7;
          props.dispatch({type : "EXAM_TEST", data : question})
        })
      

    }
    else {
      setDataPart1(props.exam.part5);
    }
  }, []);

  const [resultsPart1, setResultsPart1] = useState([null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]);

  const onChange = (value, i) => {
    const change = Object.assign([], resultsPart1);
    change[i] = value;
    setResultsPart1(change);
  }
  return (
  <div className={`${prefixCls}`}> 
    <div className={`${prefixCls}-content`}>
      <div className="" style={{marginTop : "4em", padding : "3em 8em"}}>
        <Row style={{marginBottom : "1em"}}>
          <b><h2>Part 5</h2></b>
        </Row>
        <Row style={{marginBottom : "1em"}}>
          <b>Mark your answer on your answer sheet:</b>
        </Row>
        {
          dataPart1.length > 0 &&
          dataPart1.map(function(data, i) {
            return <div>
              <Row>
                <b>{100 + i + 1}. {data.subQuestions[0].question}</b>
              </Row>
              <Row>
                <Radio.Group onChange={(e) => onChange(e.target.value, i)}>
                  <Radio style={radioStyle} value={"a"}>
                    {data.subQuestions[0].A}
                  </Radio>
                  <Radio style={radioStyle} value={"b"}>
                    {data.subQuestions[0].B}
                  </Radio>
                  <Radio style={radioStyle} value={"c"}>
                    {data.subQuestions[0].C}
                  </Radio>
                  <Radio style={radioStyle} value={"d"}>
                    {data.subQuestions[0].D}
                  </Radio>
                </Radio.Group>
              </Row>
            </div>
          })
        }
        
        <Row style={{textAlign : "center", margin : "2em 0"}}>
          <Button className="ant-btn-primary ant-card-hoverable" 
          onClick={() => {
            var object = {};
              object.idTest = props.location.search.substring(4);
              object.part = 5;
              var results = [];
              dataPart1.map(function(data, i) {
                var temp = {};
                console.log(data)
                temp.idQuestion = data._id;
                temp.userAnswer = [
                  {
                    idSubQuestion : data.subQuestions[0]._id,
                    answer : resultsPart1[i]
                  }
                ]
                results.push(temp);
              })
              object.results = results;
              services.submitResults(object)
                .then(res => {
                  console.log(res)
                  props.history.push('/exam/part6intro?id=' + props.location.search.substring(4));
                })
              // props.history.push('/exam/part2intro?id=' + props.location.search.substring(4));
          }}>Next</Button>
        </Row>
      </div>
    </div>
  </div>
  )
};

const mapStateToProps = ({ exam }) => {
  console.log(exam)
  return {
    exam
  };
};

export default connect(mapStateToProps)(Intro);