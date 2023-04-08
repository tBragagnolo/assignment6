/*********************************************************************************
*  BTI425 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Tom Bragagnolo Student ID: 139157218 Date: March 24, 2023
*
*
********************************************************************************/ 


import Image from 'react-bootstrap/Image'
import { Row, Col } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid={true} rounded={true}/><br /><br />
      <Row>
        <Col md={6}>
          The Metropolitan Museum of Art of New York City on Fifth Avenue. One of the most visited art museums in the world
          <br /><br />
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art</a>
        </Col>
      </Row>
    </>
  )
}
