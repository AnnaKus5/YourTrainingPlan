import Navigation from "./Navigation";

export default function WelcomePage() {

    return (
        <section className="welcome-page">
        <h2 className="title">Start to create your training plans</h2>
        <div className="image-container">
            <img src="src\images\running.png" className="activity-icon"/>
            <img src="src\images\dumbbell.png" className="activity-icon"/>
            <img src="src\images\yoga.png" className="activity-icon"/>
        </div>
        <h3 className="subtitle">I want to schedule my:</h3>
        <Navigation />
        </section>
    )
}