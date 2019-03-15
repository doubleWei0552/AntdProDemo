import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col, Icon, Avatar,message, Tag,Form, Divider, Spin, Input, Button } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import _ from 'lodash';
import styles from './Center.less';

@connect(({ loading, user, project }) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))
class Center extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'applications':
        router.push(`${match.url}/applications`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = () =>{
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      dispatch({
        type: 'user/updataCurrent',
        payload: values,
        callback: (response) => {
          console.log('response', response)
          if(response.success){
            dispatch({
              type: 'user/fetchCurrent',
            });
          }else{
            message.error('出现错误')
          }
        }
      })
    })
  }


  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    const {
      listLoading,
      currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      match,
      location,
      children,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const { data: user } = currentUser;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 },
        xs: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 18 },
        xs: { span: 18 },
      },
    };
    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            文章 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'applications',
        tab: (
          <span>
            应用 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
    ];
    console.log('sss', user);
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={10} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={currentUserLoading}>
              {user && Object.keys(user).length ? (
                <div>
                  <Avatar size={100} src={user.avatar} />
                  <Form className={styles.userForm}>
                  <Form.Item {...formItemLayout} label="姓名">
                    {getFieldDecorator('name', {
                      initialValue: _.get(user, 'name'),
                      rules: [{ required: true, message: '姓名不能为空' }],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="邮箱">
                    {getFieldDecorator('mail', {
                      initialValue: _.get(user, 'mail'),
                      rules: [{ required: true, message: '邮箱不能为空' }],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="手机">
                    {getFieldDecorator('phoneNumber', {
                      initialValue: _.get(user, 'phoneNumber'),
                      rules: [{ required: true, message: '手机不能为空' }],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="头像">
                    {getFieldDecorator('avatar', {
                      initialValue: _.get(user, 'avatar'),
                      // rules: [{ required: true, message: '手机不能为空' }],
                    })(<Input.TextArea autosize={{ minRows: 3 }} placeholder="暂不支持上传头像，仅可通过网络链接修改" />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} className="submit" >
                    <Button type="primary" onClick={this.handleSubmit} >保存</Button>
                  </Form.Item>
                </Form>
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>
          <Col lg={14} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={listLoading}
            >
              {/* {children} */}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Form.create()(Center);
