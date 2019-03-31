import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row,Upload, Col, Icon, Avatar,message, Tag,Form, Divider, Spin, Input, Button } from 'antd';
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
    avatar:'',
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
          if(response.success){
            message.success('保存成功');
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

  handleChange =(info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        avatar: info.file.response.data.url,
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }


  render() {
    const { newTags, inputVisible, inputValue, avatar } = this.state;
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
      dispatch,
    } = this.props;
    const { getFieldDecorator } = form;
    const { data: user } = currentUser;
    const uploadAvatar = '';
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
    
    const uploadProps = {
      name: 'file',
      action: `${window.config.apiUrl}/API/u/uploadavatar`,
      headers: {
        Authorization: localStorage.getItem('accessToken') || '',
      },
      // onChange: this.handleChange,
  
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          if(info.file.response.success){
            // uploadAvatar = window.config.apiUrl+info.file.response.data.url;
            dispatch({
              type: 'user/fetchCurrent',
              payload: {url: window.config.apiUrl+info.file.response.data.url},
              callback: () => {
                user.avatar = window.config.apiUrl+info.file.response.data.url;
              }
            });
            
          }
          
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    console.log('sss', user);
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={10} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={false}>
              {user && Object.keys(user).length ? (
                <div className={styles.userAvatar}>
                  
                  {/* file:///Users/weiwei/Desktop/NodeDemo/app/controllers/static/upload/3.jpg */}
                  <Avatar key={_.now()} size={100} src={uploadAvatar || user.avatar} />
                  <Upload {...uploadProps} showUploadList={false}>
                    <Button>
                      <Icon type="upload" />更换头像
                    </Button>
                  </Upload>
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
                    {/* <Form.Item {...formItemLayout} label=""> */}
                    {getFieldDecorator('avatar', {
                      initialValue: _.get(user, 'avatar'),
                      // rules: [{ required: true, message: '手机不能为空' }],
                    })(<Input type='hidden' />)}
                    {/* </Form.Item> */}
                    <Form.Item className="submit">
                      <Button type="primary" onClick={this.handleSubmit}>保存</Button>
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
