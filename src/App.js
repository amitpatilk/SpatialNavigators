// import React, { useState, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import './App.css';
import 'leaflet/dist/leaflet.css';


const defaultCenter = [39.8283, -98.5795];
const defaultZoom = 4;

const usStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];


function App() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapRef = useRef();
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCounties, setSelectedCounties] = useState([]);
  const [displayFoliumMap, setDisplayFoliumMap] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clickedLat, setClickedLat] = useState(null);
  const [clickedLng, setClickedLng] = useState(null);

  useEffect(() => {
    console.log('Current latitude:', clickedLat);
    console.log('Current longitude:', clickedLng);
  }, [clickedLat, clickedLng]);

  const handleMapClick = (e) => {
    // const lat = e.latlng.lat;
    // const lng = e.latlng.lng;
    // console.log('Map click event:', e);

    // // console.log('Clicked on the map');
    // // console.log('Latitude:', e.latlng.lat);
    // // console.log('Longitude:', e.latlng.lng);
    // setClickedLat(e.latlng.lat);
    // setClickedLng(e.latlng.lng);
    

    // setMarkerPosition([e.latlng.lat, e.latlng.lng]);


    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    console.log('Latitude:', lat); // Should log the latitude
    console.log('Longitude:', lng); // Should log the longitude

    setClickedLat(lat);
    setClickedLng(lng);
    setMarkerPosition([lat, lng]);
    
 
    // setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    // You might also want to automatically open the modal on map click
    // setShowModal(true);
  };

  // const [selectedState, setSelectedState] = useState(null);
  // const [dateRange] = useState({ startDate: '', endDate: '' });

  const [showTraffic] = useState(true);
  const [showConstruction] = useState(true);
  const [realTimeData] = useState(false);
  const [accidentType, setAccidentType] = useState('');
  const [constructionType, setConstructionType] = useState('');
  const [geographicArea, setGeographicArea] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const imageUrls = [
    'Images/download.jpeg',
    'Images/641968.jpg',
    'Images/641968.jpg',
    'Images/641968.jpg'

  ];
  const [toggleState, setToggleState] = useState('option1');
  const handleToggleChange = (event) => {
    setToggleState(event.target.value);
  };

  const handleStateChange = selectedOption => {
    setSelectedStates(selectedOption);
  };

  const handleCityChange = selectedOptions => {
    setSelectedCities(selectedOptions);
    console.log(selectedCities);
  };

  const handleCountyChange = selectedOptions => {
    setSelectedCounties(selectedOptions);
  };

  const handleReset = () => {
    // Resetting all the state variables to their initial states
    // For example, if you have a state variable named 'selectedCities':
    setSelectedCities([]);

    // Do this for all other state variables you want to reset
    // ...

    setDisplayFoliumMap(false);
    setShowAnalysis(false);
    setLoading(false);
  };


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');





  // Event handlers for date changes
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleModalSubmit = (data) => {
    console.log('Data from modal:', data);
    // Here you can process the data and associate it with the marker
  };


  const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
      onSubmit({ location, description });
      onClose();
    };

    

    return (
      
      <div style={{ display: isOpen ? 'block' : 'none' }}>
        {/* Modal content */}
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };


  const [showAnalysis, setShowAnalysis] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleGenerateReport = () => {
    setLoading(true); // Start loading

    // Simulate a delay for fetching data from the backend
    setTimeout(async () => {
      try {

        await handleSubmit();

        setDisplayFoliumMap(true);

        setShowAnalysis(true);
      } catch (error) {
        console.error('Error during data submission:', error);
        // Optionally set an error state here to notify the user
      } finally {
        setLoading(false); // End loading, regardless of success or failure
      }
    }, 2000); // This timeout represents the time taken to get the data from the backend
  };


  const handleSubmit = async () => {
    const payload = {
      selectedStates: selectedStates.map(state => state.value),
      selectedCities: selectedCities.map(city => city.value),
      selectedCounties: selectedCounties.map(county => county.value),
      startDate: startDate,
      endDate: endDate,
      toggleState: toggleState
    };

    console.log('Payload:', payload);
    return payload;

    // Send payload to the backend
    // const response = await fetch('YOUR_BACKEND_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(payload)
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // return response.json();
  };

  console.log('Current latitude:', clickedLat);
  console.log('Current longitude:', clickedLng);


  return (

    
    <div className="App">

    {clickedLat !== null && clickedLng !== null && (
      <div>
        <p>Latitude: {clickedLat}</p>
        <p>Longitude: {clickedLng}</p>
      </div>
    )}
      {/* <Map ref={mapRef} center={defaultCenter} zoom={defaultZoom} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </Map> */}
      {/* <div className="App"> */}

      
      {/* {clickedLat && clickedLng && (
        <div>
          <p>Latitude: {clickedLat}</p>
          <p>Longitude: {clickedLng}</p>
        </div>
      )} */}
      {/* </div> */}

      <div className="content">

        
        {/* Map Section - Leaflet Map or Folium Map */}
        {!displayFoliumMap ? (
          <MapContainer center={defaultCenter} 
          zoom={defaultZoom} 
          className="map"
          whenCreated={(mapInstance) => {
            if(mapInstance){
              mapInstance.on('click', handleMapClick);
            }  
          }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {markerPosition && <Marker position={markerPosition} />}
          </MapContainer>
        ) : (
          <iframe
            src={`${process.env.PUBLIC_URL}/map.html`}
            title="Folium Map"
            className="map"
            //style={{ width: '100%', height: '500px' }}
            frameBorder="0"
          ></iframe>
        )}

        <div className="sidebar">
          <h2>Filter Panel</h2>
          {/* Existing filters... */}
          {/* New filters added below */}
          <div className="filter-option">
            <label>Choose Dataset :</label>
            <div className="three-way-toggle">
              <input
                type="radio"
                id="toggleOption1"
                name="toggle"
                value="option1"
                checked={toggleState === 'option1'}
                onChange={handleToggleChange}
              />
              <label htmlFor="toggleOption1">Constructions</label>

              <input
                type="radio"
                id="toggleOption2"
                name="toggle"
                value="option2"
                checked={toggleState === 'option2'}
                onChange={handleToggleChange}
              />
              <label htmlFor="toggleOption2">Accidents</label>

              <input
                type="radio"
                id="toggleOption3"
                name="toggle"
                value="option3"
                checked={toggleState === 'option3'}
                onChange={handleToggleChange}
              />
              <label htmlFor="toggleOption3">Co-relation</label>
            </div>
          </div>


          <div className="filter-option">
            <label htmlFor="state-select">Select State:</label>
            <Select
              id="state-select"
              value={selectedStates}
              onChange={handleStateChange}
              options={usStates}
              isMulti={true}
              isClearable={true}
              isSearchable={true}
              closeMenuOnSelect={false}
              classNamePrefix="select"
              placeholder="Search and select states..."
            />
          </div>

          <div className="filter-option">
            <label htmlFor="city-select">Enter City(s):</label>
            <Creatable
              id="city-select"
              value={selectedCities}
              onChange={handleCityChange}
              isMulti={true}
              isClearable={true}
              placeholder="Type and press enter..."
              classNamePrefix="select"
            // menuIsOpen={false}
            />
          </div>

          <div className="filter-option">
            <label htmlFor="county-select">Enter County(s):</label>
            <Creatable
              id="county-select"
              value={selectedCounties}
              onChange={handleCountyChange}
              isMulti={true}
              isClearable={true}
              placeholder="Type and press enter..."
              classNamePrefix="select"
            // menuIsOpen={false}
            />
          </div>


          <div className="date-picker">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleStartDateChange} // Update state when date is picked
            />
          </div>
          <div className="date-picker">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              disabled={!startDate}
            />
          </div>

          {/* <div className="date-picker">
          <label htmlFor="constructionType">Date Range Selection</label>
          <label htmlFor="constructionType"> </label>
          <label htmlFor="startDate"> Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={dateRange.startDate}
          />
        </div>
        <div className="date-picker">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={dateRange.endDate}
          />
        </div> */}

          {/* <button className="generate-report-btn">Generate Report</button> */}
          {/* <button className="generate-report-btn" onClick={handleGenerateReport}>
        {loading ? <div className="loading-spinner"></div> : "Generate Report"}
      </button> */}

          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
          <button className="generate-report-btn" onClick={handleGenerateReport}>
            {loading ? "Loading..." : "Generate Report"} {/* Loading indicator */}
          </button>

          <button onClick={() => setShowModal(true)}>Add New Data Point</button>

        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleModalSubmit} />

      <div style={{ borderTop: '2px solid #0e0f0e', margin: '20px 0' }}></div>


      {
        showAnalysis && (
          <div className="analysis-section">
            <h1>Analysis</h1>
            {/* Wrapping each pair of images in a .image-row div */}
            {imageUrls.map((url, index) => (
              // Only create a new row for even indices
              index % 2 === 0 ? (
                <div className="image-row" key={index}>
                  {/* First image of the pair */}
                  <img src={process.env.PUBLIC_URL + '/' + imageUrls[index]} alt={`Analysis ${index + 1}`} />
                  {/* Second image of the pair, if it exists */}
                  {imageUrls[index + 1] ? (
                    <img src={process.env.PUBLIC_URL + '/' + imageUrls[index + 1]} alt={`Analysis ${index + 2}`} />
                  ) : null}
                </div>
              ) : null
            ))}
          </div>
        )
      }



    </div>


  );
  
}

export default App;