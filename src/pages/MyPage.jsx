// import DualAxesChart from '@/components/DualAxesChart';
import MyCustomChart from '@/components/MyCustomChart';
const MyPage = () => {
  // const uvBillData = [
  //   { time: '2019-03', value: 60, type: '긍정' },
  //   { time: '2019-04', value: 75, type: '긍정' },
  //   { time: '2019-05', value: 60, type: '긍정' },
  //   { time: '2019-06', value: 60, type: '긍정' },
  //   { time: '2019-07', value: 60, type: '긍정' },
  //   { time: '2019-03', value: 40, type: '부정' },
  //   { time: '2019-04', value: 25, type: '부정' },
  //   { time: '2019-05', value: 40, type: '부정' },
  //   { time: '2019-06', value: 40, type: '부정' },
  //   { time: '2019-07', value: 40, type: '부정' },
  // ];

  // const transformData = [
  //   { time: '2019-03', count: 60 },
  //   { time: '2019-04', count: 75 },
  //   { time: '2019-05', count: 60 },
  //   { time: '2019-06', count: 60 },
  //   { time: '2019-07', count: 60 },
  // ];

  return (
      // <DualAxesChart uvBillData={uvBillData} transformData={transformData} />
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '300px', height: 'auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center', 
          gap: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <div style={{ width: '6px', height: '1px', backgroundColor: '#FFB800', borderRadius: '15px',marginBottom: '2px' }}></div>
            <span style={{ fontSize: '8px' }}>긍정</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <div style={{ width: '6px', height: '1px', backgroundColor: '#133020', borderRadius: '15px',marginBottom: '2px' }}></div>
            <span style={{ fontSize: '8px' }}>부정</span>
          </div>
        </div>
        <div style={{ width: '100%', fontSize: '12px', display: 'flex', justifyContent: 'flex-end',color: '#000',textAlign: 'center',fontFamily: 'Pretendard',fontSize: '8px',fontStyle: 'normal',fontWeight: '300',lineHeight: '17px',letterSpacing: '-0.5px' }}>(단위: %)</div>
        <MyCustomChart />
      </div>
    </div>
  );
};

export default MyPage;
 