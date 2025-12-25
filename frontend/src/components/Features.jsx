import React from 'react';
import { HiChartBar, HiShieldCheck, HiLightningBolt, HiDeviceMobile } from "react-icons/hi";

const Features = () => {
  const featureList = [
    {
      title: "Real-Time Data",
      desc: "Get ultra-fast market updates with zero latency. Never miss a price movement again.",
      icon: <HiLightningBolt className="w-8 h-8 text-yellow-400" />,
    },
    {
      title: "Secure Tracking",
      desc: "Your data is encrypted and private. Track your assets without ever compromising security.",
      icon: <HiShieldCheck className="w-8 h-8 text-green-400" />,
    },
    {
      title: "Portfolio Management",
      desc: "Visualize your holdings with professional-grade charts and deep analytics.",
      icon: <HiChartBar className="w-8 h-8 text-purple-400" />,
    },
    {
      title: "Mobile Optimized",
      desc: "Access your dashboard on the go. Perfectly responsive for every device.",
      icon: <HiDeviceMobile className="w-8 h-8 text-blue-400" />,
    },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-6  bg-base-100  ">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Everything you need to <span className="text-purple-500">Trade Smart</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Rcart combines powerful financial tools with a simple interface to help you master the digital asset market.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featureList.map((f, index) => (
          <div 
            key={index} 
            className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/[0.05]"
          >
            <div className="mb-6 p-4 inline-block rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;