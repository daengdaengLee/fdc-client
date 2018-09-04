import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import './../../../index.css';

import { Tree, Icon, DatePicker, Button } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const DATE_FORMAT = 'YYYY/MM/DD';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid #e3e3e3;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  overflow: auto;
  overflow-x: hidden;
`;

const Logo = styled.div`
  height: 45px;
  line-height: 45px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
`;

const SearchTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const TreeContainer = styled.div`
  width: 100%;
  height: 50%;
  border: 1px solid olive;
`;

const PickerContainer = styled.div`
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  margin-bottom: 10px;
`;

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this._onContextmenu = this._onContextmenu.bind(this);
    this._onSelectNode = this._onSelectNode.bind(this);
    // this.onRequestFetch = this.onRequestFetch.bind(this);
    // this._onLoadTreeData = this._onLoadTreeData.bind(this);
    // this._onRenderTreeList = this._onRenderTreeList.bind(this);
  }

  render() {
    const {
      _onContextmenu,
      _onSelectNode,
      // _onLoadTreeData,
      // _onRenderTreeList,
    } = this;
    const { nodes, from, to, onSelectFrom, onSelectTo } = this.props;
    return (
      <Container>
        <Logo>
          {/* logo image 추가예정 */}
          FDC. Title & Logo area
        </Logo>
        <SearchTitle>
          <Icon type="share-alt" />
          Search Condition
        </SearchTitle>
        <TreeContainer>
          <DirectoryTree
            multiple
            // showLine
            // defaultExpandAll
            onSelect={_onSelectNode}
            // onExpand={() => {}}
            onRightClick={_onContextmenu}
            // loadData={_onLoadTreeData}
            defaultExpandedKeys={['0-0']}
          >
            {/* {_onRenderTreeList(this.state.treeData)} */}

            {nodes.map(node => {
              return (
                <TreeNode title={node.fab.name} key={node.fab.key}>
                  {/* {node.fab.child.map(child => {
                      return <Fragment>
                        <TreeNode title={child.area.name} key={child.area.key} />
                        <TreeNode title={child.sdpt.name} key={child.sdpt.key} />
                        <TreeNode title={child.eqp_model.name} key={child.eqp_model.key} />
                        <TreeNode title={child.eqp_id.name} key={child.eqp_id.key} />
                      </Fragment>;
                      })}; */}
                </TreeNode>
              );
            })}
          </DirectoryTree>
        </TreeContainer>

        {/* add: from / to */}
        <PickerContainer>
          <RangePicker
            // 현재날짜로 셋팅
            value={[moment(from, DATE_FORMAT), moment(to, DATE_FORMAT)]}
            format={DATE_FORMAT}
            onChange={(moments, [from, to]) => {
              onSelectFrom(from);
              onSelectTo(to);
            }}
          />
        </PickerContainer>

        {/* add: bottom */}
        <ButtonContainer>
          <Button block>go</Button>
        </ButtonContainer>
      </Container>
    );
  }

  componentDidMount() {
    this.props.onRequestFetch({ fab: 'M14' });
  }

  _onContextmenu({ event }) {
    const { onOpenContextMenu } = this.props;
    const { clientX: x, clientY: y } = event;
    onOpenContextMenu({ x, y });
  }

  _onSelectNode() {
    console.log('select');
  }

  // _onLoadTreeData = (treeData) => {
  //   return new Promise ((resolve) => {
  //     if (treeData.props.children) {
  //       resolve();
  //       return;
  //     }
  //     // setTimeout(() => {
  //     treeData.props.dataRef.children = [
  //       { title: 'Child Node', key: `${treeData.props.eventKey} - 0` },
  //       { title: 'Child Node', key: `${treeData.props.eventKey} - 1` },
  //     ];
  //     this.setState({
  //       treeData: [...this.state.treeData],
  //     });
  //     resolve();
  //     // }, 1000);
  //   });
  // };

  // _onLoadTreeData = (nodes) => {
  //   return nodes.map((node) => {
  //     return (
  //       <TreeNode title={node.title} key="0-0-0"></TreeNode>
  //     );
  //   });
  // };

  // _onRenderTreeList = (nodes) => {
  //   // return data.map((item) => {
  //   //   if (item.children) {
  //   //     return (
  //   //       <TreeNode title={item.title} key={item.key} dataRef={item}>
  //   //         {this._onRenderTreeList(item.children)}
  //   //       </TreeNode>
  //   //     );
  //   //   }
  //   //   return <TreeNode { ...item } dataRef={item} />;
  //   // });

  //   return nodes.map((node) => {
  //     return (
  //       <TreeNode title={node.title} key="0-0-0"></TreeNode>
  //     );
  //   });
  // };
}

MainNavigation.defaultProps = {
  nodes: [],
  onRequestFetch: evt =>
    console.log('[WARNNING] There is no onChangeFabs handler', evt),
};

MainNavigation.propTypes = {
  nodes: PropTypes.arrayOf(() => {
    //
  }),
  onRequestFetch: PropTypes.func,
};

export default MainNavigation;
