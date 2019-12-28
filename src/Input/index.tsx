import styled from 'styled-components';
import Theme, { Size } from 'interfaces/Theme';
import { HelperText, ErrorText } from './Core';

export type InputStyle = 'default' | 'outlined';

export interface InputProps extends HelperText, ErrorText {
    inputType?: string;
    className?: string;
    placeHolder?: string;
    value?: string | number;
    width?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    theme: Theme;
    textAlign?: 'left' | 'right';
    name?: string;
    size?: Size;
    grow?: boolean;
    label?: string | JSX.Element;
    prefix?: string | JSX.Element;
    postfix?: string | JSX.Element;
    style?: InputStyle;
}

export const Prefix = styled.span`
    display: flex;
    align-items: center;
    margin-right: 5px;
`;

export const Postfix = styled.span`
    display: flex;
    align-items: center;
    margin-left: 5px;
`;

export const Label = styled.span`
    display: block;
    width: 100%;
    font-weight: 500;
`;

interface Label {
    focus: boolean;
    disabled?: boolean;
    errorText?: string;
    _style?: InputStyle;
}
export const Wrapper = styled.label<Label>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    transition: border 500ms ease-out;

    ${({
        theme: {
            input: { textField, error },
        },
        errorText = false,
        disabled,
        _style = 'default',
    }) => {
        let border = 'border-bottom';
        if (_style === 'outlined') {
            border = 'border';
        }

        const borderColor = errorText
            ? error.color
            : textField.default.hover.borderColor;

        return disabled
            ? null
            : `
            &:hover {
                ${border}: ${textField.borderSize} solid ${borderColor};
                color: ${textField.default.hover.color};
            }
        `;
    }}

    ${({
        theme: {
            input: { textField, error },
        },
        errorText = false,
        focus,
        _style = 'default',
    }) => {
        const type = 'default';
        const state = focus ? 'focus' : 'default';
        const borderColor = errorText
            ? error.color
            : textField[type][state].borderColor;

        let border = 'border-bottom';
        if (_style === 'outlined') {
            border = 'border';
        }

        return `
            ${border}: ${textField.borderSize} solid ${borderColor};
        `;
    }}
`;

export const BaseStyle = ({
    theme: {
        input: { textField },
    },
    width: _width = '300px',
    grow: _grow = false,
    textAlign = 'left',
    prefix,
    postfix,
    size = 'm',
    style = 'default',
}: InputProps) => {
    const type = 'default';
    const grow = _grow ? 'flex: 1;' : '';
    const width = !_grow ? 'width: ' + _width + ';' : '';
    return `
      box-sizing: border-box;
      ${width}
      ${grow}
      font-size: ${textField.size[size]}px;

      input, textarea {
          text-align: ${textAlign};
          display: flex;
          flex: 1;
          width: 100%;
          box-sizing: border-box;
          font-size: ${textField.size[size]}px;
          padding: ${style === 'default' ? '1em 1em 1em 0' : '1em'};
          ${postfix ? 'padding-right: 0' : ''};
          ${prefix ? 'padding-left: 0' : ''};

          &::-webkit-input-placeholde { color: ${
              textField[type].default.placeholderColor
          }; }
          &::-moz-placeholder { color: ${
              textField[type].default.placeholderColor
          }; }
          &:-ms-input-placeholder { color: ${
              textField[type].default.placeholderColor
          }; }
          &::placeholder {
              transition : opacity 200ms ease-out;
              opacity:1;
              color: ${textField[type].default.placeholderColor};
          }
          &::-ms-input-placeholder { color: ${
              textField[type].default.placeholderColor
          }; }
      }

  `;
};

export const Style = ({
    style = 'default',
    label,
    theme: {
        input: { textField },
    },
}: InputProps) => {
    const type = 'default';
    const marginTop = style === 'default' || !label ? '0' : '1em';
    return `

      ${Wrapper} {
          margin-top: ${marginTop}

      }

      input {

          &:read-only {
              cursor: default;
          }

          border: none;
          color: ${textField[type].default.color};

          &:focus {

              color: ${textField[type].focus.color};
              outline: none;

              &::-webkit-input-placeholde { opacity: 0;}
              &::-moz-placeholder { opacity: 0;}
              &:-ms-input-placeholder { opacity: 0;}
              &::placeholder { opacity: 0;}
              &::-ms-input-placeholder { opacity: 0;}
          }
      }

  `;
};
