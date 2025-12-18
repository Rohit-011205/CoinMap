import React from "react";

const TopStatsCard = ({ title, value, subValue, color }) => {
    return (
        <div className="bg-[#1E1E2F] p-4 rounded-xl shadow-md flex items-center flex-col ">
            <p className="text-gray-400 text-sm font-medium flex">{title}</p>

            <p className={`text-2xl flex font-bold mt-1 ${color || "text-white"}`}>
                {value}
            </p>

            {subValue && (
                <p className="text-sm flex text-gray-400 mt-1">
                    {subValue}
                </p>
            )}
        </div>
    );
};

export default TopStatsCard;