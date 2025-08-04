import React from 'react';

const Zipkin = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // height: '100vh', // 或者你需要的固定高度
      width: '100%'
    }}>
      <iframe
        // src="http://43.136.170.102:3000/d/rYdddlPWk/nodes&kiosk"
        src="/grafana-proxy/d/rYdddlPWk/nodes?orgId=1&kiosk"
        style={{
          width: '90%',
          height: '700px',
          border: 'none'
        }}
        title="Zipkin链路调用追踪"
      />
    </div>
  );
};

export default Zipkin;
