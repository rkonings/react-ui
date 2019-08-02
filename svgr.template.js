function template(
    { template },
    opts,
    { imports, componentName, props, jsx, exports }
  ) {

    const code = `
        /* tslint:disable */
        import * as React from 'react';
        import styled from 'styled-components';
        import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
        import IconProps from '../interfaces/IconProps';
        const COMPONENT_NAME = (props: IconProps) => JSX;
        
        export default styled(COMPONENT_NAME)\`\${SVGIcon};\${IconSpacing};\`;
    `;

    const typeScriptTpl = template.smart(code, { plugins: ['typescript'], preserveComments: true })
    return typeScriptTpl({
        COMPONENT_NAME: componentName,
        JSX: jsx
    });
  }
  module.exports = template