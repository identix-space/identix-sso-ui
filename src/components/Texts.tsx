import styled from 'styled-components';
import {COLORS} from '../utils/colors';

type TextProps = {
    fontWeight?: string;
    color?: string;
    margin?: string;
    marginSm?: string;
    marginXl?: string;
    sideColor?: string;
    textAlign?: string;
}

export const Title1 = styled.h3<TextProps>`
  font-size: 16px;
  font-weight: bold;
  color: rgba(86, 85, 86, 0.8);
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};

  span {
    margin-left: 12px;
    font-size: 40px;
    background: linear-gradient(92.99deg, #579AFF 0.74%, #EA93FF 132.16%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  @media (min-width: 992px) {
    font-size: 18px;
  }
`;

export const Body1 = styled.p<TextProps>`
  font-size: 15px;
  color: ${(props) => (props.color ? props.color : COLORS.black)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 150%;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  margin: ${(props) => (props.margin ? props.margin : props.marginSm ? props.marginSm : '15px 0')};

  @media (min-width: 992px) {
    font-size: 15px;
    margin: ${(props) => (props.marginXl ? props.marginXl : '15px 0')};
  }
`;

export const Body2 = styled.p<TextProps>`
  font-size: 14px;
  color: ${(props) => (props.color ? props.color : COLORS.black)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '500')};
  line-height: 21px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  margin: ${(props) => (props.margin ? props.margin : props.marginSm ? props.marginSm : '15px 0')};

  @media (min-width: 992px) {
    font-size: 14px;
    margin: ${(props) => (props.marginXl ? props.marginXl : '15px 0')};
  }
`;

export const Label1 = styled.p<TextProps>`
  font-size: 11px;
  color: ${(props) => (props.color ? props.color : COLORS.black)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  margin: ${(props) => (props.margin ? props.margin : props.marginSm ? props.marginSm : '15px 0')};

  @media (min-width: 992px) {
    font-size: 11px;
    margin: ${(props) => (props.marginXl ? props.marginXl : '15px 0')};
  }
`;

export const LinkText = styled.a<TextProps>`
  font-size: 15px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 140%;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  word-break: break-all;
  transition: opacity .2s ease-in;
  margin: ${(props) => (props.margin ? props.margin : props.marginSm ? props.marginSm : '15px 0')};
  
  &:hover {
    opacity: .8;
  }

  @media (min-width: 992px) {
    font-size: 17px;
    margin: ${(props) => (props.marginXl ? props.marginXl : '15px 0')};
  }
`;
