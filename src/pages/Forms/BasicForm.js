import React, { PureComponent } from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {
    editorState: null,
    articleName:'',
    type: 'blog',
}

async componentDidMount () {
  // 假设此处从服务端获取html格式的编辑器内容
  // const htmlContent = await fetchEditorContent()
  // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
  // this.setState({
  //   editorState: BraftEditor.createEditorState(htmlContent)
  // })
}

submitContent = async () => {
  // 在编辑器获得焦点时按下ctrl+s会执行此方法
  // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  const htmlContent = this.state.editorState.toHTML()
  // const result = await saveEditorContent(htmlContent)
  console.log('ssss', htmlContent);
}

handleEditorChange = (editorState) => {
  this.setState({ editorState })
}

  createArticle = (isDraft) => {
    const { dispatch, form } = this.props;
    const { type, editorState, articleName } = this.state;
    const htmlContent = editorState.toHTML()
    const params = {
      type,
      content: htmlContent,
      articleName,
      isDraft,
    }
    dispatch({
      type: 'form/createArticle',
      payload: params,
      callback: response => {
        console.log('response', response)
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { editorState } = this.state
    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        action={<Button onClick={()=>this.createArticle(true)}>存为草稿</Button>}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <BraftEditor
            value={editorState}
            onChange={this.handleEditorChange}
            onSave={this.submitContent}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
