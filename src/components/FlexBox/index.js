

const FlexBox = (
    {
        children,
        alignItems = "start",
        flexDirection = "row",
        style = {}
    }
) => {

    return (
        <div style={{
            display: "flex",
            alignItems,
            flexDirection,
            ...style
        }}>{children}</div>
    )
}

export {
    FlexBox
}