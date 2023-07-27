// src/App.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Header from './components/Header';
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Map from "./components/Map";
import RegionForm from "./components/Form";
import RegionInfo from "./components/RegionInfo";
import { setRegion } from "./redux/mapSlice";
import { Layout, Space } from "antd";
import AppHeader from "./components/Header";
import MapWithTurf from "./components/Map";
import './App.css'

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Footer, Sider, Content } = Layout;
  const headerStyle = {
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    height: "10vh",
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor:'cyan'
  };
  const contentStyle = {
   overflow:'auto',
    height: "83vh",
  };
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#3ba0e9",
  };
  const footerStyle = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
    height: "5vh",
  };
  const dispatch = useDispatch();
  const selectedRegion = useSelector((state) => state.map.selectedRegion);
const handleCollapsedChange=()=>{
  setCollapsed(!collapsed)
}
  const handleRegionSelect = (region) => {
    dispatch(setRegion(region));
  };

  return (
    <div className="app" >
      <Layout>
      <Sidebar collapsed={collapsed}/>
      <Layout>
        <Header style={headerStyle}><AppHeader collapsed={collapsed} handleCollapsedChange={handleCollapsedChange}/></Header>
          <Content style={contentStyle} >
          
            <MapWithTurf selectedRegion={selectedRegion}/>
          </Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
       
      </Layout>
    </div>
  );
};

export default App;
