import Navigation from "./Navigation";
import { useTrainingDataContext } from "./TrainingDataContext";

export default function WelcomePage() {

    const currentSysIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const { setIsTopNavigationDisplay } = useTrainingDataContext()

    setIsTopNavigationDisplay(false)

    return (
        <section className="welcome-page">
        <h2 className="title">Start to create your training plans</h2>
        <div className="image-container">
            <img src={currentSysIsDark ? "/images/running-white.png" : "/images/running.png" } className="activity-icon"/>
            <img src={currentSysIsDark ? "/images/dumbbell-white.png" : "/images/dumbbell.png"} className="activity-icon"/>
            <img src={currentSysIsDark ? "/images/yoga-white.png" : "/images/yoga.png"} className="activity-icon"/>
        </div>
        <h3 className="subtitle">I want to schedule:</h3>
        <Navigation />
        </section>
    )
}