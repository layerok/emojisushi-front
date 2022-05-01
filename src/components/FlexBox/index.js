export const FlexBox = (
    {
        children,
        alignItems,
        flexDirection,
        justifyContent,
        style
    }
) => {

    return (
        <div style={{
            display: "flex",
            alignItems,
            flexDirection,
            justifyContent,
            ...style
        }}>{children}</div>
    )
}

FlexBox.defaultProps = {
    alignItems: "start",
    flexDirection: "row",
    justifyContent: "start",
    style: {}
}