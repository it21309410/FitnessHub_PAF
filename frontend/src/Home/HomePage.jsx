import React from 'react';
import Grid from '@mui/material/Grid';
import MiddlePart from '../components/MiddlePart/MiddlePart';
//import Reels from '../components/Reels/Reels';
//import CreateReelsForm from '../components/Reels/CreateReelsForm';

import HomeRight from '../components/HomeRight/HomeRight';
import { Sidebar } from '../components/Side/Sidebar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AllMealPage from '../pages/AllMealPage';
import AllWork from '../pages/AllWork';

const HomePage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{
      maxWidth: '100%', /* Example max-width value */
      margin: '0 auto', /* Center the container horizontally */
      padding: '0 1rem',
      fontFamily:'verdana' /* Example padding for content inside the container */
    }}
    > {/* Added a container for better styling */}
      <Grid container spacing={1}>
        <Grid item xs={4} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid item xs={5} lg={6}> {/* Adjusted width for two columns */}
          
          <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Feed" value="1" ></Tab>
            <Tab label="Meal Plans" value="2" />
            <Tab label="Workout Plans" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><MiddlePart/></TabPanel>
        <TabPanel value="2"><AllMealPage/></TabPanel>
        <TabPanel value="3"><AllWork/></TabPanel>
      </TabContext>
    </Box>
          
        </Grid>

        <Grid item xs={12} lg={3}> 
          <div className="sticky top-0 w-full">
            <HomeRight />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
