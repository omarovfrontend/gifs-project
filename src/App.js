import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import "./App.css"
import axios from 'axios';

const App = () => {
  const [giphy, setGiphy] = useState("");
  const [fetching, setFetching] = useState("false");
  const [name, setName] = useState('')
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiRoot = "https://api.giphy.com/v1/gifs/";
      const api_key = process.env.REACT_APP_GIPHY_KEY;
      const result = await axios(`${apiRoot}trending?api_key=${api_key}`)
      const randomIndex = Math.floor(Math.random() * 50);

      setGiphy(`${result.data.data[randomIndex].images.fixed_height.url}`);
      setName(result.data.data[randomIndex].username);
      setStatus(false);
    };
    fetchData();
  }, [fetching]);

  return( 
    <>
      { status ? <> 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner></> : 
        <div>
          <Container style={{ marginTop: "10px" }}>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <Card style={{ backgroundColor: "powderBlue" }}>
                  <Card.Img
                    variant="top"
                    src={ giphy }
                    style={{ height: "450px", width: "100%" }}
                  />
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Рандомные гифки по клику :)</Card.Text>
                    <Button 
                      variant="primary" 
                      onClick={() => setFetching(!fetching)}
                    >
                      Гифнуть
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      }
    </>
  );
};

export default App;
