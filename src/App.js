import React, { useState } from 'react';
import { Button, Card, Form, Input, } from 'antd';
import { Col, Row, Statistic, } from 'antd';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { LinearScale } from 'chart.js/auto';
import CountUp from 'react-countup';

Chart.register(LinearScale);

const DataVisualize = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    male: '',
    female: '',
    infancy: '',
    childhood: '',
    adolescence: '',
    adulthood: '',
    elderly: '',
  });

  const handleInputChange = (feature, value) => {
    setFormData({ ...formData, [feature]: value });
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8888/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        male: parseInt(formData.male),
        female: parseInt(formData.female),
        infancy: parseInt(formData.infancy),
        childhood: parseInt(formData.childhood),
        adolescence: parseInt(formData.adolescence),
        adulthood: parseInt(formData.adulthood),
        elderly: parseInt(formData.elderly),
      }),
    });
    if (response.ok) {
      const prediction = await response.json();
      console.log('Prediction data:', prediction);
      setData(prediction);
      console.log('Submit with data:', formData);
      // console.log(data);
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  // const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <>
      <Row gutter={16} style={{ display: 'flex', margin: 10 }}>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
          <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 350, height: 100, textAlign: 'center'}}>
            <Statistic title="DecisionTree Prediction:" value={data.DecisionTree} style={{ fontSize: '16px', fontFamily: 'Prompt, sans-serif', fontWeight: 'bold' }}/>
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
          <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 350, height: 100, textAlign: 'center'}}>
            <Statistic title="GradientBoostedTree Prediction:" value={data.GradientBoostedTree} style={{ fontSize: '16px', fontFamily: 'Prompt, sans-serif', fontWeight: 'bold' }}/>
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
          <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 350, height: 100, textAlign: 'center'}}>
            <Statistic title="XGBoost Prediction:" value={data.XGBoost} style={{ fontSize: '16px', fontFamily: 'Prompt, sans-serif', fontWeight: 'bold' }}/>
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
          <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 350, height: 100, textAlign: 'center'}}>
            <Statistic title="RandomForest Prediction:" value={data.RandomForest} style={{ fontSize: '16px', fontFamily: 'Prompt, sans-serif', fontWeight: 'bold' }}/>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 30, }}>
            {/* <div style={{ margin: 10, padding: 60, boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',}}> */}
            <h1 style={{ color: '#000', fontFamily: 'Prompt,sans-serif' }}>Feature</h1>
            <Form
              onFinish={handleSubmit}
              initialValues={{
                remember: true,
              }}
              labelCol={{ style: { fontFamily: 'Prompt, sans-serif' } }}
            >
              <Form.Item
                name="male"
                type="number"
                label="Male"
              >
                <Input
                  style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input male'
                  value={formData.male}
                  onChange={(e) => handleInputChange('male', e.target.value)} />
              </Form.Item>
              <Form.Item
                name="female"
                type="number"
                label="Female"
              >
                <Input
                  style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input female'
                  value={formData.female}
                  onChange={(e) => handleInputChange('female', e.target.value)} />
              </Form.Item>
              <Form.Item
                name="infancy"
                type="number"
                label="Infancy"
              >
                <Input
                  style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input infancy'
                  value={formData.infancy}
                  onChange={(e) => handleInputChange('infancy', e.target.value)} />
              </Form.Item>
              <Form.Item
                name="childhood"
                type="number"
                label="Childhood"
              >
                <Input
                  style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input childhood'
                  value={formData.childhood}
                  onChange={(e) => handleInputChange('childhood', e.target.value)} />
              </Form.Item>
              <Form.Item
                name="adolescence"
                type="number"
                label="Adolescence"
              >
                <Input
                  style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input adolescence'
                  value={formData.adolescence}
                  onChange={(e) => handleInputChange('adolescence', e.target.value)} />
              </Form.Item>
              <Form.Item
                name="adulthood"
                type="number"
                label="Adulthood"
              >
                <Input
                  style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input adulthood'
                  value={formData.adulthood}
                  onChange={(e) => handleInputChange('adulthood', e.target.value)} />
              </Form.Item>
              <Form.Item
                name="elderly"
                type="number"
                label="Elderly"
              >
                <Input
                  style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input elderly'
                  value={formData.elderly}
                  onChange={(e) => handleInputChange('elderly', e.target.value)} />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ fontFamily: 'Prompt,sans-serif' }}>
                Predict
              </Button>
            </Form>
            {/* </div> */}
          </div>
        </Col>
        <Col span={12} style={{ margin: 'auto', fontFamily: 'Prompt, sans-serif' }}>
          <div style={{ margin: 10, width: '85%', height: 400 }}>
            {data && (
              <Bar
                data={{
                  labels: ['DecisionTree', 'GradientBoostedTree', 'XGBoost', 'RandomForest'],
                  datasets: [
                    {
                      label: 'Predictions',
                      data: [
                        data.DecisionTree ? data.DecisionTree[0] : 0,
                        data.GradientBoostedTree ? data.GradientBoostedTree[0] : 0,
                        data.XGBoost ? data.XGBoost[0] : 0,
                        data.RandomForest ? data.RandomForest[0] : 0,
                      ],
                      backgroundColor: ['#1890ff', '#1890ff', '#1890ff', '#1890ff'],
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      type: 'linear',
                      position: 'left',
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    title: {
                      display: true,
                      text: 'Predictions for Each Model',
                    },
                  },
                  layout: {
                    padding: {
                      top: 5,
                      bottom: 5,
                    },
                  },
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            )}
          </div>
          {/* <div>
            {data && (
              <>
                <h3>Prediction:</h3>
                <p>{data.DecisionTree && `DecisionTree Prediction: ${data.DecisionTree}`}</p>
                <p>{data.GradientBoostedTree && `GradientBoostedTree Prediction: ${data.GradientBoostedTree}`}</p>
                <p>{data.XGBoost && `XGBoost Prediction: ${data.XGBoost}`}</p>
                <p>{data.RandomForest && `RandomForest Prediction: ${data.RandomForest}`}</p>
              </>
            )}
          </div> */}
        </Col>
      </Row>
    </>
  );
};

export default DataVisualize;