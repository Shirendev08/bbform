// components/RewardsSection.tsx
"use client";

import React, { useState } from "react";

type Reward = {
  title: string;
  description: string;
  reward: string;
  details: string;
};

type RewardsSectionProps = {
  title: string;
  color: string;
  rewards: Reward[];
};

const RewardsSection: React.FC<RewardsSectionProps> = ({ title, color, rewards }) => {
  return (
    <div className={`bg-white rounded-[38px] py-11 px-12 mb-9`}>
      <div className={`text-${color} text-2xl font-bold uppercase`}>
        {title.split("\n").map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <div className="w-full my-8">
        {rewards.map((reward, index) => (
          <div key={index}>
            <div className="w-full bg-[#e2e8f0] h-[1px] my-2"></div>
            <RewardItem {...reward} />
          </div>
        ))}
      </div>
    </div>
  );
};

const RewardItem: React.FC<Reward> = ({ title, description, reward, details }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-6">
      <div className="flex flex-row gap-6 place-items-center">
        <div className="w-40 text-[#475569] text-[15px] font-semibold">{title}</div>
        <div className="flex-grow text-[#475569] text-[15px]">{description}</div>
        <div className="text-[#1e293b] text-2xl font-semibold">
          <span className="mr-4 inline-block">{reward}</span>
          <button onClick={() => setExpanded(!expanded)}>
            <svg
              className={`inline-block h-2 transition-transform ${expanded ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
            >
              <path
                d="M1 1L8.98171 9L16.9634 1"
                stroke="#64748B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {expanded && <div className="pt-4 pb-2">{details}</div>}
    </div>
  );
};

export default RewardsSection;
