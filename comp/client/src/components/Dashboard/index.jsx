import React, { useEffect } from "react";
import { getWallboardData } from "../../api";
import { connect } from 'react-redux';
import { Carousel } from "react-bootstrap";
import "./index.css";

const Dashboard = (props) => {
  useEffect(() => {
    getWallboardData("departmentname");
  }, [])

  const prevIcon = '';
  const nextIcon = '';
  
  return (
    <div>
      <Carousel className="carousel-content" nextIcon={nextIcon} prevIcon={prevIcon}>
        {
          props.canvasList.map(canvas => {
            return (
              <Carousel.Item key={canvas.id} className="carousel-item">
                <iframe src="https://falconcloud9.github.io/food-menu/"></iframe>
                <Carousel.Caption>
                  <h3>{canvas.title}</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  );
}

const mapStateToProps = (store) => ({
  canvasList: store.canvas.canvasList
});

export default connect(mapStateToProps)(Dashboard);