import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './../../../index.css';
// import logoImg from '../../../assets/img/logo.jpg';

import { Tree, Icon, DatePicker, Button, Select, Input } from 'antd';
import moment from 'moment';
// const { RangePicker } = DatePicker;
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
`;

// margin: 5px auto 10px;
const LogoContainer = styled.div`
  height: 45px;
  line-height: 45px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 900;

  font-size: 20px;
  color: #333d77;
`;

// const LogoImg = styled.img`
//   width: 80px;
// `;

const SearchContainer = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Title = styled.h1``;

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
    this.state = {
      filter: '',
      expandedKeys: [],
    };
    this._onClickNode = this._onClickNode.bind(this);
    this._onRightClickNode = this._onRightClickNode.bind(this);
    this._onSearchFilter = this._onSearchFilter.bind(this);
  }

  render() {
    const { _onClickNode, _onRightClickNode, _onSearchFilter } = this;
    const {
      nodes,
      fab,
      from,
      to,
      selected,
      onSelectFrom,
      onSelectTo,
      onClickFab,
    } = this.props;
    const { filter, expandedKeys } = this.state;
    const treeData = _encodeTree(_filterNodes(nodes, filter));
    return (
      <Container className="navigation">
        <LogoContainer>
          {/* 로고 교체할겁니다아! */}
          {/* <LogoImg src={logoImg} alt='FDC Logo'/> */}
          FDC
        </LogoContainer>
        <SearchContainer>
          <Title>
            <Icon style={{ color: '#04bed6' }} type="share-alt" />
            Search Condition
          </Title>
        </SearchContainer>

        <FabContainer>
          <Select
            // allowClear={true}
            dropdownStyle={{ borderRadius: '0', fontSize: '12px' }}
            style={{ width: '100%' }}
            placeholder="FAB Select"
            value={fab}
            onChange={onClickFab}
          >
            <Option value="M10">M10</Option>
            <Option value="M14">M14</Option>
          </Select>
        </FabContainer>

        <SearchInput>
          <Search
            placeholder="Not yet implemented"
            onSearch={_onSearchFilter}
            disabled
          />
        </SearchInput>

        <TreeContainer>
          <Tree
            multiple
            checkable
            showLine
            // showIcon
            checkedKeys={selected}
            selectedKeys={selected}
            expandedKeys={expandedKeys}
            onCheck={_onClickNode}
            onSelect={_onClickNode}
            onRightClick={_onRightClickNode}
            onExpand={_onClickNode}
          >
            {treeData.map(node => _renderNode(node))}
          </Tree>
        </TreeContainer>

        <PickerContainer>
          <DatePicker
            value={!from ? null : moment(from, DATE_FORMAT)}
            format={DATE_FORMAT}
            onChange={(_, from) => onSelectFrom(from)}
            style={{ width: 'calc(50% - 3px)', marginRight: '6px' }}
          />
          <DatePicker
            value={!to ? null : moment(to, DATE_FORMAT)}
            format={DATE_FORMAT}
            onChange={(_, to) => onSelectTo(to)}
            style={{ width: 'calc(50% - 3px)' }}
          />
        </PickerContainer>

        <ButtonContainer>
          <Button type="danger" block>
            GO
          </Button>
        </ButtonContainer>
      </Container>
    );
  }

  componentDidMount() {
    this.props.onClickFab('M14');
  }

  componentDidUpdate({ fab: prevFab }) {
    if (prevFab !== this.props.fab) {
      this.setState({
        filter: '',
        expandedKeys: [],
      });
    }
  }

  _onClickNode(
    _,
    {
      node: {
        props: { eventKey: key, isLeaf },
      },
    },
  ) {
    const { onClickNode } = this.props;
    isLeaf && onClickNode(key);
    this.setState(prevState => {
      if (isLeaf) return prevState;
      const { expandedKeys: prevExpandedKeys } = prevState;
      const isExpanded = prevExpandedKeys.includes(key);
      const nextExpandedKeys = isExpanded
        ? prevExpandedKeys.filter(expanded => expanded !== key)
        : [...prevExpandedKeys, key];
      return {
        ...prevState,
        expandedKeys: nextExpandedKeys,
      };
    });
  }

  _onRightClickNode({
    event,
    node: {
      props: { eventKey: key, isLeaf },
    },
  }) {
    const { selected, onOpenContextMenu, onClickNode } = this.props;
    const { clientX: x, clientY: y } = event;
    if (isLeaf) {
      onOpenContextMenu({ x, y });
      !selected.includes(key) && onClickNode(key);
    }
  }

  _onSearchFilter(value) {
    const { onResetSelectedNodes } = this.props;
    this.setState({ filter: value, expandedKeys: [] });
    onResetSelectedNodes();
  }
}

// tree
const _renderNode = node => (
  <TreeNode
    title={node.TEXT}
    key={node.isLeaf ? node.MODULE_ID : node.VALUE}
    isLeaf={node.isLeaf}
  >
    {!node.children ? null : node.children.map(child => _renderNode(child))}
  </TreeNode>
);

const _filterNodes = (nodes, filterValue) =>
  nodes.filter(
    node =>
      !node.hasOwnProperty('MODULE_ID') || node.TEXT.includes(filterValue),
  );

const _encodeTree = nodes => {
  if (!nodes) {
    return [];
  }
  const copy = nodes.map(node => ({
    ...node,
    isLeaf: node.hasOwnProperty('MODULE_ID'),
  }));
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
};

MainNavigation.propTypes = {
  fab: PropTypes.string,
  nodes: PropTypes.arrayOf(PropTypes.object), //shape으로 변경
  selected: PropTypes.array,
};

export default MainNavigation;
