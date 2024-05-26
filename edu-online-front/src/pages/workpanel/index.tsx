import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import type { tabKeyType } from './data.d';
import AuditCourse from "@/pages/workpanel/components/AuditCourse";
import StudentList from "@/pages/workpanel/components/ListStudent";
import TeacherList from './components/ListTeacher';

const Center: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('1');

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === '1') {
      return <AuditCourse key="1" />;
    }
    if (tabValue === '2') {
      return <StudentList key="2" />;
    }
    if (tabValue === '3') {
      return <TeacherList key="3" />;
    }
    // if (tabValue === '4') {
    //   return <AllOrder key="4" />;
    // }
    return null;
  };

  return (
    <div>
      <PageContainer
        tabList={[
          {
            key: '1',
            tab: '审核课程',
          },
          {
            key: '2',
            tab: '所有学生',
          },
          {
            key: '3',
            tab: '所有教师',
          },
          {
            key: '4',
            tab: '处理举报',
          },
        ]}
        fixedHeader
        tabActiveKey={tabKey}
        onTabChange={(_tabKey: string) => {
          setTabKey(_tabKey as tabKeyType);
        }}
      >
        {renderChildrenByTabKey(tabKey)}
      </PageContainer>
    </div>
  );
};
export default Center;
