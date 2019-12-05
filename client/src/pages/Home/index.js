import React from 'react';
import { Row, Col, Button } from 'antd';
import './style.scss';

import { setCORS } from "google-translate-api-browser";
// setting up cors-anywhere server address
const translate = setCORS("http://cors-anywhere.herokuapp.com/");
/*
// or
import translate, { setCORS } from "google-translate-api-browser";
setCORS("http://cors-anywhere.herokuapp.com/");
*/

// };
const prefixCls = 'home';

const Home = props => {
  var timeout;
  document.addEventListener("mouseup",event=>{
    // clearTimeout(timeout);
    let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
    // timeout = setTimeout(function(){console.log(selection)}, 2000)
    console.log(selection)
    translate(selection, {de : "en", to: "vi" })
      .then(res => {
        // I do not eat six days
        var text = res.text;
        console.log({
          newWord : selection,
          meaning : text
        })
      })
      .catch(err => {
        console.error(err);
      });
  })
  return (
    <div className={`${prefixCls}`}>
      <Row>
        <img width="100%" src="./banner-1.jpg" />
      </Row>
      <div className="" style={{ marginTop: '1.5em' }}>
        <div className="text-align-center">
          <h1>Tại sao chọn chúng tôi</h1>
        </div>
        <Row>
          <Col className="icon-featured" span={8}>
            <h4>Rèn luyện từ vựng</h4>
            <img className="featured-icon" src="http://toeic24.vn/img/1.png" />
            <p>Với nhiều chủ đề phong phú, đa dạng</p>
          </Col>
          <Col className="icon-featured" span={8}>
            <h4>Nâng cao ngữ pháp</h4>
            <img className="featured-icon" src="http://toeic24.vn/img/2.png" />
            <p>Đầy đủ các dạng, các thì của ngữ pháp</p>
          </Col>
          <Col className="icon-featured" span={8}>
            <h4>Luyện thi đơn giản</h4>
            <img className="featured-icon" src="http://toeic24.vn/img/3.png" />
            <p>Làm bài thi có chọn lọc và chất lượng</p>
          </Col>
        </Row>
        <div className="text-align-center">
          <Button
            type="primary"
            onClick={() => props.history.push('/exam')}
            className="ant-btn-primary ant-card-hoverable"
            style={{marginBottom : "30px"}}
          >
            Thi thử nào
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
