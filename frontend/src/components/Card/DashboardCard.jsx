import "./DashboardCard.css";

function DashboardCard({

    title,

    value,

    icon,

    subtitle

}) {

    return (

        <div className="dashboard-card">

            <div className="dashboard-left">

                <div className="dashboard-icon">

                    {icon}

                </div>

                <div className="dashboard-info">

                    <h3>

                        {title}

                    </h3>

                    <p>

                        {subtitle}

                    </p>

                </div>

            </div>

            <div className="dashboard-value">

                {value}

            </div>

        </div>

    );

}

export default DashboardCard;