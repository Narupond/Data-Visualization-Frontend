import React, { useState } from 'react';
import { Button, Card, Form, Input, } from 'antd';
import { Col, Row, Statistic, } from 'antd';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { LinearScale } from 'chart.js/auto';
import Navigator from './Navigator';

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

  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  
  // const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <>
      <Navigator />
      <Row gutter={16} style={{ display: 'flex', margin: 10 }}>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 350, height: 100, textAlign: 'center' }}>
            <Statistic title="DecisionTree Prediction:" value={data.DecisionTree} style={{ fontSize: '16px', fontFamily: 'Prompt, sans-serif', fontWeight: 'bold' }} />
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 350, height: 100, textAlign: 'center' }}>
            <Statistic title="GradientBoostedTree Prediction:" value={data.GradientBoostedTree} style={{ fontSize: '16px', fontFamily: 'Prompt, sans-serif', fontWeight: 'bold' }} />
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 350, height: 100, textAlign: 'center' }}>
            <Statistic title="XGBoost Prediction:" value={data.XGBoost} style={{ fontSize: '16px', fontFamily: 'Prompt, sans-serif', fontWeight: 'bold' }} />
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Card style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 350, height: 100, textAlign: 'center' }}>
            <Statistic title="RandomForest Prediction:" value={data.RandomForest} style={{ fontSize: '16px', fontFamily: 'Prompt, sans-serif', fontWeight: 'bold' }} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 30, }}>
            <h1 style={{ color: '#000', fontFamily: 'Prompt,sans-serif' }}>Feature</h1>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              size={componentSize}
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item label="Male">
                <Input style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input male'
                  value={formData.male}
                  onChange={(e) => handleInputChange('male', e.target.value)} />
              </Form.Item>
              <Form.Item label="Female">
                <Input style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input female'
                  value={formData.female}
                  onChange={(e) => handleInputChange('female', e.target.value)} />
              </Form.Item>
              <Form.Item label="Infancy">
                <Input style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input infancy'
                  value={formData.infancy}
                  onChange={(e) => handleInputChange('infancy', e.target.value)} />
              </Form.Item>
              <Form.Item label="Childhood">
                <Input style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input childhood'
                  value={formData.childhood}
                  onChange={(e) => handleInputChange('childhood', e.target.value)} />
              </Form.Item>
              <Form.Item label="Adolescence">
                <Input style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input adolescence'
                  value={formData.adolescence}
                  onChange={(e) => handleInputChange('adolescence', e.target.value)} />
              </Form.Item>
              <Form.Item label="Adulthood">
                <Input style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input adulthood'
                  value={formData.adulthood}
                  onChange={(e) => handleInputChange('adulthood', e.target.value)} />
              </Form.Item>
              <Form.Item label="Elderly">
                <Input style={{ width: '100%', maxWidth: 300, fontFamily: 'Prompt,sans-serif' }}
                  placeholder='input elderly'
                  value={formData.elderly}
                  onChange={(e) => handleInputChange('elderly', e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ fontFamily: 'Prompt,sans-serif', marginLeft: 250 }} onClick={handleSubmit}>
                  Predict
                </Button>
              </Form.Item>
            </Form>
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
        </Col>
      </Row>
    </>
  );
};

export default DataVisualize;