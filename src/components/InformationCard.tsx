import React from "react";

interface InformationCardProps {
    title: string;
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
}

const InformationCard: React.FC<InformationCardProps> = ({title, description, buttonLabel, onButtonClick}) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
                width: "300px",
                height: "300px",
                maxWidth: "400px",
                background: "#fff",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
            }}
        >
            <h3 style={{ margin: "0 0 8px", fontSize: "1.5rem" }}>{title}</h3>
            <p style={{ margin: "0 0 12px", fontSize: "1rem", color: "#555" }}>
                {description}
            </p>
            <button
                onClick={onButtonClick}
                style={{
                    padding: "10px 20px",
                    fontSize: "1rem",
                    color: "#fff",
                    backgroundColor: "#007BFF",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                {buttonLabel}
            </button>
        </div>
    );
};

export default InformationCard;
