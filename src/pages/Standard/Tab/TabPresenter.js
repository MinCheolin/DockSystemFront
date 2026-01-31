import {Tabs} from 'antd';
import User from "../User";
import Department from "../Department";
import Role from "../Role";

const TabPresenter = () =>{
   
    const items = [
  {
    key: '1',
    label: '사용자',
    children: <User/>,
  },
  {
    key: '2',
    label: '부서',
    children: <Department/>,
  },
  {
    key: '3',
    label: '직급',
    children: <Role />,
  },
];

    return (
      <div className="tab-content">
        <Tabs defaultActiveKey="1" items={items}  />
      </div>
    );

}

export default TabPresenter; 