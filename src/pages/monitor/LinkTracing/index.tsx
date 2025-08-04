import React from 'react';

const Zipkin = () => {
  return (
      <iframe
        src="http://47.108.200.157:9411/zipkin/"
        // src="/zipkin-proxy/zipkin/"
        style={{ width: '100%', height: '800px', border: 'none' }}
        title="Zipkin链路调用追踪"
      />
  );
};

export default Zipkin;
