import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
  flex-direction: ${props => props.flexDirection};
  
`

export const FlexBox = (
    {
        alignItems,
        flexDirection,
        justifyContent,
        children,
        ...rest
    }
) => {

    return (
        <Flex style={{
            alignItems,
            flexDirection,
            justifyContent,
            ...rest
        }}>{children}</Flex>
    )
}

FlexBox.defaultProps = {
    alignItems: "start",
    flexDirection: "row",
    justifyContent: "start",
    style: {}
}