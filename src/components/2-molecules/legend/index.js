import React from 'react';
import styled from 'styled-components';
import { notification, Icon } from 'antd';

const Title = styled.h1`
  color: #f8f8f8;
  font-size: 13px;
`;

const ContentsLine = styled.div`
  display: flex;
  font-size: 12px;
  color: #f8f8f8;
`;
const InnerTitle = styled.span`
  display: inline-block;
  width: 86px;
  min-width: 86px;
  color: #f8f8f8;
`;

const Content = styled.span`
  display: inline-block;
  line-height: 20px;
  color: #f8f8f8;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContentTitle = () => (
  <Title>
    <Icon type="info-circle" theme="filled" style={{ color: '#04bed6' }} />
    Information
  </Title>
);

export const Contents = ({ time, value, target, usl, ucl, lcl, lsl }) => (
  <div>
    <ContentsLine>
      <InnerTitle>Lot</InnerTitle>
      <Content>texttexttexttexttexttexttexttex</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Slot</InnerTitle>
      <Content>text</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Substrate</InnerTitle>
      <Content>text</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Recipe</InnerTitle>
      <Content>text</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Step</InnerTitle>
      <Content>text</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Time</InnerTitle>
      <Content>{time}</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Parameter</InnerTitle>
      <Content>text</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Value</InnerTitle>
      <Content>{value}</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>USL</InnerTitle>
      <Content>{usl}</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>UCL</InnerTitle>
      <Content>{ucl}</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>LCL</InnerTitle>
      <Content>{lcl}</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>LSL</InnerTitle>
      <Content>{lsl}</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Target</InnerTitle>
      <Content>{target}</Content>
    </ContentsLine>
  </div>
);

const legendNoti = (time, value, target, lsl, lcl, ucl, usl) =>
  notification.open({
    message: <ContentTitle />,
    description: (
      <Contents
        time={time}
        value={isNaN(value) ? '' : value}
        target={isNaN(target) ? '' : target}
        lsl={isNaN(lsl) ? '' : lsl}
        lcl={isNaN(lcl) ? '' : lcl}
        ucl={isNaN(ucl) ? '' : ucl}
        usl={isNaN(usl) ? '' : usl}
      />
    ),
    placement: 'bottomRight',
    bottom: 10,
    duration: null,
  });

legendNoti.destroy = () => notification.destroy();

export default legendNoti;
