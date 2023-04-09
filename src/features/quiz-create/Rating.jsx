import "./rating.css"

import React from 'react'

const Rating = (scoreData) => {
    console.log(scoreData);
    return (
        <div className="rating">
            <h3>Submitted Successfully..</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Total Question: {scoreData.scoreData.totalQn}</td>
                        <td>Total Score: {scoreData.scoreData.totalScore}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Attempted Question: {scoreData.scoreData.attempedQn}</td>
                        <td>Your Score: {scoreData.scoreData.finalScore}</td>
                    </tr>
                </tbody>
            </table>
            <span className="star-rating">
                <input type="radio" name="rating" value="1" /><i></i>
                <input type="radio" name="rating" value="2" /><i></i>
                <input type="radio" name="rating" value="3" /><i></i>
                <input type="radio" name="rating" value="4" /><i></i>
                <input type="radio" name="rating" value="5" /><i></i>
            </span>
            <strong className="choice">Rate The App</strong>

        </div>
    )
}

export default Rating