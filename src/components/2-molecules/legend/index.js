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
  border-bottom: 1px solid #555;
  line-height: 20px;
`;
const InnerTitle = styled.span`
  display: inline-block;
  width: 86px;
  min-width: 86px;
  color: #cecece;
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
    <Icon type="info-circle" theme="filled" style={{ color: '#24ffc8' }} />
    Information
  </Title>
);

export const Contents = ({ time, value, target, usl, ucl, lcl, lsl, step, stepName, slot }) => (
  <div>
    <ContentsLine>
      <InnerTitle>Lot</InnerTitle>
      <Content>text</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>Slot</InnerTitle>
      <Content>{slot}</Content>
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
      <Content>{step}</Content>
    </ContentsLine>
    <ContentsLine>
      <InnerTitle>StepName</InnerTitle>
      <Content>{stepName}</Content>
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
    <ContentsLine style={{ borderBottom: '0' }}>
      <InnerTitle>Target</InnerTitle>
      <Content>{target}</Content>
    </ContentsLine>
  </div>
);

const legendNoti = (time, value, target, lsl, lcl, ucl, usl, step, stepName, slot) =>
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
        step={step}
        stepName={stepName}
        slot={slot}
      />
    ),
    placement: 'bottomRight',
    bottom: 10,
    duration: null,
  });

legendNoti.destroy = () => notification.destroy();

export default legendNoti;
