import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import './App.css';
import 'leaflet/dist/leaflet.css';
import icon from "./constants";



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
  const [fetchedImageUrls, setFetchedImageUrls] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapRef = useRef();
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCounties, setSelectedCounties] = useState([]);
  const [displayFoliumMap, setDisplayFoliumMap] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [clickedLat, setClickedLat] = useState(null);
  const [clickedLng, setClickedLng] = useState(null);
  const [showTraffic] = useState(true);
  const [showConstruction] = useState(true);
  const [realTimeData] = useState(false);
  const [accidentType, setAccidentType] = useState('');
  const [constructionType, setConstructionType] = useState('');
  const [geographicArea, setGeographicArea] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const imageUrls = [
    'Images/real-flareon-pokemon-viijoqkan5uznbvc.webp',
    'Images/real-flareon-pokemon-viijoqkan5uznbvc.webp',
    'Images/image3.jpeg',
    'Images/image4.jpeg',
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

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const handleMapClick = (e) => {
    console.log("Clicked");
    const newMarker = {
      position: e.latlng,
      key: new Date().getTime(),
    };

    setMarker(newMarker);
  };

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        handleMapClick(e); // Call your custom click handler
        map.locate()
        setClickedLat(e.latlng.lat);
        setClickedLng(e.latlng.lng);
      }
      /*,
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },*/
    })
  
    /*return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
                Lat, Lon: {marker.position.lat.toFixed(6)},{" "}
                {marker.position.lng.toFixed(6)}
        </Popup>
      </Marker>
    
    )
    */
  }

  useEffect(() => {
    // You can add code here to fetch or set initial coordinates if needed
    // For example, using navigator.geolocation.getCurrentPosition to get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialMarker = {
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          key: new Date().getTime(),
        };
        setMarker(initialMarker);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
    );
  }, []);

  // Event handlers for date changes
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // const handleModalSubmit = (data) => {
  //   console.log('Data from modal:', data);
  //   // Here you can process the data and associate it with the marker
  // };

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [loading, setLoading] = useState(false);
  
  //Second Final
  const handleGenerateReport = () => {
    setLoading(true); // Start loading
  
    // Construct the query parameters for the map URL
    const queryParams = new URLSearchParams();
    const mapQueryParams = new URLSearchParams();
    selectedStates.forEach(state => mapQueryParams.append('state', state.value));
    selectedCounties.forEach(county => mapQueryParams.append('county', county.value));
    selectedCities.forEach(city => mapQueryParams.append('city', city.value));
    mapQueryParams.append("start_date", startDate);
    mapQueryParams.append("end_date", endDate);
    mapQueryParams.append("dataset_name", toggleState); // Assuming dataset_name is the same as toggleState
    
    // Construct the URL for the map
    // const mapUrl = `http://192.168.1.15:5000/generate_map?${mapQueryParams.toString()}`;
    // const mapUrl = `http://localhost:5005/generate_map?${queryParams.toString()}`;
    const mapUrl = `http://localhost:5005/generate_map?${queryParams.toString()}`;
  
    const mapTimeoutController = new AbortController();
    const mapTimeoutId = setTimeout(() => mapTimeoutController.abort(), 300000);
  
    // Use a GET request to retrieve the Folium HTML map
    const mapPromise = Promise.race([
      fetch(mapUrl),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Map request timeout')), 300000))
    ])
      .then(response => response.text()) // Expecting text/html response for the map
      .then(html => {
        // Inject the HTML into the DOM for the Folium map
        setFoliumMap(html);
        // Set states based on successful map data retrieval
        setDisplayFoliumMap(true);
        setShowAnalysis(true);
      })
      .catch(error => {
        console.error('Error during map data submission:', error);
        // Optionally set an error state here to notify the user
      })
      .finally(() => {
        clearTimeout(mapTimeoutId); // Clear the map timeout
      });
  
    // Construct separate URLs for the images
    const imageEndpoints = ['get_image1', 'get_image2', 'get_image3'];
    const imagePromises = [];
  
    for (const endpoint of imageEndpoints) {
      // Construct the image URL based on your backend's endpoint and query parameters
      const imageQueryParams = new URLSearchParams();
      // Add query parameters for states, counties, startDate, endDate, etc. as needed
      imageQueryParams.append('start_date', startDate);
      imageQueryParams.append('end_date', endDate);
  
      const imageUrl = `http://192.168.1.15:5001/${endpoint}/${startDate}/${endDate}`;
  
      const imagePromise = fetch(imageUrl)
        .then(response => {
          if (response.ok) {
            return response.blob(); // Expecting image data
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then(blob => {
          // Create a URL for the image blob
          const imageSrc = URL.createObjectURL(blob);
  
          // Add the image URL to the fetchedImageUrls state variable
          setFetchedImageUrls(prevImageUrls => [...prevImageUrls, imageSrc]);
        })
        .catch(error => {
          console.error(`Error during ${endpoint} image data submission:`, error);
          // Optionally set an error state here to notify the user
        });
  
      imagePromises.push(imagePromise);
    }
  
    // Wait for all image requests to complete
    Promise.all(imagePromises)
      .finally(() => {
        clearTimeout(mapTimeoutId); // Clear the map timeout (in case it didn't complete before)
        setLoading(false); // End loading, regardless of success or failure
      });
  };
  // const [loadedImages, setLoadedImages] = useState([]); 
  // const handleGenerateReport = () => {
  //   setLoading(true); // Start loading
  
  //   // Construct the query parameters for the map URL
  //   const queryParams = new URLSearchParams();
  //   const mapQueryParams = new URLSearchParams();
  //   selectedStates.forEach(state => mapQueryParams.append('state', state.value));
  //   selectedCounties.forEach(county => mapQueryParams.append('county', county.value));
  //   selectedCities.forEach(city => mapQueryParams.append('city', city.value));
  //   mapQueryParams.append("start_date", startDate);
  //   mapQueryParams.append("end_date", endDate);
  //   mapQueryParams.append("dataset_name", toggleState); // Assuming dataset_name is the same as toggleState
    
  //   // Construct the URL for the map
  //   // const mapUrl = `http://192.168.1.15:5000/generate_map?${mapQueryParams.toString()}`;
  //   // const mapUrl = `http://localhost:5005/generate_map?${queryParams.toString()}`;
  //   const mapUrl = `http://localhost:5005/generate_map?${queryParams.toString()}`;
  
  //   const mapTimeoutController = new AbortController();
  //   const mapTimeoutId = setTimeout(() => mapTimeoutController.abort(), 300000);
  
  //   // Use a GET request to retrieve the Folium HTML map
  //   const mapPromise = Promise.race([
  //     fetch(mapUrl),
  //     new Promise((_, reject) => setTimeout(() => reject(new Error('Map request timeout')), 300000))
  //   ])
  //     .then(response => response.text()) // Expecting text/html response for the map
  //     .then(html => {
  //       // Inject the HTML into the DOM for the Folium map
  //       setFoliumMap(html);
  //       // Set states based on successful map data retrieval
  //       setDisplayFoliumMap(true);
  //       setShowAnalysis(true);
  //     })
  //     .catch(error => {
  //       console.error('Error during map data submission:', error);
  //       // Optionally set an error state here to notify the user
  //     })
  //     .finally(() => {
  //       clearTimeout(mapTimeoutId); // Clear the map timeout
  //     });
  
  //   // Construct separate URLs for the images
    
  //   const imageEndpoints = ['get_image1', 'get_image2', 'get_image3', 'get_image1'];
  //   const imagePromises = [];
  
  //   for (const endpoint of imageEndpoints) {
  //     // Construct the image URL based on your backend's endpoint and query parameters
  //     const imageQueryParams = new URLSearchParams();
  //     // Add query parameters for states, counties, startDate, endDate, etc. as needed
  //     imageQueryParams.append('start_date', startDate);
  //     imageQueryParams.append('end_date', endDate);
  
  //     const imageUrl = `http://192.168.1.15:5001/${endpoint}/${startDate}/${endDate}`;
  
  //     const imagePromise = fetch(imageUrl)
  //       .then(response => {
  //         if (response.ok) {
  //           return response.blob(); // Expecting image data
  //         } else {
  //           throw new Error('Network response was not ok');
  //         }
  //       })
  //       .then(blob => {
  //         // Create a URL for the image blob
  //         const imageSrc = URL.createObjectURL(blob);
  //         setLoadedImages(prevLoadedImages => [...prevLoadedImages, imageSrc]);
  //         // Add the image URL to the fetchedImageUrls state variable
  //         setFetchedImageUrls(prevImageUrls => [...prevImageUrls, imageSrc]);
  //       })
  //       .catch(error => {
  //         console.error(`Error during ${endpoint} image data submission:`, error);
  //         // Optionally set an error state here to notify the user
  //       });
  
  //     imagePromises.push(imagePromise);
  //   }
  
  //   // Wait for all image requests to complete
  //   Promise.all(imagePromises)
  //     .finally(() => {
  //       clearTimeout(mapTimeoutId); // Clear the map timeout (in case it didn't complete before)
  //       setLoading(false); // End loading, regardless of success or failure
  //     });
  // };
  
  
  
  
  
  
  //final
  // const handleGenerateReport = () => {
  //   setLoading(true); // Start loading
  
  //   // Construct the query parameters
  //   const queryParams = new URLSearchParams();
  //   selectedStates.forEach(state => queryParams.append('state', state.value));
  //   selectedCounties.forEach(county => queryParams.append('county', county.value));
  //   selectedCities.forEach(city => queryParams.append('city', city.value));
  //   queryParams.append("start_date", startDate);
  //   queryParams.append("end_date", endDate);
  //   queryParams.append("dataset_name", toggleState); // Assuming dataset_name is the same as toggleState
  
  //   // Construct the URL
  //   // const url = `http://localhost:5005/generate_map?${queryParams.toString()}`;
  //   const url = `http://192.168.1.15:5000/generate_map?${queryParams.toString()}`;

  //   const controller = new AbortController(); //changed
  //   const timeoutId = setTimeout(() => controller.abort(), 300000); //change
  
  //   // Use a GET request to send data and handle the response
  //   fetch(url)
  //     .then(response => response.text()) // Expecting text/html response
  //     .then(html => {
  //       // Injecting the HTML into the DOM
  //       // const mapContainer = document.getElementById('mapContainer');
  //       // mapContainer.innerHTML = html;
  //       setFoliumMap(html);
  
  //       // Set states based on successful data retrieval
  //       setDisplayFoliumMap(true);
  //       setShowAnalysis(true);
  //     })
  //     .catch(error => {
  //       console.error('Error during data submission:', error);
  //       // Optionally set an error state here to notify the user
  //     })
  //     .finally(() => {
  //       clearTimeout(timeoutId); //changes
  //       setLoading(false); // End loading, regardless of success or failure
  //     });
  // };
  




  

  // const handleSubmit = async () => {
  //   const payload = {
  //     selectedStates: selectedStates.map(state => state.value),
  //     selectedCities: selectedCities.map(city => city.value),
  //     selectedCounties: selectedCounties.map(county => county.value),
  //     startDate: startDate,
  //     endDate: endDate,
  //     toggleState: toggleState
  //   };

  //   console.log('Payload:', payload);
  //   return payload;

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
  // };

  const handleSubmit = async () => {
    const queryParams = new URLSearchParams();
    selectedStates.forEach(state => queryParams.append('states', state.value));
    selectedCities.forEach(city => queryParams.append('cities', city.value));
    selectedCounties.forEach(county => queryParams.append('counties', county.value));
  
    // Assuming 'startDate' and 'endDate' are in the correct format
    queryParams.append("start_date", startDate instanceof Date ? startDate.toISOString() : startDate);
    queryParams.append("end_date", endDate instanceof Date ? endDate.toISOString() : endDate);
    queryParams.append("toggle_state", toggleState);
  
  
    // Construct the URL
    const url = `http://192.168.0.249:5000/accident?${queryParams.toString()}`;
  
    // Start loading
    // setLoading(true);
  
    // Use a GET request to send data and handle the response
    fetch(url)
      .then(response => response.text()) // Expecting text/html response
      .then(html => {
        // Injecting the HTML into the DOM
        const mapContainer = document.getElementById('mapContainer');
        mapContainer.innerHTML = html;
  
        // Set states based on successful data retrieval
        setDisplayFoliumMap(true);
        setShowAnalysis(true);
      })
      .catch(error => {
        console.error('Error during data submission:', error);
        // Optionally set an error state here to notify the user
      })
      .finally(() => {
        setLoading(false); // End loading, regardless of success or failure
      });
  };
  
  // In your existing function where you call handleSubmit
  // setTimeout(() => {
  //   handleSubmit(); // Call handleSubmit directly without try-catch
  // }, 2000); // Simulated delay
  
  const handleReportIncident = async () => {
    const incidentData = {
      description: description,
      address: address,
      time: time,
      date: date,
      visibility: visibility,
      latitude: clickedLat,
      longitude: clickedLng
    };
  
    console.log('Reporting Incident:', incidentData);
  
    // Replace 'YOUR_BACKEND_ENDPOINT' with your actual backend endpoint
    // const response = await fetch('YOUR_BACKEND_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(incidentData)
    // });
  
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
  
    // // Handle the response as needed
    // const responseData = await response.json();
    // console.log('Response:', responseData);
  };
  
  // Add this function to the "Report Incident" button's onClick event
  

  const [showDataPointFields, setShowDataPointFields] = useState(false);
  const toggleDataPointFields = () => {
    setShowDataPointFields(!showDataPointFields);
  };

  console.log('Current latitude:', clickedLat);
  console.log('Current longitude:', clickedLng);


  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [foliumMap, setFoliumMap] = useState(null);

  return (
    

    <div className="App">
      
      
      <div className="content">
        {/* Map Section - Leaflet Map or Folium Map */}
        {!displayFoliumMap ? (
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            className="map"
            scrollWheelZoom={true}
            whenCreated={(map) => {
              setMap(map);
              map.on("click", handleMapClick);
              console.log("Map Created");
            }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            {marker && (
              <Marker key={marker.key} position={marker.position} icon={icon}>
                <Popup>
                  Lat, Lon: {marker.position.lat.toFixed(6)},{" "}
                  {marker.position.lng.toFixed(6)}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        ) : null}

        {displayFoliumMap && (
          <div className="folium-map">
            <iframe
              srcDoc={foliumMap} // Use srcDoc to display HTML content
              title="Folium Map"
              className="map"
              frameBorder="0"
              
            ></iframe>
          </div>
        )}

        {/* {!displayFoliumMap ? (
          
          <MapContainer center={defaultCenter} 
          zoom={defaultZoom} 
          className="map"
          scrollWheelZoom={true}
          whenCreated={(map) => {
            setMap(map);
            map.on("click", handleMapClick);
            console.log("Map Created");
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          {marker && (
            <Marker key={marker.key} position={marker.position} icon={icon}>
              <Popup>
                Lat, Lon: {marker.position.lat.toFixed(6)},{" "}
                {marker.position.lng.toFixed(6)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
          
        ) : (
          <iframe
            src={`${process.env.PUBLIC_URL}/map.html`}
            // src={`http://localhost:5005/generate_map`}
            title="Folium Map"
            className="map"
            //style={{ width: '100%', height: '500px' }}
            frameBorder="0"
          ></iframe>
        )} */}

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
              <label htmlFor="toggleOption3">Both</label>
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
          <div className = 'space'></div>
          <button className = ".add-data-btn" onClick={toggleDataPointFields}>Add New Data Point</button>

          {showDataPointFields && (
        <div className="new-data-point-fields">
          <div className="row">
          <div className="data-point-field">
            <p className="field-heading">Latitude:</p>
            <div className="non-input-field"> {clickedLat ? clickedLat.toFixed(6) : ""}</div>
          </div>
          <div className="data-point-field">
            <p className="field-heading">Longitude:</p>
            <div className="non-input-field">{clickedLng ? clickedLng.toFixed(6) : ""}</div>
          </div>

            
            
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="row">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          </div>
          <select 
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}>
            <option value="">Visibility</option>
            {/* Generate options 1-10 */}
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <button className="generate-report-btn" onClick = {handleReportIncident}>
            {"Report Incident"} {/* Loading indicator */}
          </button>
        </div>
      )}


        </div>
      </div>

      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleModalSubmit} /> */}

      <div style={{ borderTop: '2px solid #0e0f0e', margin: '20px 0' }}></div>

      
      {
        showAnalysis && (
          <div className="analysis-section">
   
  
            <h1>Analysis</h1>
            {fetchedImageUrls.length > 0 && (
              <div className="image-row">
                {fetchedImageUrls.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Image ${index}`} />
                ))}
              </div>
            )}
            
            {/* {imageUrls.map((url, index) => (
              
              index % 2 === 0 ? (
                <div className="image-row" key={index}>
                  
                  <img src={process.env.PUBLIC_URL + '/' + imageUrls[index]} alt={`Analysis ${index + 1}`} />
                  
                  {imageUrls[index + 1] ? (
                    <img src={process.env.PUBLIC_URL + '/' + imageUrls[index + 1]} alt={`Analysis ${index + 2}`} />
                  ) : null}
                </div>
              ) : null
            ))} */}
          </div>
        )
      }

{/* {
        showAnalysis && (
          <div className="analysis-section">
      {fetchedImageUrls.length > 0 && (
        <div className="image-row">
          {fetchedImageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index}`} />
          ))}
        </div>
      )}
      <h1>Analysis</h1>
      {imageUrls.map((url, index) => (
        
        index % 2 === 0 ? (
          <div className="image-row" key={index}>
            
            {loadedImages[index] ? (
              <img src={loadedImages[index]} alt={`Analysis ${index + 1}`} />
            ) : (
              <img src={process.env.PUBLIC_URL + '/' + imageUrls[index]} alt={`Analysis ${index + 1}`} />
            )}
            
            {imageUrls[index + 1] ? (
              loadedImages[index + 1] ? (
                <img src={loadedImages[index + 1]} alt={`Analysis ${index + 2}`} />
              ) : (
                <img src={process.env.PUBLIC_URL + '/' + imageUrls[index + 1]} alt={`Analysis ${index + 2}`} />
              )
            ) : null}
          </div>
        ) : null
      ))}
    </div>
        )
      } */}





    </div>


  );
  
}

export default App;