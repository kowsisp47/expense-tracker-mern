import React from "react";
import './App.css';

function About(){
    return(
        <div className="Aboutdiv">
            <center>
                <h1 className="spaced-text title">ABOUT US</h1>
                <h3 className="spaced-text heading">Introduction:</h3>
                <h5 className="spaced-text paragraph">Spentra was created to help people track their expenses and manage their finances more effectively. Whether you're saving for a big purchase, monitoring monthly spending, or simply staying organized, Spentra is here to help.</h5>

                <h3 className="spaced-text heading">Mission:</h3>
                <h5 className="spaced-text paragraph">Our mission is to provide users with a simple, user-friendly platform to record and analyze their spending habits. We want to help you make better financial decisions and save more money.</h5>

                <h3 className="spaced-text heading">How It Works:</h3>
                <h5 className="spaced-text paragraph">Simply log your expenses, categorize them, and view reports that show where your money is going. With features like budget tracking and expense categorization, you'll always have a clear view of your financial health.</h5>

                <h3 className="spaced-text heading">Why Choose Spentra:</h3>
                <h5 className="spaced-text paragraph">Spentra is easy to use, secure, and designed to help you gain control over your finances. Our goal is to make expense tracking as simple as possible, with powerful insights to help you save and spend wisely.</h5>

                <h3 className="spaced-text heading">Team or Contact Information:</h3>
                <h5 className="spaced-text paragraph">Spentra is developed by a team of college students passionate about financial literacy and helping others improve their financial management.</h5>

                <h3 className="spaced-text heading">CTA
                    :</h3>
                <h5 className="spaced-text paragraph">Join Spentra today and take the first step toward better financial management.</h5>
            </center>
        </div>
    )
}

export default About;
