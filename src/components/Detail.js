import React from "react";
import "./Detail.scss";

export default function SchoolDetail({ data }) {
    if (!data) return (
        <div className="row align-items-center text-center">
            <div className="col">
                <h2 className="display-4 text-muted">Select a school to get started!</h2>
            </div>
        </div>
    );

    const hasLocation = data.latitude && data.longitude;
    const coords = `${data.latitude},${data.longitude}`;
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x200&zoom=13&scale=2&markers=color:red%7C${coords}&key=AIzaSyAg23BTN3K-4LtrmQc9HLCK_qpRShlLpYE`;

    return (
        <div className="school-detail">
            {hasLocation && <img src={mapUrl} className="img-fluid mb-3" alt="School location" />}
            <div className="container">
                <section>
                    <h3 className="mb-4">{data.school_name}</h3>
                    <div className="row">
                        <div className="col-4">
                            <address>
                                {data.primary_address_line_1}<br />
                                {data.city}, {data.zip}<br />
                                <abbr title="Phone">P:</abbr> {data.phone_number}<br />
                                <abbr title="Email">E:</abbr> {data.school_email}<br />
                                <abbr title="Fax">F:</abbr> {data.fax_number}<br />
                            </address>
                        </div>
                        <div className="col-8">
                            <blockquote>{data.overview_paragraph}</blockquote>
                        </div>
                    </div>
                </section>

                <section>
                    <h4>SAT Results</h4>
                    {(data.sat_scores) ? renderSATScores(data.sat_scores) : <p>No SAT results available</p>}
                </section>

                <section>
                    <h4>Academic opportunities</h4>
                    {renderListItems(data, 'academicopportunities')}
                </section>

                <section>
                    <h4>Admissions priority</h4>
                    {renderListItems(data, 'admissionspriority')}
                </section>

                <section>
                    <h4>Extracurricular activities</h4>
                    <p>{data.extracurricular_activities}</p>
                </section>
            </div>
        </div>
    );
}

function renderSATScores(data) {
    return <>
        <p>All scores are average achieved across <strong>{data.num_of_sat_test_takers}</strong> test takers.</p>
        <div className="row text-center">
            <div className="col sat-score">
                <h5 className="display-2">{data.sat_critical_reading_avg_score}</h5>
                <h4>Critical Reading</h4>
            </div>
            <div className="col sat-score">
                <h5 className="display-2">{data.sat_math_avg_score}</h5>
                <h4>Math</h4>
            </div>
            <div className="col sat-score">
                <h5 className="display-2">{data.sat_writing_avg_score}</h5>
                <h4>Writing</h4>
            </div>
        </div>
    </>;
}

function renderListItems(data, keyword) {
    const items = Object.entries(data)
        .filter(([key, value]) => key.startsWith(keyword) && value)
        .map(([key, value]) => <li key={key}>{value}</li>);

    return (items.length)
        ? <ul>{items}</ul>
        : <p>No data to display</p>;
}
