/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div >
            <header style={{ backgroundColor: 'lightblue', color: '#w', padding: '10px' }}>
                <h1>Cloud Fitness</h1>
            </header>

            <nav style={{ backgroundColor: 'lightblue', color: 'black', padding: '10px' }}>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'space-around' }}>
                    <li><Link to="/home" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></li>
                    <li><Link to="/about" style={{ textDecoration: 'none', color: '#fff' }}>About</Link></li>
                    <li><Link to="/services" style={{ textDecoration: 'none', color: '#fff' }}>Services</Link></li>
                    <li><Link to="/profile" style={{ textDecoration: 'none', color: '#fff' }}>Profile</Link></li>
                </ul>
            </nav>
            <main style={{ padding: '20px', height:"100%", }}>
                <h2>Welcome to Cloud Fitness!</h2>
                <p>Welcome to <b>Cloud Fitness</b>, your ultimate destination for fitness enthusiasts! Whether you're a seasoned athlete, a fitness newbie, or simply looking to lead a healthier lifestyle, you've come to the right place.</p>

<p>Join our vibrant community of like-minded individuals passionate about fitness, wellness, and achieving personal goals. Connect with trainers, nutritionists, and fellow members who share your interests and can inspire you on your fitness journey.</p>

<p>Explore a wealth of resources including workout plans, nutrition tips, and motivational content tailored to your fitness level and goals. Share your progress, achievements, and challenges with others, and receive support and encouragement every step of the way.</p>

<p>Take advantage of our interactive features such as workout tracking, goal setting, and group challenges to stay motivated and accountable. Whether you're into cardio, strength training, yoga, or any other fitness activity, you'll find everything you need to stay active and healthy right here.</p>

<p>Get ready to transform your fitness experience and be part of a positive, empowering community. Start your journey to a stronger, healthier you with <b>Cloud Fitness</b> today!

</p>
 </main>

 <footer style={{ backgroundColor: 'blue', color: '#fff', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', zIndex: '1000' }}>
  &copy; 2024 Cloud Fitness. All Rights Reserved.
</footer>
        </div>
    );
};

export default Home;
