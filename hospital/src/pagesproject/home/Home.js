import React from 'react'
import Header from '../header/Header'
import Speciality from '../specilality/Speciality'
import TopDoctor from '../topdoctor/TopDoctor'
import Panel from '../panel/Panel'
import Footer from '../../component/footer/Footer'
import About from '../about/About'
import Hospital from '../hospital/Hospital'
import Medical from '../medical/Medical'
import Customersay from '../customersay/Customersay'

function Home() {
  return (
    <div >
    <Header />
    <div style={{  backgroundColor:'#ffff ',minHeight:'950px'}} >
    <Speciality/>
    <TopDoctor/>
    </div>
    
<Hospital/>
<Medical/>

<Panel/>
<Customersay/>
  
   
    </div>
  )
}

export default Home