import React, { useEffect } from "react";
import GridLayout from 'react-grid-layout';
import { getWallboardData } from "../../api";
import { connect } from 'react-redux';
import { Carousel } from "react-bootstrap";
import TextToHtml from '../TextToHtml/TextToHtml';
import "./index.css";

const Dashboard = (props) => {
  useEffect(() => {
    // getWallboardData("departmentname");
    if (props.canvasList.length === 0) {
      props.history.push('/config');
    }
  }, [])

  const prevIcon = '';
  const nextIcon = '';



  const renderLayout = (currentCanvas) => {
    const { windows, single } = currentCanvas;
    return single ? <div className="h-100 w-100">
      <div className="h-100 w-100" key={windows[0].id} data-grid={{...windows[0].layout, ...{ static: true }}}>
        {renderWindow(windows[0])}
      </div>
    </div> :
    <GridLayout className="layout" cols={12} rowHeight={50} width={window.innerWidth - 30} containerPadding={[15, 15]}>
    { windows.map( (window) => {
      const gridlayout = {...window.layout, ...{ static: true }};
      return (
        <div className="custom-grid-item" key={window.id} data-grid={gridlayout}>
          {renderWindow(window)}
        </div>
      )
    })}
  </GridLayout>
  }

  const renderWindow = (window) => {
    if (window.type === 'url') {
      return (
        <iframe className="window-iframe" src={window.content.url} />
      )
    }
    return(
        <TextToHtml content={window.content}/>
    )
  }

  const goToConfig = () => {
    props.history.push('/config');
  }
  
  return (
    <div className="dashboard-content">
      <Carousel className="carousel-content" nextIcon={nextIcon} prevIcon={prevIcon}>
        {
          props.canvasList.map(canvas => {
            return (
              <Carousel.Item key={canvas.id} className='height-vh'>
                { renderLayout(canvas) }
              </Carousel.Item>
            )
          })
        }
      </Carousel>
      <span className="edit-to-config" onClick={goToConfig}>
        <i className="fa fa-edit"></i>
      </span>
    </div>
  );
}

const mapStateToProps = (store) => ({
  canvasList: store.canvas.canvasList
});

export default connect(mapStateToProps)(Dashboard);