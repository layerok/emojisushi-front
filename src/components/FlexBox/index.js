const FlexBox = (
    {
        children,
        alignItems = "start",
        flexDirection = "row",
        justifyContent = "start",
        style = {}
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

export {
    FlexBox
}