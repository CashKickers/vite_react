import DualAxesChart from '@/components/DualAxesChart';

const MyPage = () => {
  const uvBillData = [
    { time: '2019-03', value: 60, type: '긍정' },
    { time: '2019-04', value: 75, type: '긍정' },
    { time: '2019-05', value: 60, type: '긍정' },
    { time: '2019-06', value: 60, type: '긍정' },
    { time: '2019-07', value: 60, type: '긍정' },
    { time: '2019-03', value: 40, type: '부정' },
    { time: '2019-04', value: 25, type: '부정' },
    { time: '2019-05', value: 40, type: '부정' },
    { time: '2019-06', value: 40, type: '부정' },
    { time: '2019-07', value: 40, type: '부정' },
  ];

  const transformData = [
    { time: '2019-03', count: 60 },
    { time: '2019-04', count: 75 },
    { time: '2019-05', count: 60 },
    { time: '2019-06', count: 60 },
    { time: '2019-07', count: 60 },
  ];

  return (
      <DualAxesChart uvBillData={uvBillData} transformData={transformData} />
  );
};

export default MyPage;
 