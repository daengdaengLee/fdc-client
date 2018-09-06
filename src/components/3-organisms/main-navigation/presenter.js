import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './../../../index.css';
// import logoImg from '../../../assets/img/logo.jpg';

import { Tree, Icon, DatePicker, Button, Select, Input } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const DATE_FORMAT = 'YYYY-MM-DD';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const Option = Select.Option;

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

const LogoContainer = styled.div`
  height: 45px;
  margin: 5px auto 10px;
`;

// line-height: 45px;
// font-family: 'Quicksand', sans-serif;
// font-weight: 500;

// const LogoImg = styled.img`
//   width: 80px;
// `;

const SearchContainer = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Title = styled.h1`
    
`;

const FabContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const SearchInput = styled.div`
  margin-bottom: 10px;
`;

const TreeContainer = styled.div`
  width: 100%;
  height: 80%;
  overflow: auto;
  overflow-x: hidden;
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
    this._onCheckedKey = this._onCheckedKey.bind(this);
    this._onSelectNode = this._onSelectNode.bind(this);
    this._onChangedFabValue = this._onChangedFabValue.bind(this);
    this._onChangedFilterValue = this._onChangedFilterValue.bind(this);
  }

  render() {
    const {
      _onContextmenu,
      _onSelectNode,
      _onChangedFabValue,
      _onChangedFilterValue,
      _onCheckedKey,
      // _onLoadTreeData,
      // _onRenderTreeList,
    } = this;
    const {
      nodes,
      from,
      to,
      onSelectFrom,
      onSelectTo,
      onSelectNode,
      onSelectFab,
    } = this.props;
    // const treeM10 = _encodeTree(nodes.M10);
    const treeData = _encodeTree(nodes);
    return (
      <Container className="navigation">
        <LogoContainer>
          {/* 로고 교체할겁니다아! */}
          {/* <LogoImg src={logoImg} alt='FDC Logo'/> */}
          FDC
        </LogoContainer>
        <SearchContainer>
          <Title>
            <Icon 
              style={{ color: '#04bed6' }}
              type="share-alt" />
            Search Condition
          </Title>
        </SearchContainer>

        <FabContainer>
          {/* <Menu 
            style={{ width: '100%' }}
            onSelect={(item) => {
              _onChangedFabValue(item);
              onSelectFab(item.selectedKeys);
            }}
            mode="horizontal">
            <SubMenu title={<span>FDC select<Icon type='down' /></span>}>
              <Menu.Item>M10</Menu.Item>
              <Menu.Item>M14</Menu.Item>
            </SubMenu>
          </Menu> */}

          <Select
            // allowClear={true}
            dropdownStyle={{ borderRadius: '0', fontSize: '12px'}}
            style={{ width: '100%' }}
            placeholder="FAB Select"
            defaultValue="M14"
            onChange={(value) => {
              _onChangedFabValue(value);
              onSelectFab(value);
            }} >
            <Option value="M10">M10</Option>
            <Option value="M14">M14</Option>
          </Select>

        </FabContainer>
        
        <SearchInput>
          <Search 
            placeholder="Search"
            onChange={_onChangedFilterValue}
          />
        </SearchInput>

        <TreeContainer>
          <Tree
            multiple
            checkable
            showLine
            // showIcon
            // checkedKeys={_onCheckedKey}
            onSelect={(selectedNodes) => {
              _onSelectNode();
              onSelectNode(selectedNodes);
            }}
            onRightClick={_onContextmenu}
            defaultExpandedKeys={['0-0']} >
            {treeData.map(node => _renderNode(node))}
          </Tree>
        </TreeContainer>

        <PickerContainer>
          <RangePicker
            value={[moment(from, DATE_FORMAT), moment(to, DATE_FORMAT)]}
            format={DATE_FORMAT}
            onChange={(moments, [from, to]) => {
              onSelectFrom(from);
              onSelectTo(to);
            }}
            style={{ borderRadius: '0' }} />
        </PickerContainer>

        <ButtonContainer>
          <Button type="danger" block>GO</Button>
        </ButtonContainer>
      </Container>
    );
  }

  componentDidMount() {
    this.props.onRequestFetch({ fab: 'M14' });
  }

  /**
   * 
   * @ Contextmenu
   */ 
  _onContextmenu({ event, onSelectNode }) {
    const { onOpenContextMenu } = this.props;
    const { clientX: x, clientY: y } = event;
    onOpenContextMenu({ x, y });

    console.log(onSelectNode);

    // selected 전달
  }

  /**
   * 
   * @ Tree Search filtering 
   */ 

  _onChangedFilterValue(e) {
    const value = e.target.value;
    const nodes = this.props.nodes;
    const expandedKeys = nodes.map((item) => {
      if (item.TEXT.indexOf(value) > -1) {
        // return getParentKey();
      }
      return null;
    });
  } 

  /**
   * 
   * @ Tree list 
   */ 
  _onChangedFabValue(value) {
    this.props.onRequestFetch({ fab: value });
    // this.props.onRequestFetch({ fab: item.selectedKeys });

    // console.log('fab', typeof item.selectedKeys, item.selectedKeys);
  }

  //예외처리합시당
  _onSelectNode(selectedNodes, node, evt) {
    if (!selectedNodes) {
      console.log('select x');
    }
    
    const nodes = this.props.nodes;
    // if () {
      
    // }
  
    // const selected = this.props.selected;

    // console.log('nodes', nodes);
    // console.log('key :', selectedNodes);

  //   const selectedInfo = []; // m구분도 필요
  //   selected.push(selected[selectedNodes]);

  //   // this.props.store.dispatch();

    // console.log('전달합시다', selectedInfo);

  }

  _onCheckedKey() {
    console.log('checked checkBox');
  }
}

// tree
const _renderNode = node => (
  <TreeNode
    title={node.TEXT}
    key={!node.children ? node.MODULE_ID : node.VALUE}
    isLeaf={!node.children}
  >
    {!node.children ? null : node.children.map(child => _renderNode(child))}
  </TreeNode>
);
//tree node show
//[...] filter
//select->module id
//fab->redux state add.

// const encodeTree = (nodes, tree, depth) => {
//   if (depth === 0) {
//     const len = nodes.length;
//     for (let i = 0; i < len; i += 1) {
//       const node = nodes[i];
//       if (node.VALUE === node.PARENT) {
//         tree.push(node);
//       }
//     }
//     return encodeTree(nodes, rootNodes, depth + 1);
//   }
//   const currentDepthNodes =
// };

const _encodeTree = nodes => {
  if (!nodes) {
    return [];
  }
  const copy = nodes.map(node => ({ ...node }));
  copy.forEach((node, idx, list) => {
    if (node.VALUE === node.PARENT) {
      return;
    }

    const parent = list.find(pNode => pNode.VALUE === node.PARENT);
    if (!parent) return;
    if (!parent.children) {
      parent.children = [node];
      return;
    }
    parent.children.push(node);
  });
  const tree = copy.filter(node => node.VALUE === node.PARENT);
  return tree;
};



MainNavigation.defaultProps = {
  fab: '',
  nodes: [],
  selected: [],
  onRequestFetch: evt =>
    console.log('[WARNNING] There is no onChangeFabs handler', evt),
};

MainNavigation.propTypes = {
  fab: PropTypes.string,
  nodes: PropTypes.arrayOf(PropTypes.object), //shape으로 변경
  selected: PropTypes.array,
  onRequestFetch: PropTypes.func,
};

export default MainNavigation;
