import React, { useState } from 'react';
import './panel.css';

function Panel() {
  const dummyData = [
    {
      img: require('../../assets_frontend/magdi.jpg'),
      name: 'Mr. Ahmed Nasseer',
      edc: 'Chairman of Education',
      desc:
        'CHG was amongst the first private providers to recognise the attractiveness of the Egyptian healthcare industry and over the years has played an instrumental role in institutionalising the healthcare industry, helping to promote the sector’s growth. Our dually-focused approach to healthcare management.',
    },
    {
      img: require('../../assets_frontend/ahmed.jpg'),
      name: 'Mr. Ahmed Nasseer',
      edc: 'Chairman of Education',
      desc:
        'CHG was amongst the first private providers to recognise the attractiveness of the Egyptian healthcare industry and over the years has played an instrumental role in institutionalising the healthcare industry, helping to promote the sector’s growth. Our dually-focused approach to healthcare management, which prioritises the widespread provision of high quality, affordable healthcare while delivering exceptional financial and operational results has enabled us to quickly climb the industry’s ranks, and today sees us proudly stand as Egypt’s leading private provider of integrated healthcare services. Over the years, we have leveraged our position as an industry leader and trendsetter to continue driving innovation and change across all aspects of the sector. By continuing to invest in the latest medical technology and knowledge, CHG not only provides growing access to best-in-class care for patients all over the country, but continues to be a prime catalyst for the industry’s growth and development.     .',
    },
  ];

  // Set the initial state to the first item in the dummyData
  const [state, setState] = useState(dummyData[0]);

  const onClickHandler = (index) => {
    setState(dummyData[index]); // Update the state to the clicked item's data
  };

  return (
    <div className="pannel">
      <div className="left-side">
        {state && (
          <div >
            <p>{state.desc}</p>
            <div className='docinform'>
              <div className="doc-info">
              <img src={state.img} alt="Doctor" />
             </div>
            <div>
              <div className="dummy-name">{state.name}</div>
              <p>{state.edc}</p>
            </div>
            </div>
          </div>
        )}
      </div>

      <div className="right-side">
        {dummyData.map((dummy, index) => {
          return (
            <div key={index} style={{margin:'80px 0px'}} className='paneldis'>
              <div className="dummy-item">
                <img
                  src={dummy.img}
                  alt="Doctor"
                  onClick={() => onClickHandler(index)}
                />
                <div className="doc-info">
                  {dummy.name}
                  <h2>{dummy.edc}</h2>
                </div>
              </div>
              <p>
                {dummy.desc.length > 120
                  ? dummy.desc.substr(0, 190) + '...'
                  : dummy.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Panel;
