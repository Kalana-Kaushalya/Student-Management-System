import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { Link } from 'react-router-dom';

//date fns
import formatDistaneToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <Link to = "/profile"><h4>{workout.title}</h4></Link>
      <p>
        <strong>Student_id:</strong>
        {workout.load}
      </p>
      <p>
        <strong>Degree:</strong>
        {workout.reps}
      </p>
      <p>{formatDistaneToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
