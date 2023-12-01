import React, { useState } from 'react';
import { Button, Form, Input, } from 'antd';
import { Col, Row } from 'antd';

const YourComponent = () => {
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
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          male: parseInt(formData.male),
          female: parseInt(formData.female),
          infancy: parseInt(formData.infancy),
          childhood: parseInt(formData.childhood),
          adolescence: parseInt(formData.adolescence), // แก้ชื่อตรงนี้
          adulthood: parseInt(formData.adulthood),
          elderly: parseInt(formData.elderly),
        }),
    });
    if (response.ok) {
      const prediction = await response.json();
      setData(prediction);
      console.log('Submit with data:', formData);
    }
};

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Row>
    <Col span={12}>
    <div style={{ marginLeft: 30 }}>
      <h1>Feature</h1>
      <Form
        onFinish={handleSubmit}
        style={{}}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="male"
          type="number"
          label="Male"
        >
          <Input
            style={{ width: 300 }}
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
            style={{ width: 300 }}
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
            style={{ width: 300 }}
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
            style={{ width: 300 }}
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
            style={{ width: 300 }}
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
            style={{ width: 300 }}
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
            style={{ width: 300 }}
            placeholder='input elderly'
            value={formData.elderly}
            onChange={(e) => handleInputChange('elderly', e.target.value)} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
      <div>
        {data && (
          <>
            <h3>Prediction:</h3>
            <p>{data.DecisionTree && `DecisionTree Prediction: ${data.DecisionTree}`}</p>
            <p>{data.GradientBoostedTree && `GradientBoostedTree Prediction: ${data.GradientBoostedTree}`}</p>
            <p>{data.XGBoost && `XGBoost Prediction: ${data.XGBoost}`}</p>
            <p>{data.RandomForest && `RandomForest Prediction: ${data.RandomForest}`}</p>
          </>
        )}
      </div>
    </div>
    </Col>
    <Col span={12}>col-12</Col>
  </Row>
  );
};

export default YourComponent;