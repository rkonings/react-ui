function template(
    { template },
    opts,
    { imports, componentName, props, jsx, exports }
  ) {

    const code = `
        /* tslint:disable */
        import * as React from 'react';
        import styled from 'styled-components';
        import { SVGIcon } from '../mixins/SVGIcon';
        const COMPONENT_NAME = (props: React.SVGProps<SVGSVGElement>) => JSX;
        
        export default styled(COMPONENT_NAME)\`\${SVGIcon};\`;
    `;

    const typeScriptTpl = template.smart(code, { plugins: ['typescript'], preserveComments: true })
    return typeScriptTpl({
        COMPONENT_NAME: componentName,
        JSX: jsx
    });
  }
  module.exports = template