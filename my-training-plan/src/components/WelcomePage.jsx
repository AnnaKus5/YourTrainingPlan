import Navigation from "./Navigation";

export default function WelcomePage() {

    const currentSysIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    return (
        <section className="welcome-page">
        <h2 className="title">Start to create your training plans</h2>
        <div className="image-container">
            <img src={currentSysIsDark ? "src/images/running-white.png" : "src/images/running.png"} className="activity-icon"/>
            <img src={currentSysIsDark ? "src/images/dumbbell-white.png" : "src/images/dumbbell.png"} className="activity-icon"/>
            <img src={currentSysIsDark ? "src/images/yoga-white.png" : "src/images/yoga.png"} className="activity-icon"/>
        </div>
        <h3 className="subtitle">I want to schedule:</h3>
        <Navigation />
        </section>
    )
}