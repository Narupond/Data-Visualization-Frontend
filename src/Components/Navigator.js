import React from 'react';
import { Row, Col } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './Navigator.css';

function Navigator() {
    const location = useLocation();
    return (
        <div>
            <Row className='row-nav' style={{ background: '#1e376d', overflow: 'hidden' }}>
                <Col span={12}>
                    <h1 style={{ display: 'flex', margin: 10, color: '#fff' }}>Data Visualization</h1>
                </Col>
                <Col span={12}>
                    <ul>
                        <li>
                            <Link to='/InputData' className={location.pathname === '/InputData' ? 'active-link' : ''}>
                                InputData
                            </Link>
                        </li>
                        <li>
                            <Link to='/InputFileData' className={location.pathname === '/InputFileData' ? 'active-link' : ''}>
                                InputFileData
                            </Link>
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
    )
}

export default Navigator