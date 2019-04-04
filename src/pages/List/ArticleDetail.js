import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import _ from 'lodash';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';
import { loadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
class TableList extends PureComponent {
  state = {
    articleDetail:{},
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    const {id} = match.params
    
    console.log('id', id)
    dispatch({
      type: 'rule/getArticleById',
      payload: {id},
      callback: response => {
        console.log('response', response)
        if(response.success) {
           this.setState({
             articleDetail: response.data,
           })
        }
      }
    });
  }


  render() {
    const {
      loading,
    } = this.props;
    const { articleDetail } = this.state;
    console.log('props', this.props)
   
    return (
      <div>
        <h1>{articleDetail.articleName}标题</h1>
        <div dangerouslySetInnerHTML={{ __html: articleDetail.content}} />
      </div>
    );
  }
}

export default TableList;
