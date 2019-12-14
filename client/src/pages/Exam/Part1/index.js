import React, { useState, useEffect } from 'react';
import {Row, Col, Radio, Button} from 'antd';
import ReactAudioPlayer from 'react-audio-player';
import { services} from "../../../services"
import './style.scss'
import { connect } from "react-redux"; 
const prefixCls = 'home';

const Intro = (props) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const [dataAudio, setDataAudio] = useState([
  
]);
  const [dataPart1, setDataPart1] = useState([
  
]);
  useEffect(() => {
    if(props.exam.part1 == undefined) {
      services.getExamTestById({id : props.location.search.substring(4)})
        .then(res => {
          setDataPart1(res.data.questions.part1);
          var question = res.data.questions;
          props.dispatch({type : "EXAM_TEST", data : question})
          var data =[];
          question.part1.map(function(part, i) {
            var url = "http://202.191.56.159:2510/" + part.audio;
            data.push({link : url});
          })
          setDataAudio(data);
          console.log(data)
        })
      
    }
    else {
      setDataPart1(props.exam.part1);
      var data =[];
      props.exam.part1.map(function(part, i) {
        var url = "http://202.191.56.159:2510/" + part.audio;
        data.push({link : url});
      })
      setDataAudio(data);
    }
  }, []);
  console.log(dataAudio)
  // code cua Manh
  const audioPlayer = React.createRef();
  const [isPlaying, setIsPlaying] = useState();
  const [indexAudio, setIndexAudio] = useState(0);
  //end Manh

  const [resultsPart1, setResultsPart1] = useState([null,null,null,null,null,null,null,null,null,null]);

  const onChange = (value, i) => {
    const change = Object.assign([], resultsPart1);
    change[i] = value;
    setResultsPart1(change);
  }

  const onToggleAudio = () => {
    if(dataAudio.length > 0) {
    setIndexAudio(indexAudio + 1);

    if (indexAudio < dataAudio.length - 1) {
      audioPlayer.current.src = dataAudio[indexAudio + 1].link;
      console.log(audioPlayer);
      audioPlayer.current.play();
    }

    if (indexAudio === dataAudio.length - 1) {
      setIndexAudio(0);
      audioPlayer.current.src = dataAudio[0].link;
      audioPlayer.current.pause();
    }
  }
  };

  return (
  <div className={`${prefixCls}`}> 
    <div className={`${prefixCls}-content`}>
      <div className="" style={{marginTop : "4em", padding : "3em 8em"}}>
        <Row style={{marginBottom : "1em"}}>
          <b><h2>Part 1</h2></b>
        </Row>
        <Row style={{marginBottom : "1em"}}>
          <b>Mark your answer on your answer sheet:</b>
        </Row>
        <Row style={{textAlign : "center"}}>
          <audio
            onEnded={onToggleAudio}
            ref={audioPlayer}
            controls
            style={{width : "50%"}}
          >
            {
              dataAudio.length > 0 &&
              <source src={dataAudio[0].link} />
            }
            <track kind="captions" />
          </audio>
        </Row>
        {
          dataPart1.length > 0 &&
          dataPart1.map(function(data, i) {
            return <div>
              <Row style={{textAlign : "center", margin : "2em 0"}}>
                <img src={`http://202.191.56.159:2510/${data.image}`} style={{width : "70%"}}/>
              </Row>
              <Row>
                <b>{i + 1}. Select the answer</b>
              </Row>
              <Row>
                <Radio.Group onChange={(e) => onChange(e.target.value, i)}>
                  <Radio style={radioStyle} value={"a"}>
                    Option A
                  </Radio>
                  <Radio style={radioStyle} value={"b"}>
                    Option B
                  </Radio>
                  <Radio style={radioStyle} value={"c"}>
                    Option C
                  </Radio>
                  <Radio style={radioStyle} value={"d"}>
                    Option D
                  </Radio>
                </Radio.Group>
              </Row>
            </div>
          })
        }
        
        <Row style={{textAlign : "center", margin : "2em 0"}}>
          <Button 
            className="ant-btn-primary ant-card-hoverable" 
            onClick={() => {
              var object = {};
              object.idTest = props.location.search.substring(4);
              object.part = 1;
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
                  props.history.push('/exam/part2intro?id=' + props.location.search.substring(4));
                })
              // props.history.push('/exam/part2intro?id=' + props.location.search.substring(4));
            }}
          >Next</Button>
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