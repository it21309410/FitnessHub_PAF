/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PublicRoutes from './components/PrivateRoutes/PublicRoutes';
import { Toaster } from 'react-hot-toast';
import AddMealPlanPage from './pages/AddMealPlanPage';
import AllMealPlanPage from './pages/AllMealPlanPage';
import AllMealPage from './pages/AllMealPage';
import UpdateMealPlanPage from './pages/UpdateMealPlanPage';

import MealPlanView from './pages/MealPlanView';

import CreateWorkOutStatus from './pages/CreateWorkoutStatus';
import Authentication from './pages/Authentication.jsx'
import Message from './Message/Message.jsx'
import HomePage from './Home/HomePage.jsx'
import Profile from './pages/Profile/Profile.jsx';
import CreateWorkoutPlan from './pages/CreateWorkoutPlanPage.jsx';
import AllWorkoutPlan from './pages/AllWorkoutPlanPage.jsx'
import UpdateWorkoutPlanPage from './pages/UpdateWorkoutPlanPage.jsx';
import UpdateWorkoutStatus from './pages/UpdateWorkoutStatus.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserPrivateRoute from './components/PrivateRoutes/UserPrivateRoute';
import ViewWorkoutPlanPage from './pages/ViewWorkoutPlanPage';
import AllWork from './pages/AllWork';





function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          {/*Public Routes*/}
          <Route path="" element={<PublicRoutes />}>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          </Route>
          
          {/*User Routes*/}
      <Route path="" element={<UserPrivateRoute/>}>
          
        <Route  index={true} path="/" element={<HomePage />}/>
        <Route path='/auth'element={<Authentication />}/>
        <Route path='/profile'element={<Profile />}/>
        <Route path='/message'element={<Message />}/>
        <Route path="/workoutplan/all" element={<AllWorkoutPlan/>}/>
        <Route path="/mealplan/all" element={<AllMealPlanPage />} />
      
          <Route path="/status/create" element={<CreateWorkOutStatus />} />
          <Route path="/status/update" element={<UpdateWorkoutStatus />} />
          
          <Route path="/workoutplan/create" element={<CreateWorkoutPlan/>}/>
          <Route path="workoutplan/all/update/:workoutId" element={<UpdateWorkoutPlanPage/>}/>
          <Route path="/workoutplan/view/:workoutId" element={<ViewWorkoutPlanPage/>}/>
          <Route path="/workoutplan/all/user" element={<AllWork/>}/>
          
          <Route path="/mealplan" element={<AddMealPlanPage />} />
          <Route path="/mealplan/all/update/:mealplanId" element={<UpdateMealPlanPage/>}/>
          <Route path="/mealplan/review/:mealplanId" element={<MealPlanView />} />

          <Route path="/mealplan/all" element={<AllMealPage/>}/>

 
          </Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;