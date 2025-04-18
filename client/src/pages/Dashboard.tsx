import { useEffect, useState } from "react"
import Exercise from "../interfaces/Exercise"
//import { useNavigate } from "react-router-dom"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
  import "react-circular-progressbar/dist/styles.css"
import { getUserWorkoutPlan } from "../services/workoutPlanService"
import WorkoutPlan from "../interfaces/WorkoutPlan"

const Dashboard = () => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  // conditional function for an inspirational/encouraging message to display
  // depending on their specified fitness goal??????

  const getCustomWelcome = (progress: number) => {
    if (progress === 100) return "It's giving BOSS"
    if (progress >= 80) return "You're almost there! Stick with it!"
    if (progress >= 50) return "Every day you try is a day you succeed!"
    else return "Let git it!"
  }

  const handleComplete = (id: string) => {
    if (!completedWorkouts.includes(id)) {
      const updatedCompleted = [...completedWorkouts, id]
      setCompletedWorkouts(updatedCompleted)
  
      const percentage = Math.round((updatedCompleted.length / exercises.length) * 100)
      setProgress(percentage)
    }
  }

  useEffect(() => {
    const savedDate = localStorage.getItem("lastResetDate")
    const today = new Date().toDateString()

    if (savedDate !== today) {
      setCompletedWorkouts([])
      setProgress(0)
      localStorage.setItem("lastResetDate", today)
    }
    
    const fetchWorkoutPlan = async () => {
      try {
        const plans: WorkoutPlan[] = await getUserWorkoutPlan()
        if (plans.length > 0)
          setExercises(plans[0].exercises)
      } catch (err) {
        console.error("Error fetching workout plan:", err)
        alert("Could not fetch workout plan")
      }
    }

    fetchWorkoutPlan()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/plans/exercise/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete exercise from plan")
      }

      const updatedPlan = await response.json()
      setExercises(updatedPlan.exercises)
    } catch (err) {
      console.error("Error deleting exercise:", err)
      alert("❌ Could not delete exercise from plan")
    }
  }

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <h1>User - {getCustomWelcome(progress)}</h1>
      <br />
      <h2>Progress Tracker:</h2>
      <br />
      <div style={{ width: 200, margin: "2rem auto" }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: 
                progress >= 80 ? "#4caf50" :
                progress >= 50 ? "#f4c542" :
                "#00bcd4",
            textColor: "#333",
            trailColor: "#ddd",
          })}
        />
      </div>
      <br />
      <h3>Tips for success:</h3>
      <ul>
        <li>Stay consistent with your workouts.</li>
        <li>Focus on form over weight to avoid injury.</li>
        <li>Eat a balanced diet to fuel your gains.</li>
      </ul>
      <br />
      <h3>Today's Focus:</h3>
      <ul>
        <li>Strength Training: Focus on upper body today.</li>
        <li>Cardio: Aim for at least 20 minutes of cardio.</li>
        <li>Stretching: Don’t forget to cool down with stretches.</li>
      </ul>
      <br />
      <h2>Your Workout Plan</h2>
      {exercises.length > 0 ? (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise._id} style={{ 
                opacity: completedWorkouts.includes(exercise._id) ? 0.5 : 1
            }}>
              {exercise.name}{" "}
              {completedWorkouts.includes(exercise._id) && " ✅"}
              <button className="mark-complete-button"
                onClick={() => handleComplete(exercise._id)}>Mark as Complete!</button>
              <button
                onClick={() => handleDelete(exercise._id)}
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "0.3rem 0.5rem",
                }}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workout plan available.</p>
      )}
    </div>
  )
}

export default Dashboard
