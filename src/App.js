import './App.css';
import {PersonTwoTone } from "@mui/icons-material"
import profilesData from './data/profiles';
import { AdminPanel } from './components/admin-panel';
import { MapComponent } from './components/map-component';
import { CardComponent } from './components/card-component';
import { SearchBar } from './components/search-bar';
import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

function App() {
  const [profiles,setProfiles] = useState([{id:0,name:'',description:'',image:'',position:{lat:0,lng:0}}]);
  const [filteredProfiles,setFilteredProfiles] =useState([]);
  const [selectedProfile,setSelectedProfile] =useState(null);
  const [searchQuery,setSearchQuery]=useState("");
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setProfiles(profilesData);
      setFilteredProfiles(profilesData);
      setLoading(false);
    },2000)
  },[]);

  useEffect(()=>{
    const filtered = profiles.filter((profile)=>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProfiles(filtered);
  },[searchQuery,profiles]);

  const handleAddProfile =(newProfile)=>{
    setProfiles([...profiles,newProfile]);
  }

  const handleDeleteProfile = (id)=>{
    const updatedProfiles = profiles.filter((profile)=> profile.id!==id);
    setProfiles(updatedProfiles);
  };

  const handleSelectProfile = (profile)=>{
    setSelectedProfile(profile);
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center my-4'><PersonTwoTone sx={{fontSize:'45px'}}/> User Profiles</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Row className='main-row'>
        <Col md={8} className='first-col'>
          {
            loading?(
              <div className='d-flex justify-content-center' style={{paddingTop:'20%'}}>
                <Spinner animation='border' variant='primary' size='lg'/>
              </div>
            ):(
              <Row>
                {
                  filteredProfiles.map((profile)=>(
                    <Col md={6} key={profile.id} className='mb-4'>
                      <CardComponent profile={profile} onDelete={handleDeleteProfile} onSelect={handleSelectProfile}/>
                      <div className='mobile-map'>
                        {selectedProfile?.id === profile.id && (
                          <MapComponent
                            position={profile.position}
                            name={profile.name}
                          />
                        )}
                      </div>
                    </Col>
                  ))
                }
              </Row>
            )
          }
        </Col>
        <Col md={4}>
          <AdminPanel onAddProfile={handleAddProfile}/>
          <div className="pc-map">
            {selectedProfile && (
              <MapComponent
                position={selectedProfile.position}
                name={selectedProfile.name}
              />
            )
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
