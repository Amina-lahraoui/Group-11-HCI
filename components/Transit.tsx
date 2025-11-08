
import React from 'react';
import PageHeader from './PageHeader';

const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
    <div className="bg-white dark:bg-seoul-blue-dark/50 p-5 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-3">
            <span className="text-3xl mr-3">{icon}</span>
            <h3 className="text-2xl font-bold font-poppins text-seoul-blue dark:text-white">{title}</h3>
        </div>
        <div className="text-gray-600 dark:text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

const Transit: React.FC = () => {
  return (
    <div className="p-4">
      <PageHeader title="Transit Guide" subtitle="Navigating Seoul's public transportation." />
      
      <div className="mt-4">
        <InfoCard title="T-money Card" icon="💳">
            <p>Your all-in-one transit card. Buy and recharge it at any convenience store (GS25, CU, 7-Eleven) or subway station machine.</p>
            <p>Simply tap on the reader when entering and exiting subways or buses. You can also use it for taxis and purchases at convenience stores.</p>
        </InfoCard>
        
        <InfoCard title="Subway (지하철)" icon="🚇">
            <p>Seoul's subway is efficient, clean, and extensive. Lines are color-coded and numbered for easy navigation.</p>
            <p><strong>Tip:</strong> Use apps like Naver Maps or Kakao Maps for real-time directions and transfer information. They are more accurate than Google Maps for transit in Korea.</p>
        </InfoCard>
        
        <InfoCard title="Bus (버스)" icon="🚌">
            <p>Buses are color-coded: Blue (long-distance), Green (local, connect to subway), Red (express to suburbs), and Yellow (downtown loop).</p>
            <p>Remember to tap your T-money card when getting off to get a transfer discount (valid for 30 minutes).</p>
        </InfoCard>
        
        <InfoCard title="Etiquette" icon="🤫">
            <p><strong>Be quiet:</strong> Avoid loud conversations on public transit.</p>
            <p><strong>Priority Seating:</strong> Seats at the end of subway cars are for the elderly, pregnant women, and disabled passengers. Avoid using them.</p>
            <p><strong>Line up:</strong> People queue for the bus and wait for others to exit the subway before boarding.</p>
        </InfoCard>
      </div>
    </div>
  );
};

export default Transit;