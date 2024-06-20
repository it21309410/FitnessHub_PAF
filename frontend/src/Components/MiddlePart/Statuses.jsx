import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Add } from "@mui/icons-material";
import CreateWorkOutStatus from "../../pages/CreateWorkoutStatus";
import toast from "react-hot-toast";
import StoryCircle from "./StoryCircle";

const Statuses = () => {
    const [openStatusForm, setOpenStatusForm] = useState(false);
    const [statuses, setStatuses] = useState([]);

    const fetchStories = async() => {
        try {
            let {data} = await api.get("/v1/workouts/allWorkouts");
            console.log(data);

            let statusesByUser = data.reduce((statuses, workout) => {
                // if (!workout.userId) return statuses; // Skip if userId is null
                const userId = workout.userId;
                const updatedAt = new Date(workout.updatedAt);
                if ((new Date() - updatedAt) < 24 * 60 * 60 * 1000) {
                    statuses[userId] = statuses[userId] || [];
                    statuses[userId].push(workout);
                }
                return statuses;
            }, {});

            setStatuses(Object.entries(statusesByUser).map(([userId, workouts]) => ({ userId, workouts })));
            console.log(Object.entries(statusesByUser).map(([userId, workouts]) => ({ userId, workouts })));
            // toast.success(res.data.message);
        } catch (error) {
            //toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <>
            <section style={{ paddingBottom: '1.25rem', display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                <div style={{ paddingBottom: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                <Avatar
                    style={{
                    width: '5rem', height: '5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                    }}
                    onClick={() => setOpenStatusForm(true)}

                >
                    <Add style={{ fontSize: '3rem' }} />
                </Avatar>
                <p style={{ margin: '0', textAlign: 'center' }}>Add Story</p>
                </div>


                {statuses.map((item, index) => <StoryCircle key={index} item={item} reload={fetchStories} />)}
            </section>
            
            <CreateWorkOutStatus
                show={openStatusForm}
                setShow={setOpenStatusForm}
                reload={fetchStories}
            />
        </>
    );
}

export default Statuses;