import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './../../../index.css';
import logoImg from '../../../assets/img/img-logo.png';

import {
  Tree,
  Icon,
  DatePicker,
  Button,
  Select,
  Input,
  Dropdown,
  Menu,
} from 'antd';
import moment from 'moment';
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
`;

// margin: 5px auto 10px;
const LogoContainer = styled.div`
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  margin: auto;
  padding-top: 20px;
`;
// font-family: 'Quicksand', sans-serif;
//   font-weight: 900;
//   font-size: 20px;
//   color: #333d77;

const LogoImg = styled.img`
  width: 128px;
`;

const SearchContainer = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
  margin-top: 40px;

  border-bottom: 1px solid #191a1c;
`;

const Title = styled.h1`
  color: #f8f8f8;
  font-weight: 400;
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
      autoExpandParent: false,
    };
    this._onClickNode = this._onClickNode.bind(this);
    this._onExpandNode = this._onExpandNode.bind(this);
    this._onRightClickNode = this._onRightClickNode.bind(this);
    this._onSearchFilter = this._onSearchFilter.bind(this);
    this._generateGoMenu = this._generateGoMenu.bind(this);
    this._onClickGoMenu = this._onClickGoMenu.bind(this);
  }

  render() {
    const {
      _onClickPageRefresh,
      _onClickNode,
      _onExpandNode,
      _onRightClickNode,
      _onSearchFilter,
      _generateGoMenu,
    } = this;
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
    const { filter, expandedKeys, autoExpandParent } = this.state;
    const treeData = _encodeTree(_filterNodes(nodes, filter));
    return (
      <Container className="navigation">
        <LogoContainer onClick={_onClickPageRefresh}>
          {/* 로고 교체할겁니다아! */}
          <LogoImg src={logoImg} alt='FDC Logo'/>
          {/* FDC */}
        </LogoContainer>
        <SearchContainer>
          <Title>
            {/* share-alt */}
            <Icon style={{ color: '#f8f8f8' }} type="check" />
            Search Condition
          </Title>
        </SearchContainer>

        <FabContainer>
          <Select
            // allowClear={true}
            dropdownStyle={{
              borderRadius: '0',
              fontSize: '12px',
              // backgroundColor: '#575e77',
              color: '#fff !important',
            }}
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
            placeholder="Search ..."
            onSearch={_onSearchFilter}
            // disabled
          />
        </SearchInput>

        <TreeContainer>
          <Tree
            multiple
            checkable
            showLine
            autoExpandParent={autoExpandParent}
            // showIcon
            checkedKeys={selected}
            selectedKeys={selected}
            expandedKeys={expandedKeys}
            onCheck={_onClickNode}
            onSelect={_onClickNode}
            onRightClick={_onRightClickNode}
            onExpand={_onExpandNode}
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
          <Dropdown overlay={_generateGoMenu()}>
            <Button
              style={{
                width: '100%',
                display: 'flex',
                fontSize: '12px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              GO
              <Icon type="up" />
            </Button>
          </Dropdown>
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

  _onClickPageRefresh() {
    window.location.reload(true);
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
    // this.setState(prevState => {
    //   if (isLeaf) return { ...prevState, autoExpandParent: false };
    //   const { expandedKeys: prevExpandedKeys } = prevState;
    //   const isExpanded = prevExpandedKeys.includes(key);
    //   const nextExpandedKeys = isExpanded
    //     ? prevExpandedKeys.filter(expanded => expanded !== key)
    //     : [...prevExpandedKeys, key];
    //   return {
    //     ...prevState,
    //     expandedKeys: nextExpandedKeys,
    //     autoExpandParent: false,
    //   };
    // });
  }

  _onExpandNode(expandedKeys) {
    this.setState({ expandedKeys, autoExpandParent: false });
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

  // filter.
  _onSearchFilter(value) {
    const { onResetSelectedNodes, nodes } = this.props;
    const expandedKeys = !value ? [] : _searchExpanedKeys(nodes, value);
    this.setState({ filter: value, expandedKeys, autoExpandParent: true });
    onResetSelectedNodes();
  }

  // go button
  _generateGoMenu() {
    const { _onClickGoMenu } = this;
    return (
      <Menu 
        style={{ borderRadius: '0' }}
        onClick={_onClickGoMenu}>
        <Menu.Item disabled style={{ fontSize: '12px' }} key="realtime">
          <Icon type="area-chart" />
          Real Time View
        </Menu.Item>
        <Menu.Item style={{ fontSize: '12px' }} key="lotwafer">
          <Icon type="pie-chart" />
          Lot/Wafer View
        </Menu.Item>
      </Menu>
    );
  }

  _onClickGoMenu({ key }) {
    const { onClickLotWaferView, onClickRealTimeView } = this.props;
    switch (key) {
    case 'realtime':
      return onClickRealTimeView();
    case 'lotwafer':
      return onClickLotWaferView();
    default:
      return;
    }
  }
}

// tree
const _renderNode = node => (
  <TreeNode
    title={
      node.isFilter ? (
        <span className="ant-tree-filtered">{node.TEXT}</span>
      ) : (
        node.TEXT
      )
    }
    key={node.isLeaf ? node.MODULE_ID : node.VALUE}
    isLeaf={node.isLeaf}
  >
    {!node.children ? null : node.children.map(child => _renderNode(child))}
  </TreeNode>
);

const _filterNodes = (nodes, filterValue) =>
  nodes.map(node => {
    const isFilter = !filterValue
      ? false
      : node.hasOwnProperty('MODULE_ID') &&
        node.TEXT.toLowerCase().includes(filterValue.toLowerCase());
    return { ...node, isFilter };
  });

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

const _searchExpanedKeys = (nodes, filter) => {
  const filteredNodes = nodes.filter(
    node =>
      node.hasOwnProperty('MODULE_ID') &&
      node.TEXT.toLowerCase().includes(filter.toLowerCase()),
  );
  return filteredNodes.map(node => node.PARENT);
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
