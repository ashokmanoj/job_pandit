import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the type for the data prop
interface GraphData {
  name: string;
  postedJobs: number;
  applications: number;
  savedCandidates: number;
  vendors: number;
}

const ConsultantGraph = ({ data }: { data: GraphData[] }) => {
  const [opacity, setOpacity] = React.useState({
    applications: 1,
    postedJobs: 1,
    savedCandidates: 1,
    vendors: 1,
  });

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o;

    setOpacity((prev) => ({ ...prev, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o;

    setOpacity((prev) => ({ ...prev, [dataKey]: 1 }));
  };

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line type="monotone" dataKey="postedJobs" strokeOpacity={opacity.postedJobs} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="applications" strokeOpacity={opacity.applications} stroke="#82ca9d" />
          {/* <Line type="monotone" dataKey="vendors" strokeOpacity={opacity.vendors} stroke="#82ca9d" />
          <Line type="monotone" dataKey="savedCandidates" strokeOpacity={opacity.savedCandidates} stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConsultantGraph;
