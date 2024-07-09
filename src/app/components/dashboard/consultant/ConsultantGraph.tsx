import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const ConsultantGraph = ({ data }: { data: any }) => {
  const [opacity, setOpacity] = React.useState({
    likes: 1,
    applications: 1,
    shortlists: 1,
  });

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
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
          <Line type="monotone" dataKey="likes" strokeOpacity={opacity.likes} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="applications" strokeOpacity={opacity.applications} stroke="#82ca9d" />
          <Line type="monotone" dataKey="shortlists" strokeOpacity={opacity.shortlists} stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};



export default ConsultantGraph;