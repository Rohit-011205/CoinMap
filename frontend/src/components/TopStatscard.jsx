import React from "react";

const TopStatsCard = ({ title, value, subValue }) => {
  // Logic to determine if the value is positive or negative
  // This checks if the string starts with '+' or if a number is > 0
  const isPositive = String(value).includes('+') || parseFloat(value) > 0;
  
  // Use specific Crypto Dashboard Green and Red
  const textClass = isPositive ? "text-[#10B981]" : "text-[#EF4444]";
  const borderClass = isPositive ? "border-[#10B981]" : "border-[#EF4444]";
  const glowGradient = isPositive 
    ? "radial-gradient(circle at top right, rgba(16, 185, 129, 0.08), transparent 60%)" 
    : "radial-gradient(circle at top right, rgba(239, 68, 68, 0.08), transparent 60%)";

  return (
    <div 
      className="
        relative overflow-hidden
        bg-[#1E1E2F] 
        rounded-2xl 
        px-6 py-6 
        border border-white/5
        shadow-xl
        transition-all duration-300
        group
        flex flex-col justify-between
        min-h-[140px]
      "
      style={{ background: `${glowGradient}, #1E1E2F` }}
    >
      {/* Dynamic Sidebar Accent */}
      <div className={`absolute top-0 left-0 w-1 h-full ${isPositive ? 'bg-[#10B981]' : 'bg-[#EF4444]'} opacity-40`} />

      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-3">
          {title}
        </p>
        
        <h2 className={`text-3xl font-bold tracking-tight text-white`}>
          {value}
        </h2>
      </div>

      {subValue && (
        <div className="flex items-center gap-2 mt-4">
          <span className={`text-sm font-bold ${textClass}`}>
            {isPositive ? "▲" : "▼"} {subValue}
          </span>
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
            Current Session
          </span>
        </div>
      )}
    </div>
  );
};

export default TopStatsCard;
    // import React from "react";

    // const TopStatsCard = ({ title, value, subValue, color }) => {
    //     return (
    //         <div className="
    //             bg-[#1E1E2F]
    //             rounded-2xl
    //             px-6 py-5
    //             shadow-md
    //             hover:shadow-lg
    //             hover:-translate-y-0.5
    //             transition-all duration-200
    //             min-h-[120px]
    //             flex flex-col justify-between
    //         ">
    //             {/* Title */}
    //             <p className="
    //                 text-xs
    //                 uppercase
    //                 tracking-widest
    //                 text-gray-400
    //                 font-medium
    //             ">
    //                 {title}
    //             </p>

    //             {/* VALUE (THIS WAS THE BUG) */}
    //             <p
    //                 className={`
    //                     text-3xl
    //                     font-semibold
    //                     mt-2
    //                     ${color || "text-gray-100"}
    //                 `}
    //             >
    //                 {value}
    //             </p>

    //             {/* Sub Value */}
    //             {subValue && (
    //                 <p className="
    //                     text-sm
    //                     text-gray-400
    //                     mt-1
    //                 ">
    //                     {subValue}
    //                 </p>
    //             )}
    //         </div>
    //     );
    // };

    // export default TopStatsCard;
